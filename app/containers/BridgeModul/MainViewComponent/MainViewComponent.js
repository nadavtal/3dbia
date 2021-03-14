import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import { makeSelectMainViewComponent } from './selectors'; 
import BridgeForm from "../BridgeForm/BridgeForm";
import { MDBIcon, MDBIframe } from 'mdbreact';
import Overlay from 'components/Overlay';
import { showInView } from 'containers/BridgeModul/actions';
import { makeSelectBridgeModels } from 'containers/BridgeModul/selectors';
import Resium from "../../Resium/Resium";
import TaskWizardModule from "containers/TaskWizardModule/TaskWizardModule";
import Folder from '../Folder/Folder';
import Dashboard from 'components/Dashboard/Dashboard'
import FolderContent from 'components/FolderContent/FolderContent'
const key = "mainView";

const MainViewComponent = ({
  componentName,
  onShowInView,
  models
}) => {
    
  useInjectReducer({ key, reducer });

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (componentName == 'Resium') setShowOverlay(false)
    else setShowOverlay(true)
  }, [componentName])
  const Component = () => {
    switch (componentName) {
      case 'bridgeForm':

        return <BridgeForm />  
      case 'taskWizard':

        return  <TaskWizardModule />  
      case 'dashboard':
        return <MDBIframe src="https://www.appsheet.com/start/56f9e940-5ad7-46f2-9aae-e66b3cf3dfbb" />
        // return  <Dashboard />  
      case 'folder':
        // const glbModels = getFileNameByString(this.props.selectedFolder, this.props.selectedSurveyFiles.glbModels);
        // const images = getFileNameByString(this.props.selectedFolder, this.props.selectedSurveyFiles.images)
        return (
          <Folder /> 
        );  
    
      default:
        return <div></div>
      
    }
  }

  return (
    <>
      <Resium />
      <Overlay
        overlayOpen={showOverlay}
        animationType="overlayAnimation"
        toggleOverlay={() => onShowInView('main', 'Resium')}
      >
        <Component />
      </Overlay>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  componentName: makeSelectMainViewComponent(),
});


const mapDispatchToProps = (dispatch) => {
  return {
    onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MainViewComponent);

