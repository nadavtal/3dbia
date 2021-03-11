import produce from 'immer';
// import { ELEMENT_SELECTED, UPDATE_RESIUM_MODE, ON_RIGHT_MENU_OPTION_CLICK, ELEMENTS_SELECTED, MODEL_SELECTED } from '../Resium/constants';
import { ORG_TECH_INFO_LOADED, LOGOUT } from 'containers/AppData/constants';

import { ELEMENT_SELECTED, UPDATE_RESIUM_MODE, ON_RIGHT_MENU_OPTION_CLICK, ELEMENTS_SELECTED,
  DESTROY_CESIUM, MODEL_LOADED } from 'containers/Resium/constants';
import { TASK_UPDATED, MESSAGE_CREATED, BRIDGE_UPDATED, BRIDGE_SELECTED, MESSAGES_LOADED } from 'containers/App/constants';
import { sortBy, getLastCreateditem } from 'utils/dataUtils';
import createFolderTree from 'utils/createTree';
import * as actionTypes from './constants';
// import { initialState } from 'containers/App/reducer'
export const INITIAL_WIDTH = '25%';
export const WIDE_WIDTH = '74%';
export const FULL_WIDTH = '100%';
export const initialState = {
  bridgeLoaded: false,
  bridge: null,
  bridgeDetails: null,
  bridgeSurveys: null,
  customFieldsTemplate: null,
  bridgeTasks: null,
  bridgeModels: [],
  bridgeSpans: null,
  bridgeElements: null,
  displayedSurvey: null,
  selectedSurveyFiles: {
    images: [],
    glbModels: [],
    tiles: [],
  },
  elementsGroups: [],
  structureTypes: [],
  elementsTypes: [],
  bridgeTypes: [],
  selectedObjectIds: [],
  selectedElements: [],
  focusedElement: null,
  selectedTask: null,
  selectedSubTask: null,
  selectedSubTask: null,
  viewData: null,
  mode: null,
  boundingSphere: null,
  surveyFiledLoaded: false,
  folderStructure: null,
  imagesFolderStructure: null,
  imagesPaths: null,
  selectedFolder: null,
  nodes: null,
  messages: []
};

const bridgePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.BRIDGE_LOADED:
        console.log('BRIDGE_LOADED', action.data);
        if (action.data.customFieldsTemplate && action.data.bridgeDetails) {
          action.data.customFieldsTemplate.forEach(field => {
            const value = action.data.bridgeDetails[`col${field.col_order}`];
            field.value = value;
          });
        }
        // action.data.elements.forEach(element => {
        //   // element['span_name'] = element.span_id ? action.data.spans.find(span => span.id == element.span_id).name : '';
        //   // element['model_name'] = element.bridge_model_id ? action.data.models.find(model => model.id == element.bridge_model_id).name : '';
        //   // element['element_group'] = element.element_group_id ? state.elementsGroups.find(group => group.id == element.element_group_id).name : '';
        //   // element['order'] = element.element_order
        //   // element['element_type'] = element.element_type_id ? state.elementsTypes.find(type => type.id == element.element_type_id).name : '';
        // });
        // if (!action.data.spans.length) {
        //   // this.props.onShowInView('bottomView', 'spans', 'edit')
        // }

        if (!state.displayedSurvey) {
          const latestSurvey = getLastCreateditem(action.data.surveys)

          draft.displayedSurvey = latestSurvey
        }
        draft.bridgeLoaded = true;
        draft.bridge = action.data.bridge;
        
        draft.bridgeDetails = action.data.bridgeDetails;
        draft.bridgeSurveys = action.data.surveys;
        draft.customFieldsTemplate = action.data.customFieldsTemplate;
        draft.bridgeProcesses = action.data.processes;
        draft.bridgeTasks = action.data.tasks;
        draft.bridgeModels = action.data.model ? [action.data.model] : [];
        draft.bridgeSpans = sortBy('span_order', action.data.spans);
        draft.bridgeElements = action.data.elements;
        break;
      case BRIDGE_UPDATED:
        draft.bridge = action.bridge
        break
      // case DESTROY_CESIUM:
      //   draft.bridgeModels = []
      //   break
      case ORG_TECH_INFO_LOADED:
        console.log('ORG_TECH_INFO_LOADED', action)
        draft.elementsGroups = action.data.elementsGroups;     
        draft.structureTypes = action.data.structureTypes;     
        draft.bridgeTypes = action.data.bridgeTypes;     
        draft.elementsTypes = action.data.elementsTypes;
        draft.folderStructure = action.data.folderStructure     
        break
      // case actionTypes.FOLDER_STRUCTURE_LOADED:
      //   console.log('FOLDER_STRUCTURE_LOADED', action);
      //   draft.folderStructure = action.data
      //   break
      case actionTypes.LOAD_SURVEY_DATA:
        draft.bridgeModels = state.bridgeModels.length && state.bridge.primary_model_id ? [state.bridgeModels.find(model => model.id == state.bridge.primary_model_id)] : []
        draft.displayedSurvey = action.survey
        draft.messages = []
        draft.selectedElements = []
        draft.selectedObjectIds = []
        draft.selectedSurveyFiles = {
          images: [],
          glbModels: [],
          tiles: [],
        }
        draft.surveyFiledLoaded = false
        break
      case actionTypes.SURVEY_FILES_LOADED:
        console.log('SURVEY_FILES_LOADED', action)
        let updatedModels = [...state.bridgeModels]
        let updatedModelsIds = state.bridgeModels.map(model => model.id)
        action.data.models.forEach(model => {
          if (!updatedModelsIds.includes(model.id)) updatedModels.push(model)
        })
        if (action.data.imagePaths) {
          draft.imagesFolderStructure = createFolderTree(action.data.imagePaths)
        }
        draft.imagesPaths = action.data.imagePaths
        draft.surveyFiledLoaded = true
        draft.selectedSurveyFiles = action.data.files;
        draft.bridgeModels = updatedModels
        break
      case MESSAGES_LOADED:

        break
      case BRIDGE_SELECTED:
        if (!action.bid) {
          draft.bridgeLoaded = false,
          draft.bridge = null,
          draft.bridgeDetails = null,
          draft.bridgeSurveys = null,
          draft.customFieldsTemplate = null,
          draft.bridgeTasks = null,
          draft.bridgeModels = [],
          draft.bridgeSpans = null,
          draft.bridgeElements = null,
          draft.displayedSurvey = null,
          draft.selectedSurveyFiles = {
            images: [],
            glbModels: [],
            tiles: [],
            },
          draft.elementsGroups = [],
          draft.structureTypes = [],
          draft. elementsTypes = [],
          draft.bridgeTypes = [],
          draft.selectedObjectIds = [],
          draft.selectedElements = [],
          draft.focusedElement = null,
          draft.selectedTask = null,
          draft.selectedSubTask = null,
          draft.selectedSubTask = null,
          draft.viewData = null,
          draft.mode = null,
          draft.boundingSphere = null,
          draft.surveyFiledLoaded = false,
          draft.folderStructure = null,
          draft.selectedFolder = null,
          draft.nodes = null, 
          draft.messages = []
        }
        break
      case LOGOUT:
        console.log('LOGOUT', action)    
        draft.bridgeLoaded = false,
        draft.bridge = null,
        draft.bridgeDetails = null,
        draft.bridgeSurveys = null,
        draft.customFieldsTemplate = null,
        draft.bridgeTasks = null,
        draft.bridgeModels = [],
        draft.bridgeSpans = null,
        draft.bridgeElements = null,
        draft.displayedSurvey = null,
        draft.selectedSurveyFiles = {
          images: [],
          glbModels: [],
          tiles: [],
          },
        draft.elementsGroups = [],
        draft.structureTypes = [],
        draft. elementsTypes = [],
        draft.bridgeTypes = [],
        draft.selectedObjectIds = [],
        draft.selectedElements = [],
        draft.focusedElement = null,
        draft.selectedTask = null,
        draft.selectedSubTask = null,
        draft.selectedSubTask = null,
        draft.viewData = null,
        draft.mode = null,
        draft.boundingSphere = null,
        draft.surveyFiledLoaded = false,
        draft.folderStructure = null,
        draft.selectedFolder = null,
        draft.nodes = null,
        draft.messages = []

        break
      case actionTypes.SET_SHARED_STATE:
        draft[action.key] = action.value;
        break
      case actionTypes.MODEL_DELETED:
        console.log(action)
        draft.bridgeModels = state.bridgeModels.filter(
          model => model.id !== action.modelId
        )
        break
      case actionTypes.NEW_MODEL_CREATED:
        if (action.model.type == 'cad') {
          let updatedModels = [...state.bridgeModels]
          updatedModels.filter(model => model.type !== 'cad')
          updatedModels.push(action.model)
          draft.bridgeModels = updatedModels
        }
        // draft.bridgeModels = [...state.bridgeModels, ...action.data]
        break
      case MODEL_LOADED:
        if (action.model.id == state.bridge.primary_model_id)
          draft.nodes = action.nodes;
        break
      case actionTypes.SPAN_DELETED:
        draft.bridgeSpans = state.bridgeSpans.filter(
          span => span.id !== action.spanId
          )
        break
      case actionTypes.SURVEY_MESSAGES_LOADED:
        console.log('SURVEY_MESSAGES_LOADED', action)
        draft.messages = action.messages;
        break
      case TASK_UPDATED:
        let updatedTask = action.data;
        let updatedTasks = [...state.bridgeTasks]
        updatedTasks = updatedTasks.filter((task => task.id !== updatedTask.id));
        // console.log(updatedTasks)

        updatedTasks.push(updatedTask);
        draft.bridgeTasks = updatedTasks
        draft.selectedTask = updatedTask
        break;
      case ELEMENT_SELECTED:
        const element = state.bridgeElements.find(
          el => el.object_id == action.data,
        );

        let updatedSelectedObjectIds;

        // if (state.mode === 'Select Multiple mode') {

        //   if (state.selectedObjectIds.includes(action.data)) updatedSelectedObjectIds = state.selectedObjectIds.filter(node => node !== action.data)
        //   else updatedSelectedObjectIds = [action.data, ...state.selectedObjectIds ]
        // } else {
        //   if (state.selectedObjectIds[0] == action.data) updatedSelectedObjectIds = []
        //   else updatedSelectedObjectIds = [action.data]
        // }

        if (state.selectedObjectIds.includes(action.data)) updatedSelectedObjectIds = state.selectedObjectIds.filter(node => node !== action.data)
        else updatedSelectedObjectIds = [action.data, ...state.selectedObjectIds ]
        let viewData = null
        if (element && element.default_view_data && element.default_view_data !== 'undefined') {
          console.log(element)
          viewData = JSON.parse(element.default_view_data)
    
        } 
        draft.viewData = viewData
        draft.selectedObjectIds = updatedSelectedObjectIds
        draft.selectedElements = state.bridgeElements.filter(element => updatedSelectedObjectIds.includes(element.object_id))
        // draft.selectedElements = elements
        break
      case ELEMENTS_SELECTED:
        console.log('ELEMENTS_SELECTED', action)
        if (action.data.length) {
          if (action.data[0] == 'all') {
            // draft.selectedElements = state.bridgeElements
            draft.selectedObjectIds = state.bridgeElements.map(el => el.object_id)
            draft.selectedElements = state.bridgeElements
          } else {
            draft.selectedObjectIds = action.data
            draft.selectedElements = state.bridgeElements.filter(element => action.data.includes(element.object_id))
            // if (state.selectedObjectIds.includes(action.data[0])) {
            //   draft.selectedObjectIds = state.selectedObjectIds.filter(objId => !action.data.includes(objId))
            //   draft.selectedElements = state.selectedElements.filter(element => !action.data.includes(element.object_id))
            // } else {
            //   if (action.selectSingle) {
            //     draft.selectedObjectIds = action.data
            //     draft.selectedElements = state.bridgeElements.filter(el => action.data.includes(el.object_id))
            //   } else {
            //     draft.selectedObjectIds = [...state.selectedObjectIds, ...action.data]
            //     draft.selectedElements = [...state.selectedElements, ...state.bridgeElements.filter(el => action.data.includes(el.object_id))]

            //   }

            // }
          }
          break
    
        } else {
          draft.selectedObjectIds= []
          draft.selectedElements = []
          break
        }
      case (actionTypes.ELEMENTS_UPDATED):
        console.log('ELEMENTS_UPDATED', action)
        let elsCopy = [...state.bridgeElements];
        let selectedElementsCopy = [...state.selectedElements];
        action.data.forEach(element => {
          elsCopy = elsCopy.filter(el => el.object_id !== element.object_id)
          elsCopy.push(element)

          selectedElementsCopy = selectedElementsCopy.filter(el => el.object_id !== element.object_id)
          selectedElementsCopy.push(element)
              
        });
        // console.log(elsCopy)
        draft.bridgeElements = elsCopy,
        draft.selectedElements = selectedElementsCopy;
        break
      case (actionTypes.SPAN_UPDATED):
        // console.log(action.data)
        let spans = state.bridgeSpans.filter(span => span.id !== action.data.id)
        // console.log(spans)
        spans.push(action.data)
        draft.bridgeSpans = spans
        break
      case actionTypes.SPANS_UPDATED:
        const updatedBridgeSpans = sortBy('span_order', action.data);
        draft.bridgeSpans = updatedBridgeSpans
        break
      case (actionTypes.ELEMENT_UPDATED):
        // console.log(action.data)
        let els = state.bridgeElements.filter(el => el.object_id !== action.data.object_id)
        // console.log(els)
        els.push(action.data)
        draft.bridgeElements = els;
        break
      case(actionTypes.ELEMENTS_SAVED):
        console.log('ELEMENTS_SAVED', action.data)
        console.log('ELEMENTS_SAVED', state.bridgeElements)

        break
      case UPDATE_RESIUM_MODE:
        console.log('UPDATE_RESIUM_MODE', action)
        if (action.data === state.mode) {
          draft.mode = ''
          // if (action.data == 'Show only selected') {
          //   draft.selectedObjectIds = []
          // }
          break
        } else {
          draft.mode = action.data;
          break
        }

      case MESSAGE_CREATED:
        console.log('MESSAGE_CREATED', action)
        draft.messages = [...state.messages, action.msg]
        break

      default:
        return state;
    }
    // }
  });

export default bridgePageReducer;
