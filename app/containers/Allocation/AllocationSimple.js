import React, {useState, memo, useEffect, useMemo} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBIcon, MDBBtn, MDBListGroupItem, MDBListGroup, MDBSwitch } from 'mdbreact';
import TableHeader from 'components/TableHeader';
import styled from 'styled-components';
import TextSearch from 'components/TextSearch/TextSearch';

import Block from 'components/Block';
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import Layout from 'containers/Management/Layout';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
// import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import { ExportService } from 'containers/Wijmo/export';
import TopBarItem from 'components/TopBarItem';

import {  
    makeSelectLoading,
    makeSelectCurrentUser,
    makeSelectCurrentUserRole,
    makeSelectRoleTypes,
    makeSelectSurveyStatuses
  } from 'containers/App/selectors';
import {  
    makeSelectOrganizationProcessesTemplates,
    makeSelectOrganizationProviders,
    makeSelectOrganizationProcessesTasks,
    makeSelectOrganization
  } from 'containers/Organizations/Organization/selectors';
import {  
    createNewSurveys,
    createSurveyAndTasks,
    createSurveysAndTasks,
    allocateSurveys
  } from 'containers/Organizations/Organization/actions';
import {searchAll, onlyUnique, mergeSurveyInfoIntoBridge, reArrangeObject} from 'utils/dataUtils';
import './Allocation.css'

