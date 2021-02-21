import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import { makeSelectLeftViewComponent } from './selectors';
import Overlay from 'components/Overlay';
import { showInView } from 'containers/BridgeModul/actions';
import Project from '../Project/Project'
import Calibration from "../Calibration/Calibration";
const key = "leftView";

const MainViewComponent = ({
  componentName,
  onShowInView
}) => {
    
  useInjectReducer({ key, reducer });

  const [showOverlay, setShowOverlay] = useState(true);
  useEffect(() => {
    // if (componentName == 'projectData') setShowOverlay(false)
    // else setShowOverlay(true)
  }, [componentName])

  const Component = () => {
    switch (componentName) {
      case 'calibration':

        return <Calibration /> 
      
      default:
        return <div>No Module</div>
      
    }
  }

  return <>
    <Project />
    {/* <Overlay
      overlayOpen={showOverlay}
      animationType="overlayAnimation"
      toggleOverlay={() => onShowInView('leftView', 'projectData')}
    >
      <Component />
    </Overlay> */}
  </>
}

const mapStateToProps = createStructuredSelector({
  componentName: makeSelectLeftViewComponent()
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

