import React, {useState, memo, useEffect} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBInput, MDBBtn } from 'mdbreact';
import TableHeader from 'components/TableHeader';
import styled from 'styled-components';
import TextSearch from 'components/TextSearch/TextSearch';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import Block from 'components/Block';
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import PageHeader from 'components/PageHeader/PageHeader';
import MyWijmoTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import { ExportService } from 'containers/Wijmo/export';
import TopBarItem from 'components/TopBarItem';

import {  
    makeSelectLoading,
    makeSelectCurrentUser,
    makeSelectCurrentUserRole,
    makeSelectRoleTypes
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
import {searchAll, getLatestUpdateditem, mergeSurveyInfoIntoBridge} from 'utils/dataUtils';
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
    onCreatedSurveyAndTasks,
    onCreateSurveysAndTasks,
    onCreateNewSurveys,
    onToggleAlert
}) => {
  // console.log(surveys)
    const [source, setSource] = useState([]);
    const [destination, setDestination] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selection, setSelection] = useState([]);
    
    useEffect(() => {
      console.log('Setting source')
      setSource(
        surveys.length
      ? mergeSurveyInfoIntoBridge(bridges, surveys)
      : bridges
      )
      return () => {
        setSource()
      }
    }, [bridges, surveys])


    const AllocationArrows = styled.div`
        font-size: 4rem;
        display: flex;
        margin: 0 auto;
        width: 5rem;
    `
    const handleOnChange = (item) => {
        if (selectedIds.includes(item.bid)) {
            setSelectedIds(selectedIds.filter(id => id !== item.bid))
        } else {
            setSelectedIds([...selectedIds, item.bid])

        }
    }



    const handleAction = (actionName, item) => {
        // console.log(actionName)
        switch (actionName) {
            case 'Add selected bridges':
                // const newSource = []
                const newDestination = []
                // newSource = source.filter(bridge => !selectedIds.includes(bridge.bid))
                // setSource(source.filter(bridge => !selectedIds.includes(bridge.bid)));
                // setDestination([...destination, ...source.filter(bridge => selectedIds.includes(bridge.bid))])
                setSource(source.filter(bridge => !selection.includes(bridge)));
                setDestination([...destination, ...source.filter(bridge => selection.includes(bridge))])
                setSelection([])
                // newDestination = source.filter(bridge => !selectedIds.includes(bridge.bid))
                break;
            case 'Remove selected bridges':
                setSource([...source, ...destination.filter(bridge => selection.includes(bridge))]);
                setDestination(destination.filter(bridge => !selection.includes(bridge)))
                setSelection([])
                // newDestination = source.filter(bridge => !selectedIds.includes(bridge.bid))
                break;
            case 'View bridge info':
                onToggleModal({
                    title: 'Bridge Info',
                    text: '',
                    // confirmButton: 'Create',
                    cancelButton: 'Close',
                    data: {
                      item: item,
                      colWidth: 4,
                      
                    },
                    editMode: 'view',
                    formType: 'bridgeForm',
                    // confirmFunction: data => {

                    // },
                  });
                  break
            case 'View survey info':
                onToggleModal({
                    title: 'Survey Info',
                    text: '',
                    // confirmButton: 'Create',
                    cancelButton: 'Close',
                    data: {
                      item: item,
                      colWidth: 4,
                      
                    },
                    editMode: 'view',
                    formType: 'surveyForm',
                    // confirmFunction: data => {

                    // },
                  });
                  break
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
                    // console.log(data)
                    const process = processesTemplates.find(process => process.id == data.processTemplate);
                    const templateTasks = processesTasks.filter(task => task.name == process.name);
                    // console.log(process)
                    // console.log(selectedIds)
                    const surveys = prepareNewSurveys(destination, process, data)
                    // console.log(surveys)
                    onCreateSurveysAndTasks(surveys, process, templateTasks)
                    setSelectedIds([])
                    setSource(bridges)
                    setDestination([])
                  },
                });
                  break
            default:
                break;
        }
    }

    const prepareNewSurveys = (selectedBridges, process, data) => {
  
        // console.log(templatetasks)
        let newSurveys = [];
        let newTasks = []
        selectedBridges.map(bridge => {
            const newSurvey = {
                name: data.name,
                bid: bridge.bid,
                provider_id: data.provider_id,
                organization_id: organization.id,
                process_template_name: process.name,
                survey_year: data.survey_year,
                survey_purpose: data.survey_purpose,
                entire_structure: data.entire_structure,
                date_created: convertToMySqlDateFormat(new Date),
                created_by: currentUser.userInfo.first_name + ' ' + currentUser.userInfo.last_name,
                remarks: data.remarks,
                last_update: convertToMySqlDateFormat(new Date),
                status: 'Open',
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
      setSelection(selectedItems)
    }

    return (
      <div className="mt-3">
        <TopBarItem position="center">
          <div className="">Survey allocation</div>
        </TopBarItem>

        {/* {source && <Section 
            data={source}
            title="Bridges"
            />} */}
        <div className="surveyAllocationSection">
          <div className="ml-2 mb-2">Bridges ({source.length})</div>
          {source.length ? (
            <MyWijmoTable
              data={source}
              // dataService={new DataService()}
              exportService={new ExportService()}
              handleCheckboxClick={selectedItems =>
                // handleOnChange(selectedItems)
                handleCheckboxClick(selectedItems)
              }
              multiSelectionMode={true}
              // selectedItems={selection}
              firstColoumnsKeys={['name', 'bridge_type']}
            />
          ) : (
            ''
          )}
        </div>
        <AllocationArrows className={`${!selection.length && 'faded'}`}>
          <IconButtonToolTip
            iconName={'arrow-alt-circle-down'}
            toolTipType={'info'}
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText={'Add selected bridges'}
            className={`mx-2 allocationArrows`}
            onClickFunction={() => handleAction('Add selected bridges')}
          />
          <IconButtonToolTip
            iconName={'arrow-alt-circle-up'}
            toolTipType={'info'}
            toolTipPosition="right"
            toolTipEffect="float"
            toolTipText={'Remove selected bridges'}
            className={`mx-2 allocationArrows`}
            onClickFunction={() => handleAction('Remove selected bridges')}
          />
        </AllocationArrows>
        <div className="surveyAllocationSection">
          <div className="ml-2">Selected bridges ({destination.length})</div>
          {destination.length ? (
            <MyWijmoTable
              data={destination}
              // dataService={new DataService()}
              exportService={new ExportService()}
              handleCheckboxClick={selectedItems =>
                // handleOnChange(selectedItems)
                handleCheckboxClick(selectedItems)
              }
              multiSelectionMode={true}
              // selectedItems={selection}
              firstColoumnsKeys={['name', 'bridge_type']}
            />
          ) : (
            ''
          )}
        </div>

        {/* <Section 
            data={destination}
            title="Selected bridges"
            /> */}
        {destination.length ? (
          <MDBBtn onClick={() => handleAction('Allocate bridges')}>
            Allocate process
          </MDBBtn>
        ) : ''}
      </div>
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