const Allocation = ({
    currentUser,
    bridges,
    surveys,
    onToggleModal,
    processesTemplates,
    processesTasks,
    providers,
    organization,
    surveyStatuses,
    onCreateSurveysAndTasks,
    onCreateNewSurveys,
    onToggleAlert
}) => {
    
    const createBridgesAndSurveysData = () => {
      let data = mergeSurveyInfoIntoBridge(bridges, surveys)
      console.log('data', data)
      data = data.map(bridge => reArrangeObject(bridge, 
        ['bid', 'name', 'bridge_type', 'structure_name', 'description', 'spans', 'survey_name', 'process_template_name',
        'bridge_status', 'survey_year', 'provider_name']))
      return data
    }
    
    const bridgesAndSurveys = useMemo(() => createBridgesAndSurveysData(), [surveys, bridges])

    const [selectedBridges, setSelectedBridges] = useState([]);
    const [selectedSurveyStatuses, setSelectedSurveyStatuses] = useState([]);
    const [filteredSurveys, setFilteredSurveys] = useState([]);
    const [showNewBridges, setShowNewBridges] = useState(false)
    useEffect(() => {
      addEmptySurveys()
      // setFilteredSurveys(surveys);
      
  
      return () => {
        // setStatus('All');
      };
    }, [surveys]);
    useEffect(() => {
      console.log(selectedSurveyStatuses)
      let results
      if (selectedSurveyStatuses.length) {
        results = surveys.filter(survey =>  selectedSurveyStatuses.includes(survey.status))
        console.log(results)
        setFilteredSurveys(results)
      } else {
        addEmptySurveys()
      }
      // 
      return () => {
        // setSelectedTaskStatuses()
      }
    }, [selectedSurveyStatuses])

    

    const getBridgesWithoutSurveys = () => {
      console.log('filteredSurveys', filteredSurveys)
      const newBridges = []
      bridges.forEach(bridge => {
        if (!filteredSurveys.find(survey => survey.bid == bridge.bid)) newBridges.push(bridge)
      })
      return newBridges
    }

    const addEmptySurveys = () => {
      const newBridges = getBridgesWithoutSurveys()
      // console.log(newBridges)
      const emptySurveys = newBridges.map(bridge => {
        let newSurvey = {...surveys[0]}
 
        Object.keys(newSurvey).map(key => {
          newSurvey[key] = ''
        })
        newSurvey.bid = bridge.bid
        newSurvey.bridge_name = bridge.name
        newSurvey.process_template_name = 'No surveys'
        // console.log('newSurvey', newSurvey)
        return newSurvey
      })
      // console.log('emptySurveys', emptySurveys)
      const allSurveys = [...surveys, ...emptySurveys]
      // console.log('allSurveys', allSurveys)
      setFilteredSurveys(allSurveys)

    }
    const handleAction = (actionName, item) => {
        // console.log(actionName)
        switch (actionName) {
            
            case 'Allocate bridges':
                // console.log(processesTemplates)

                onToggleModal({
                  title: 'Allocate bridges',
                  text: '',
                  // confirmButton: 'Create',
                  cancelButton: 'Close',
                  data: {
                    processesTemplates: processesTemplates,
                    providers,
                    colWidth: 12,
                  },
                  editMode: 'Allocate',
                  formType: 'processAllocationForm',
                  confirmFunction: data => {
                    console.log(data)
                    const process = processesTemplates.find(process => process.id == data.processTemplate);
                    const templateTasks = processesTasks.filter(task => task.name == process.name);
                    // console.log(process)
                    // console.log(selectedIds)
                    
                    console.log(surveys)
                    const newSurveys = prepareNewSurveys(process, data)
                    // console.log(surveys)
                    onCreateSurveysAndTasks(newSurveys, process, templateTasks)
                    // setSelectedBridges([])
                  },
                  onBlurFunction: (value) => {
                    console.log(value)
                  },
                });
                  break
            default:
                break;
        }
    }

    const prepareNewSurveys = (process, data) => {
  
        let newSurveys = [];
        let newTasks = []
        selectedBridges.map(bid => {
            const newSurvey = {
                name: data.name,
                bid: bid,
                provider_id: data.provider_id[0],
                organization_id: organization.id,
                process_template_name: process.name,
                survey_year: data.survey_year,
                survey_purpose: data.survey_purpose,
                entire_structure: data.entire_structure,
                date_created: convertToMySqlDateFormat(new Date),
                created_by: currentUser.userInfo.first_name + ' ' + currentUser.userInfo.last_name,
                remarks: data.remarks,
                last_update: convertToMySqlDateFormat(new Date),
                status: 'Assigned',
                start_date: convertToMySqlDateFormat(data.start_date),
                due_date: convertToMySqlDateFormat(data.due_date),
              }
            // console.log(newSurvey)
            newSurveys.push(newSurvey)
            
        })
        return newSurveys
        // onCreateNewSurveys(newSurveys)
      }
    const handleCheckboxClick = selectedItems => {

      console.log(selectedItems)
      let bridgeIds = selectedItems.map(item => item.bid)
      const unique = bridgeIds.filter(onlyUnique)
      console.log('unique', unique)
      setSelectedBridges(unique)
    }

    const handleFilter = (status, type) => {
      console.log(status)
      if (status) {
        if (selectedSurveyStatuses.includes(status)) setSelectedSurveyStatuses(selectedSurveyStatuses.filter(stat => stat !== status))
        else setSelectedSurveyStatuses([...selectedSurveyStatuses, status])
      }
      else {
        setSelectedSurveyStatuses([])
      }
    }
    const table = useMemo(
      () => (
        <MyWijmoCheckBoxTable          
          data={selectedSurveyStatuses.length ? bridgesAndSurveys.filter(bridge =>  selectedSurveyStatuses.includes(bridge.status)) : bridgesAndSurveys} 
          className="maxHeight65vh pb-3"
          exportService={new ExportService()}
          handleCheckboxClick={selectedItems =>
            // handleOnChange(selectedItems)
            handleCheckboxClick(selectedItems)
          }
          multiSelectionMode={true}
          selectGroupsOnly={true}
          tableConfig={{
            exludesFields: [
              'id',
              'user_id',
              'provider_id',
              'organization_id',
              'role_id',
              'image_url',
              'confirmation_token',
              'role_type_id',
              'primary_model_id',
              'sub_tasks_names',
              'sub_tasks_dates',
              'sub_tasks_file_types',
              'next_task_id',
              'pre_task_id',
              'bridge_primary_model_id',
              'bridge_organization_id',
              'bridge_lon',
              'bridge_lat',
              'bridge_x',
              'bridge_y',
              'bridge_image_url',
              'bridge_name',
              'survey_bid'
            ],

            editableFields: [],
            longFields: ['remarks', 'description', 'full_name','process_template_name', 'name', 'survey_name'],
            dateFields: [
              'date_created',
              'due_date',
              'createdAt',
              'updatedAt',
              'start_date'
            ],
            // fixedColumns: 3,
            wholeNumberFields: [
              // 'bid',
              // 'survey_id',
              // 'completed',
              // 'taske_order',
            ],
            decimelNumberFields: ['lon', 'lat', 'x', 'y'],
            groups: [],
            // frozenColumns: 2,
            groupHeaderFormat: `<b>{value}</b> ({count:n0} surveys)`,
            hideGroupPanel: false,
            selectionMode: "MultiRange"
          }}
        />
      ),
      [bridgesAndSurveys, selectedSurveyStatuses],
    );
    const newBridgeTable = useMemo(
      () => (
        <MyWijmoCheckBoxTable          
          data={getBridgesWithoutSurveys()}
          className="maxHeight65vh pb-3"
          exportService={new ExportService()}
          handleCheckboxClick={selectedItems =>
            // handleOnChange(selectedItems)
            handleCheckboxClick(selectedItems)
          }
          multiSelectionMode={true}
          selectGroupsOnly={true}
          tableConfig={{
            exludesFields: [
              'id',
              'user_id',
              'provider_id',
              'organization_id',
              'role_id',
              'image_url',
              'confirmation_token',
              'role_type_id',
              'primary_model_id',
              'sub_tasks_names',
              'sub_tasks_dates',
              'sub_tasks_file_types',
              'next_task_id',
              'pre_task_id',
              'bridge_primary_model_id',
              'bridge_organization_id',
              'bridge_lon',
              'bridge_lat',
              'bridge_x',
              'bridge_y',
              'bridge_image_url',
              'name'
            ],

            editableFields: [],
            longFields: ['remarks', 'description', 'full_name','process_template_name'],
            dateFields: [
              'date_created',
              'due_date',
              'createdAt',
              'updatedAt',
              'start_date'
            ],
            // fixedColumns: 3,
            wholeNumberFields: [
              // 'bid',
              // 'survey_id',
              // 'completed',
              // 'taske_order',
            ],
            decimelNumberFields: ['lon', 'lat', 'x', 'y'],
            groups: ['name'],
            frozenColumns: 2,
            groupHeaderFormat: `<b>{value}</b>`,
            hideGroupPanel: false,
            selectionMode: "MultiRange"
          }}
        />
      ),
      [getBridgesWithoutSurveys()],
    );
    const Header = () => {
      return (
        <div className="row mr-3 align-items-center">
          <div className="col-4">
            {/* <h5>{msg}</h5>
            <div className={`${wizardMode && 'disabled'}`} /> */}
            {/* <MDBSwitch
              className="fontSmall"
              checked={showNewBridges}
              onChange={() => setShowNewBridges(!showNewBridges)}
              labelLeft=""
              labelRight={showNewBridges ? 'Bridges without surveys' : 'Bridges with surveys'}
            /> */}
          </div>
          <div className="col-4 text-center">
            <h5>Allocate surveys to providers</h5>
          </div>

          <div className="col-4 text-right">
            <MDBBtn
              className={`bgSecondary float-right ${!selectedBridges.length &&
                'disabled'}`}
              size="sm"
              onClick={() => handleAction('Allocate bridges')}
            >
              {`Create Surveys (${
                selectedBridges ? selectedBridges.length : 0
              })`}
              <MDBIcon icon="tasks" className="ml-1" />
            </MDBBtn>
          </div>
        </div>
      );
    }
  
    return (
      <div className="surveyAllocationSection">
        <Layout
          bodyTitle={'All surveys'}
          menuTitle="Menu"
          menu={
            <>
              <div className="flex justify-content-between">
                <h6>Surveys</h6>

                <IconButtonToolTip
                  className=""
                  iconName="eraser"
                  toolTipType="info"
                  toolTipPosition="left"
                  toolTipEffect="float"
                  toolTipText="Clear"
                  onClickFunction={() => handleFilter(null, 'survey')}
                />
              </div>
              <MDBListGroup>
                {surveyStatuses.map(item => {
                  const active = selectedSurveyStatuses.includes(item.name); 
                  return (
                    <MDBListGroupItem
                      key={item.name}
                      className={`cursor-pointer transitioned ${active &&
                        'bgPrimaryFaded1'}`}
                      onClick={() => handleFilter(item.name, 'survey')}
                    >
                      <MDBIcon icon={item.icon} className="mr-2 colorSecondary" />
                      {item.name}
                      {active && (
                        <MDBIcon
                          icon="check"
                          className="float-right mt-1 colorSecondary"
                        />
                      )}
                    </MDBListGroupItem>
                  );
                }
                  // <MDBListGroupItem
                  //   key={item.name}
                  //   className={`cursor-pointer transitioned ${selectedSurveyStatuses.includes(
                  //     item.name,
                  //   ) && 'bgPrimaryFaded5 color-white'}`}
                  //   onClick={() => handleFilter(item.name, 'survey')}
                  // >
                  //   <MDBIcon
                  //     icon={item.icon}
                  //     className="mr-2 colorSecondary"
                  //   />
                  //   {item.name}
                  // </MDBListGroupItem>
                )}
              </MDBListGroup>
            </>
          }
          headerComponent={<Header />}
          component={showNewBridges ? newBridgeTable :  table}
          // component={filteredTasks && filteredTasks.length && table}
        />
      </div>
      // <div className="mt-3 surveyAllocationSection">
      //   <TopBarItem position="center">
      //     <div className="">Survey allocation</div>
      //   </TopBarItem>

      //   {table}

      //   {selectedBridges && selectedBridges.length ? (
      //     <MDBBtn onClick={() => handleAction('Allocate bridges')}>
      //       Allocate process
      //     </MDBBtn>
      //   ) : (
      //     ''
      //   )}
      // </div>
    );
}


const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),
  processesTemplates: makeSelectOrganizationProcessesTemplates(),
  processesTasks: makeSelectOrganizationProcessesTasks(),
  providers: makeSelectOrganizationProviders(),
  organization: makeSelectOrganization(),
  surveyStatuses: makeSelectSurveyStatuses(),
});
  
  const mapDispatchToProps = dispatch => {
    return {
      onToggleModal: modalData => dispatch(toggleModal(modalData)),
      onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
      onCreateNewSurveys: surveys => dispatch(createNewSurveys(surveys)),
      onCreatedSurveyAndTasks: (newSurvey, templatetasks) => dispatch(createSurveyAndTasks(newSurvey, templatetasks)),
      // onCreateSurveysAndTasks : (surveys, process, templatetasks) => dispatch(createSurveysAndTasks(surveys, process, templatetasks)),
      onCreateSurveysAndTasks : (surveys, process, templatetasks) => dispatch(allocateSurveys(surveys, process, templatetasks))
    };
  };
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(Allocation);

