import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import { 
  makeSelectCurrentUser, 
  makeSelectCurrentUserRole } 
  from 'containers/App/selectors';
import { toggleModal, showNotification, toggleAlert } from 'containers/App/actions';
import {
  makeSelectBridge,
  makeSelectBridgeSurveys,
  makeSelectBridgeTasks,
  makeSelectDisplayedSurvey,
  makeSelectSurveyFilesLoaded
  } from 'containers/BridgeModul/selectors';
import {
    showInView,
    loadSurveyData,
    setSharedState
  } from 'containers/BridgeModul/actions'; 
import SurveyTasksTree from 'components/Tree/SurveyTasksTree';
import DataTab from '../DataTab/DataTab'
import MyWijmoDetailedTable from 'containers/MyTables/MyWijmoDetailedTable';
import MyTabs from 'components/MyTabs/Tabs';
import { ExportService } from 'containers/Wijmo/export'; 
import DataComponent from 'components/DataComponent/DataComponent';
import { MDBAnimation, MDBSwitch } from 'mdbreact';
import { sortBy } from 'utils/dataUtils';
import './SurveysTab.css'
const key = "surveyTab";

const SurveyTab = ({
  currentUser,
  currentUserRole,
  bridgeSurveys,
  bridgeTasks,
  surveyFiledLoaded,
  displayedSurvey,
  onLoadSurveyData,
  onShowInView,
  onSetSharedState,
  onToggleModal
  }) => {
    
  useInjectReducer({ key, reducer });
  const [surveysTableMode, setSurveysTableMode] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState();
  const sortedBridgeSurveys = useMemo(() => sortBy('id', bridgeSurveys, true), bridgeSurveys) 
  const createSurveyTasksTree = () => {
    
    // console.log('createSurveyTasksTree', bridgeSurveys)
    
    let tree = sortedBridgeSurveys.map(survey => {
      return {...survey}
    })
    tree.forEach(survey => {
      survey.children = sortBy('task_order', bridgeTasks.filter(task => task.survey_id == survey.id))
    });
    
    return tree
  }
  const createSurveyInspectionsTree = () => {
    
    // console.log('createSurveyInspectionsTree', bridgeSurveys)
    // const sortedBridgeSurveys = sortBy('id', bridgeSurveys)
    let tree = sortedBridgeSurveys.map(survey => {
      return {...survey}
    })
    tree.forEach(survey => {
      survey.children = [
        {name: 'General'},
        // {name: 'Element Score'},
        // {name: 'Structure Distress'},
        // {name: 'Summary'},
        // {name: 'Not surveyed'},
        // {name: 'Layouts'},
      ]
    });
    
    return tree
  }
  useEffect(() => {
    console.log(bridgeTasks)
    return () => {
      
    }
  }, [bridgeTasks])
  // const surveyTasksTree = useMemo(() => createSurveyTasksTree(), bridgeSurveys, bridgeTasks)
  const surveyTasksTree = createSurveyTasksTree()
  const surveyInspectionsTree = createSurveyInspectionsTree()
  const onRowClick = (row) => {
    // console.log(row)
    setSelectedSurvey(row);
    onShowInView('main', 'Resium')
  }
  const onTaskClick = (task) => {
    onShowInView('main', 'taskWizard', 'edit', task.id)
    onSetSharedState('selectedTask', task)
  }
  const onInspectionClick = (inspection) => {
    console.log(inspection)
    onShowInView('main', 'dashboard', 'edit', inspection)
    // onSetSharedState('selectedTask', inspection)
  }
  const showRowData = (item) => {
    onToggleModal({
      title: item.name ? item.name : 'Info',
      text: '',
      // confirmButton: 'Delete',
      cancelButton: 'Close',
      body: <DataComponent data={item} />
    });
  }

  const loadNewSurvey = (survey) => {
    // onShowInView('main', null, 'edit')
    onShowInView('bottomView')
    onLoadSurveyData(survey);
  }
  const tabs = [
    {name: 'Tasks', icon: 'info'},
    {name: 'Inspections', icon: 'clipboard-list'},
    {name: 'Data', icon: 'database'},
  ]

  const scrollContainerStyle = {
    width: "100%", 
   //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
    minHeight: `calc(15vh)`, 
    maxHeight: `calc(61vh)`, 
    overFlowY: 'auto',
    overFlowX: 'hidden'
   };
  if (!bridgeSurveys.length) return <div className="bold fullWidth p-2">No Surveys yet</div>
  else return (
    <div className="surveysTab">
      <MyTabs
        tabs={tabs}
        tabContentWrapperStyle={{}}
        headerWrapperClassName="card z-index-1"
        // tabBackgroundColor="orange"
        // header={<TabsHeader />}
        // selectedTab={selectedTab}
        navItemClassName="fullWidth"
        navWrapperClassName="bgSecondary bridgePageheaderHight innerTabs justify-content-between"
        // onTabClick={tabName => console.log(tabName)}
      >
        <>
          <MDBSwitch
            className="mt-2 p-1"
            checked={surveysTableMode}
            onChange={() => {
              setSurveysTableMode(!surveysTableMode);
              // onToggleViewSize();
            }}
            labelLeft=""
            labelRight={`Display as ${surveysTableMode ? 'tree' : 'table'}`}
          />
          <div
            style={scrollContainerStyle}
            className="scrollbar scrollbar-primary"
          >
            {surveysTableMode ? (
              // <MDBAnimation type="fadeIn">
              <MyWijmoDetailedTable
                data={sortedBridgeSurveys}
                subData={bridgeTasks}
                tableConfig={{
                  exludesFields: [
                    'bid',
                    'organization_id',
                    'id',
                    'provider_id',
                  ],
                }}
                exportService={new ExportService()}
                onRowClick={survey => onRowClick(survey)}
                onDetailedRowClick={task => onTaskClick(task)}
                connectingParentField="id"
                connectingChildField="survey_id"
                detailedHeader="Survey's tasks"
                selectionMode="Row"
                selectedSurvey={
                  selectedSurvey ? selectedSurvey : displayedSurvey
                }
              />
            ) : (
              // </MDBAnimation>
              // <MDBAnimation type="fadeIn"> 
              <SurveyTasksTree
                data={surveyTasksTree}
                accordionMode={false}
                onSurveyClick={survey => onRowClick(survey)}
                onTaskClick={task => onTaskClick(task)}
                onLoadData={survey => loadNewSurvey(survey)}
                surveyFilesLoaded={surveyFiledLoaded}
                showRowData={row => showRowData(row)}
                selectedSurvey={displayedSurvey}
                // selectedTask={selectedTask}
                wrapperClassName="bgPrimaryFaded1"
              />

              // </MDBAnimation>
            )}
          </div>
        </>
        <div
          style={scrollContainerStyle}
          className="scrollbar scrollbar-primary"
        >
          <SurveyTasksTree
            data={surveyInspectionsTree}
            accordionMode={false}
            onSurveyClick={survey => onRowClick(survey)}
            onTaskClick={inspection => onInspectionClick(inspection)}
            onLoadData={survey => loadNewSurvey(survey)}
            surveyFilesLoaded={surveyFiledLoaded}
            showRowData={row => showRowData(row)}
            selectedSurvey={displayedSurvey}
            // selectedTask={selectedTask}
            wrapperClassName="bgPrimaryFaded1"
          />
        </div>
        <div
          style={scrollContainerStyle}
          className="scrollbar scrollbar-primary"
        >
          <DataTab /> 

        </div>
      </MyTabs>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  displayedSurvey: makeSelectDisplayedSurvey(),
  bridgeSurveys: makeSelectBridgeSurveys(),
  bridgeTasks: makeSelectBridgeTasks(),
  surveyFiledLoaded: makeSelectSurveyFilesLoaded(),
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onToggleAlert: data => dispatch(toggleAlert(data)),
    onLoadSurveyData: (survey) => dispatch(loadSurveyData(survey)),
    onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
    onSetSharedState: (key, value) => dispatch(setSharedState(key, value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SurveyTab);

