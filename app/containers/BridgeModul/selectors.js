
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {onlyUnique} from 'utils/dataUtils'
import { getFileNameByString } from '../../utils/dataUtils';
export const selectBridgeModule = (state) =>
{

  return state.bridgeModule || initialState
};

export const makeSelectBridgeLoaded = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.bridgeLoaded,
  );
export const makeSelectBridge = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.bridge,
  );
export const makeSelectBridgeDetails = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.bridgeDetails,
  );
export const makeSelectBridgeSurveys = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.bridgeSurveys,
  );
export const makeSelectBridgeTasks = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.bridgeTasks,
  );
export const makeSelectBridgeSpans = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.bridgeSpans,
  );
export const makeSelectBridgeElements = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.bridgeElements,
  );
export const makeSelectSelectedObjectIds = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.selectedObjectIds,
  );
export const makeSelectFocusedElement = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.focusedElement,
  );
export const makeSelectSurveyMessages = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.messages,
  );
export const makeSelectSelectedElements = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.selectedElements,
  );
export const makeSelectBridgeModels = () =>
  createSelector(
    selectBridgeModule, 
    bridgeModule => bridgeModule.bridgeModels,
  );
export const makeSelectPrimaryBridgeModel = () =>
  createSelector(
    makeSelectBridgeModels(), makeSelectBridge(),
    (models, bridge) => models.find(model => model.id == bridge.primary_model_id),
  );
export const makeSelectCustomFieldTemplate = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.customFieldsTemplate
  );
export const makeSelectElementsGroups = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.elementsGroups,
  );
export const makeSelectModelNodes = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.nodes,
  );
export const makeSelectStructureTypes = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.structureTypes,
  );
export const makeSelectElementsTypes = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.elementsTypes,
  );
export const makeSelectBridgeTypes = () =>
  createSelector(
    selectBridgeModule, 
    bridgeModule => bridgeModule.bridgeTypes
  );
export const makeSelectSelectedTask = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.selectedTask,
  );
export const makeSelectSelectedSubTask = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.selectedSubTask,
  );
export const makeSelectViewData = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.viewData
  );
export const makeSelectMode = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.mode
  );
export const makeSelectBoundingSphere = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.boundingSphere
  );
export const makeSelectDisplayedSurvey = () =>
createSelector(
  selectBridgeModule,
  bridgeModule => bridgeModule.displayedSurvey
  );
export const makeSelectSurveyFilesLoaded = () =>
createSelector(
  selectBridgeModule,
  bridgeModule => bridgeModule.surveyFiledLoaded
  );
export const makeSelectSurveyFiles = () =>
createSelector(
  selectBridgeModule,
  bridgeModule => bridgeModule.selectedSurveyFiles
  );
export const makeSelectFolderStructure = () =>
createSelector(
  selectBridgeModule,
  bridgeModule => bridgeModule.folderStructure
  );
export const makeSelectSelectedFolder = () =>
createSelector(
  selectBridgeModule,
  bridgeModule => bridgeModule.selectedFolder
  );
    
export const makeSelectCustomFieldTabs = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => {
      const tabNames = bridgeModule.customFieldsTemplate.map(field => field.tab_name)
      const uniqueTabs = tabNames.filter(onlyUnique);

      return uniqueTabs;
    },
  );
export const makeSelectImagesFolderStructure = () =>
  createSelector(
    selectBridgeModule,
    bridgeModule => bridgeModule.imagesFolderStructure
  );
export const makeSelectPreviousTask = () =>
createSelector(
  selectBridgeModule, makeSelectSelectedTask,
  (bridgeModule, selectedTask) => {
    
    const previousTask = bridgeModule.bridgeTasks.find(task => task.task_order === selectedTask.task_order - 1 && task.survey_id == selectedTask.survey_id);
    return previousTask
  },
);
export const makeSelectNextTask = () =>
  createSelector(
    selectBridgeModule, makeSelectSelectedTask,
    (bridgeModule, selectedTask) => {
      
      const nextTask = bridgeModule.bridgeTasks.find(task => task.task_order === selectedTask.task_order + 1 && task.survey_id == selectedTask.survey_id);
      return nextTask
    },
  );

export const makeSelecElementsNodesDifferences = () =>
  createSelector(
    makeSelectBridgeElements(), makeSelectModelNodes(),
    (elements, nodes) => {
      if (nodes && nodes.length) {
        const elementObjectIds = elements.map(el => el.object_id)
        const nodesNames = nodes && nodes.map(node => node.name)
        
        const newNodes = nodes && nodes.filter(node => !elementObjectIds.includes(node.name))
        const missingElements = elements.filter(el => !nodesNames.includes(el.object_id))
        return {newNodes, missingElements}
      } else return null
      
    },
  ); 
export const makeSelectSelectedFolderFiles = () =>
  createSelector(
    selectBridgeModule,
    (bridgeModule) => {
      console.log(bridgeModule.selectedFolder)
      console.log(bridgeModule.selectedSurveyFiles)
      let files
      switch (bridgeModule.selectedFolder.name) {
        case 'Glb':
          files = getFileNameByString(bridgeModule.selectedFolder.name, bridgeModule.selectedSurveyFiles.glbModels);
          break;
        case '3d tiles':
          files = getFileNameByString(bridgeModule.selectedFolder.name, bridgeModule.selectedSurveyFiles.tiles);
          break;
      
        default:
          files = getFileNameByString(bridgeModule.selectedFolder.name, bridgeModule.selectedSurveyFiles.images);
          break;
      }

      return files
    },
  );
// export const getFilesImportantData = files => {
//     console.log('getFilesImportantData', files)
//     const images = files.smallImages.map(file => {
//       // console.log(file.name)
//       const fullImage = files.fullImages.find(
//         fullImagefile => file.name.includes(fullImagefile.name.split(".")[0])
//         )
        
//       // console.log(fullImage)
//       return {
//         name: file.name,
//         mediaLink: file.metadata.mediaLink,
//         size: file.metadata.size,
//         updated: file.metadata.updated,
//         fullImageName: fullImage.name,
//         fullImageLink: fullImage.metadata.mediaLink,
//       };
//     })
//     const glbModels = files.glbModels.map(model => {
//       return {
//         name: model.name,
//         mediaLink: model.metadata.mediaLink,
//         size: model.metadata.size,
//         updated: model.metadata.updated,
//       }
//     })
//     const tiles = files.tiles.map(tile => {
//       return {
//         name: tile.name,
//         mediaLink: tile.metadata.mediaLink,
//         size: tile.metadata.size,
//         updated: tile.metadata.updated,
//       }
//     })
//     return {
//       images,
//       glbModels,
//       tiles
//     }
//   }

    
// export const getCustomFieldsTemplateTabs = createSelector(
//   customFieldsTemplate,
//   customFieldsTemplate => {
//     const tabNames = customFieldsTemplate.map(field => field.tab_name)
//     const uniqueTabs = tabNames.filter(onlyUnique);


//     return uniqueTabs
//   },
// );