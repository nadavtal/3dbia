import React, {memo} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getFileExtension, getFileNameByString, sortBy } from 'utils/dataUtils';

import { 
  makeSelectCurrentUser, 
  makeSelectCurrentUserRole } 
  from 'containers/App/selectors';
import {
  makeSelectFolderStructure,
  makeSelectSelectedFolder,
  makeSelectSurveyFiles,
  makeSelectFolders
  } from 'containers/BridgeModul/selectors';
import {
    showInView,
    setSharedState
  } from 'containers/BridgeModul/actions';

const key = "dataTabTab";
import TreeSimple from 'components/Tree/Tree';

const imageFiles = ['jpg', 'jpeg', 'png', 'JPG']

const DataTab = ({
    onSetSharedState,
    surveyFiles,
    onShowInView,
    foldersCsv
}) => { 
    console.log(foldersCsv)  
    const createFolderTree = () => {
      let tree = getParents()
      console.log(tree)
    }

    const getParents = () => {
      let parents = []
      let elements = []
      foldersCsv.forEach(element => {
        element = element.split('/')
        if (!elements.includes(element[0])) {
          elements.push(element[0])
          parents.push({
            name: element[0],
            children: []
          })
        }
      });
      return parents
    }

    // const folderTree = createFolderTree()
    const newFolderTree = [
        {
          name: 'Images',
          children: [
            {name: 'Circles', fileTypes: imageFiles, files: getFileNameByString('Circles', surveyFiles.images)},
            {name: 'Facades', fileTypes: imageFiles, files: getFileNameByString('Facades', surveyFiles.images)},
            {name: 'Bearings', fileTypes: imageFiles, files: getFileNameByString('Bearings', surveyFiles.images)},
            {name: 'Below', fileTypes: imageFiles, files: getFileNameByString('Below', surveyFiles.images)},
            {name: 'Columns', fileTypes: imageFiles, files: getFileNameByString('Columns', surveyFiles.images)},
            {name: 'Parallel', fileTypes: imageFiles, files: getFileNameByString('Parallel', surveyFiles.images)},
            {name: '360', fileTypes: imageFiles, files: getFileNameByString('360', surveyFiles.images)},
            {name: 'General', fileTypes: imageFiles, files: getFileNameByString('General', surveyFiles.images)},
            {name: 'Metadata', fileTypes: imageFiles, files: getFileNameByString('Metadata', surveyFiles.images)},
          ]
        },
        {
          name: 'Lidar', 
          children: [
            {name:  'E57', fileTypes: imageFiles},
            {name: 'Las/ply', fileTypes: imageFiles},
          ]
        },
        {
          name: 'Models',
          children: [
            {name: 'Osgb', fileTypes: imageFiles},
            {name: '3d tiles', fileTypes: ['json', 'JSON'], files: surveyFiles.tiles},
            {name: 'Skp', fileTypes: imageFiles},
            {name: 'Osg', fileTypes: imageFiles},
            {name: 'Glb', fileTypes: ['glb', 'GLB'], files: surveyFiles.glbModels},
      
          ]
        },
        {
          name: 'Other',
          children: [
            {name: 'General', fileTypes: []},
          ]
        },
      ]
      
    const handleTreeItemClick = (folder) => {
        // console.log(folder)
        onSetSharedState('selectedFolder', {name: folder.name, fileTypes: folder.fileTypes})
        onShowInView('main', 'folder')
      }
    return (
        <div>
          {newFolderTree && (
            <TreeSimple
              data={newFolderTree}
              accordionMode={false}
              onClick={value => handleTreeItemClick(value)}
              // selectedItem={folder.name}
            />
          )}
        </div>
      ); 
}

const mapStateToProps = createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    currentUserRole: makeSelectCurrentUserRole(),
    folderStructure: makeSelectFolderStructure(),
    foldersCsv: makeSelectFolders(),
    selectedFolder: makeSelectSelectedFolder(),
    surveyFiles: makeSelectSurveyFiles()
  });
  
  
  const mapDispatchToProps = (dispatch) => {
    return {
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
  )(DataTab);