import React, { useEffect, useMemo, useState, memo } from 'react';
import './Project.css';
import InfoTab from './InfoTab/InfoTab'
import SurveysTab from './SurveysTab/SurveysTab'
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  loadSurveyData,
  editBridge, 
  showInView,
} from '../actions';
import { setSelectedTab } from 'containers/BridgeModul/LeftViewComponent/actions';
import { toggleModal, showNotification, toggleAlert, bridgeSelected, toggleChat} from 'containers/App/actions';
import { makeSelectBridge, makeSelectDisplayedSurvey } from 'containers/BridgeModul/selectors';
import { destroyCesium  } from 'containers/Resium/actions';
import { makeSelectedSelectedTab } from '../LeftViewComponent/selectors';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import MyTabs from 'components/MyTabs/Tabs';
import { createStructuredSelector } from 'reselect';
import SpansTab from './SpansTab/SpansTab';


export const tabs = [
  {name: 'Info', icon: 'info'},
  {name: 'Surveys', icon: 'clipboard-list'},
  // {name: 'Data', icon: 'database'},
  {name: 'Spans', icon: 'cubes'},
]

const ProjectData = ({
  bridge,
  displayedSurvey,
  setSelectedbridge,
  onLoadSurveyData,
  onToggleModal,
  selectedTab,
  setLeftViewTab,
  onShowInView,
  onToggleChat,
  onEditBridge,
  onDestroyCesium 
}) => {

  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState(localStorage.getItem('activeBridgePageTab') ? localStorage.getItem('activeBridgePageTab') :'Info');
  useEffect(() => {
    console.log('Getting displayed survey data', displayedSurvey)
    displayedSurvey && bridge && onLoadSurveyData(displayedSurvey); 
    // setSurveyTasksTree(createSurveyTasksTree())
    // if (!props.surveyFiledLoaded) {
    //   if (!displayedSurvey ) {
    //     const latestSurvey = getLastCreateditem(props.bridgeSurveys)
    //     console.log('SETTING LATEST SURVEY', latestSurvey)
    //     props.onLoadSurveyData(latestSurvey);

    // }
    return () => {
      // setDisplayedSurvey()
    }
  }, [displayedSurvey])
  const handleBackToBridges = () => {
    onToggleChat(false)
    onShowInView('bottomView')
    onShowInView('main', 'Resium')
    // onDestroyCesium()
    setSelectedbridge();
    // setTimeout(() => {
    //   setSelectedbridge();
      
    // }, 300);
  }
  const toggleModal = (modalType, objectId) => {
    // console.log(modalType);
    switch (modalType) {
      case 'editBridge':
        onToggleModal({
          title: `Bridge basic data`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'bridgeForm',
          data: {
            item: bridge,
            editMode: 'edit',
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => onEditBridge(data),
        });
        break;
    }
  };
  const TabsHeader = () => (
    <>
      <div className="my-1 d-flex justify-content-between">
        <IconButtonToolTip
          className="ml-2"
          size="2x"
          iconName="sign-out-alt"
          toolTipType="info"
          toolTipPosition="right"
          // flip="vertical"
          rotate="180"
          // toolTipEffect="float"
          toolTipText="Exit bridge"
          onClickFunction={() => handleBackToBridges()}
        />
        <h5>{bridge.name}</h5>
        <div>
          <IconButtonToolTip
            className="mr-2"
            iconClassName={``}
            size="sm"
            iconName="edit"
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText="Edit bridge"
            onClickFunction={() => toggleModal('editBridge')}
          />
        </div>
      </div>
      <div className="mx-2 my-1 d-flex justify-content-between">
        {displayedSurvey && (
          <>
            {`Selected survey: ${displayedSurvey.name}, ${
              displayedSurvey.survey_year
            } `}
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="projectTabs">
      {bridge && (
        <MyTabs 
          tabs={tabs}
          tabContentWrapperStyle={{}}
          headerWrapperClassName="card z-index-1"
          // tabBackgroundColor="orange"
          header={<TabsHeader />}
          selectedTab={selectedTab}
          navItemClassName="fullWidth"
          navWrapperClassName="bgPrimary bridgePageheaderHight justify-content-between"
          onTabClick={tabName => setLeftViewTab(tabName)}
          >
          <InfoTab />
          <SurveysTab />
          <SpansTab /> 
        </MyTabs>
      )}

     
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  // users: makeSelectUsers(),
  bridge: makeSelectBridge(),
  displayedSurvey: makeSelectDisplayedSurvey(),
  selectedTab: makeSelectedSelectedTab()
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSurveyData: (survey) => dispatch(loadSurveyData(survey)),
    setSelectedbridge: bid => dispatch(bridgeSelected(bid)),
    onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
    onEditBridge: bridge => dispatch(editBridge(bridge)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    setLeftViewTab: tabName => dispatch(setSelectedTab(tabName)),
    onToggleChat: (showChat) => dispatch(toggleChat(showChat)),
    onDestroyCesium: () => dispatch(destroyCesium())
    // getSurvey: id => dispatch(getSurvey(id)),
    // updateTask: task => dispatch(updateTask(task)),
    // // updateResiumMode: (mode) => dispatch(updateResiumMode(mode)),
    // elementSelected: (id, mode) => dispatch(elementSelected(id, mode)),
    // elementsSelected: ids => dispatch(elementsSelected(ids)),
    // updateSpan: formData => dispatch(updateSpan(formData)),
    // showInMainView: (componentName, mode, id) => dispatch(showInMainView(componentName, mode, id)),
    // onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),

    // onToggleAlert: data => dispatch(toggleAlert(data)),
    // updateElements: elements => dispatch(updateElements(elements)),
    // editElement: element => dispatch(editElement(element)),
    // editSpan: span => dispatch(updateSpan(span)),
    // createNewBridgeModel: model => dispatch(createNewBridgeModel(model)),
    // showNotification: (data) => dispatch(showNotification(data)),
    // sendAction: (actionType, data) => dispatch(receiveAction(actionType, data)),
    // onToggleViewSize: () => dispatch(toggleViewSize('left')),
    // setDisplayFolder: (folderName) => dispatch(setDisplayFolder(folderName)),
    // onSetSharedState: (key, value) => dispatch(setSharedState(key, value)),
    // onGetUsers: (userIds) => dispatch(getUsers(userIds)),


  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProjectData);
