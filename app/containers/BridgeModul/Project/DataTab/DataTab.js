import React, {memo, useMemo} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getFileExtension, getFileNameByString, sortBy } from 'utils/dataUtils';
import createFolderTree from 'utils/createTree';

import { 
  makeSelectCurrentUser, 
  makeSelectCurrentUserRole } 
  from 'containers/App/selectors';
import {
  makeSelectFolderStructure,
  makeSelectSelectedFolder,
  makeSelectSurveyFiles,
  makeSelectImagesFolderStructure 
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
    folderStructure,
    imagesFolderStructure
}) => { 
    console.log('surveyFiles', surveyFiles)
    console.log('imagesFolderStructure', imagesFolderStructure)
    const folderStructurePaths = folderStructure && folderStructure.map(folder => folder.path)
    console.log('mainfolderStructurePaths', folderStructurePaths)
    let allFilesArray = []
    Object.keys(surveyFiles).forEach(key => surveyFiles[key].forEach(file => allFilesArray.push(file)))
    // console.log('allFilesArray', allFilesArray)
    const folderTree = useMemo(() => folderStructurePaths && createFolderTree(folderStructurePaths, allFilesArray), [folderStructurePaths, allFilesArray]) 
    if (folderTree && imagesFolderStructure) {
      folderTree[0].children = imagesFolderStructure

    }
      
    const handleTreeItemClick = (folder) => {
        console.log(folder)
        onSetSharedState('selectedFolder', {name: folder.name ? folder.name : folder, fileTypes: folder.fileTypes ? folder.fileTypes : ['jpg', 'jpeg']})
        onShowInView('main', 'folder')
      }
    return (
        <div>
          {folderTree && (
            <TreeSimple
              data={folderTree}
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
    imagesFolderStructure: makeSelectImagesFolderStructure(),
    // selectedFolder: makeSelectSelectedFolder(),
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