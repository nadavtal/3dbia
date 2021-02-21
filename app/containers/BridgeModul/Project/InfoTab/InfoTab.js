import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import FilesUploadComponent from "components/FilesUploadComponent";
import { MDBIcon, MDBCardImage, MDBListGroup, MDBListGroupItem, MDBSwitch, MDBSimpleChart, MDBBadge } from 'mdbreact';
import * as actions from './actions';
import LoadingIndicator from 'components/LoadingIndicator'
import { editBridge, showInView } from 'containers/BridgeModul/actions';
import * as selectors from './selectors';
import { makeSelectBridge, makeSelectCustomFieldTabs, makeSelectDisplayedSurvey } from 'containers/BridgeModul/selectors'
import MyTabs from 'components/MyTabs/Tabs';
import {apiUrl} from 'containers/App/constants'
import axios from 'axios';
const key = "infoTab";

const InfoTab = ({
  bridge,
  bridgeTabs,
  selectedTab, 
  onSetSelectedTab,
  onShowInView,
  displayedSurvey,
  onEditBridge,
  isUpdating
}) => {
    
    useInjectReducer({ key, reducer }); 
    const [tab, setTab] = useState('Info')
    
    const uploadBridgeImage = (value) => {

        // toggleLoadingSpinner(`Updating ${provider.name} image`) 
        const imageFile = value.get('file')
        // url = `profile_images/provider/${provider.id}`;
        const url = 'cloud-upload'
        const newFileFullName = `bid_${bridge.bid}/general_files/images/${imageFile.name}`
        // formData.append('file', file);
        value.append('bucketName', `3dbia_organization_${bridge.organization_id}`)
        value.append('fileName', newFileFullName)

        axios.post(apiUrl + url, value, {}).then(res => {
          console.log(res);
          const updateBridge = {...bridge};
          updateBridge.image_url = res.data.fileUrl;
          onEditBridge(updateBridge)
          // onUpdateProvider(updatedProv);
          // toggleLoadingSpinner();
        });
  }

    const handleClick = (tab) => {
        onShowInView('main', 'bridgeForm');
        onSetSelectedTab(tab)
    }
    const tabs = [
      {name: 'Info', icon: 'info'},
      {name: 'Bridge Id', icon: 'clipboard-list'},
    ]
    // console.log(displayedSurvey)
    // console.log(bridge)
    const Badges = ({}) => {
      const largeFields = ['cpi_average', 'cpi_critical']
      const medeiumFields = ['scs_average', 'scs_critical']
      const smallFields = ['scs_average', 'scs_critical']
      const steps = [50, 55, 60, 65, 70]
      return (
        <>
          {largeFields.map(field => (
            <div
              key={field} 
              className="d-flex justify-content-around align-items-center mb-3">
              <span>{field.split('_').join(' ').toUpperCase()}</span>
              <MDBBadge
                className="py-2 px-3 w-33 fontLarge"
                pill
                color="success"
              >
                {displayedSurvey[field]}
              </MDBBadge>
            </div>
          ))}
          {medeiumFields.map(field => (
            <div className="d-flex justify-content-around align-items-center mb-3"
              key={field}>
              <span>{field.split('_').join(' ').toUpperCase()}</span>
              <MDBBadge
                className="py-2 px-2 w-33 fontMed"
                pill
                color="warning"
              >
                {displayedSurvey[field]}
              </MDBBadge>
            </div>
          ))}
        </>
      );
    }
    return (
      <div>
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
            {isUpdating ? (
              <LoadingIndicator msg="Updating bridge" />
            ) : (
              <>
                <MDBCardImage
                  className="img-fluid"
                  src={
                    bridge.image_url
                      ? bridge.image_url
                      : require('../../../../images/LOGIN.jpg')
                  }
                  alt="Card cap"
                />
                <div className="text-center mt-3">
                  <FilesUploadComponent
                    onUploadImage={file => uploadBridgeImage(file)}
                    id="bridge-image-upload"
                  />
                </div>
              </>
            )}

            <div className="p-2">{displayedSurvey && <Badges />}</div>
          </>
          <MDBListGroup>
            {bridgeTabs.map(tab => (
              <MDBListGroupItem
                key={tab}
                className={`hoverBgPrimaryFaded1 cursor-pointer ${
                  selectedTab == tab ? 'bgPrimaryFaded3' : ''
                }`}
                onClick={() => handleClick(tab)}
              >
                <MDBIcon icon="tasks" className="mx-2" />
                {tab}
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        </MyTabs>

        {/* )} */}
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  bridge: makeSelectBridge(),
  bridgeTabs: makeSelectCustomFieldTabs(),
  selectedTab: selectors.makeSelectSelectedTab(),
  isUpdating: selectors.makeSelectIsUpdating(),
  displayedSurvey: makeSelectDisplayedSurvey(),  
});


const mapDispatchToProps = (dispatch) => {
  return {
    onSetSelectedTab: tab => dispatch(actions.setSelectedTab(tab)),
    onEditBridge: bridge => dispatch(editBridge(bridge)),
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
)(InfoTab);

