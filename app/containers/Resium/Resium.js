import React, { useState, useRef, memo, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader/root';

import {
  Color,
  ArcGisMapServerImageryProvider,
  BingMapsImageryProvider
} from 'cesium';
import * as actions from './actions';
import * as selectors from './selectors';
import { editElement, 
  updateElements, 
  updateModel, 
  showInView, 
  setSharedState, 
  updateBridgeDefaultView,
  deleteModel } from 'containers/BridgeModul/actions';
import { createMessage } from 'containers/AppData/actions';
import { toggleModal, toggleAlert } from 'containers/App/actions';
import { setSelectedTab } from '../BridgeModul/LeftViewComponent/actions';
import { MDBBtn, MDBIcon } from 'mdbreact'
import {
  Viewer,
  Entity,
  EntityDescription,
  PointGraphics,
  PointPrimitiveCollection,
  PointPrimitive,
  LabelCollection,
  Camera,
  Label,
  ImageryLayer,
  Cesium3DTileset,
  KmlDataSource,
  CesiumWidget,
  ScreenSpaceCameraController,
} from 'resium';
import { getColor } from './cesiumUtils';
import {
  makeSelectBridge,
  makeSelectBridgeModels,
  makeSelectDisplayedSurvey,
  makeSelectBridgeSpans,
  makeSelectBridgeElements,
  makeSelectSelectedObjectIds,
  makeSelectSelectedElements,
  makeSelectElementsGroups,
  makeSelectStructureTypes,
  makeSelectElementsTypes,
  makeSelectBridgeTypes,
  makeSelectSelectedTask,
  makeSelectSelectedSubTask,
  makeSelectViewData,
  makeSelectMode,
  makeSelectBoundingSphere
} from '../BridgeModul/selectors';
import { setFocusedElement } from 'containers/BridgeModul/Project/SpansTab/actions'
import  useKey  from 'utils/customHooks/useKey';
import useHover from 'utils/customHooks/useHover';
import CustomSlider from 'components/Slider/Slider';
import Polyline from './Polyline';
// import Polygone from './Polygone';
import TileSet from './TileSet';
import NameOverLay from './NameOverLay';
import RightClickMenu from './RightClickMenu';
import ModelComponent from './ModelComponent';
import MouseLocation from './MouseLocation'
import ElementsComparisonModul from 'containers/BridgeModul/ElementsComparisonModul/ElementsComparisonModul';
import GeoJsonMarker from './GeoJsonMarker';
import ResiumToolBar from 'components/ResiumToolBar/ResiumToolBar';
import CesiumNotifications from './CesiumNotifications'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import Input from 'components/Input/Input';
import './Resium.css';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import CalibrationGlobe from './CalibrationGlobe';
import Transforms from './Transforms';
import { conforms } from 'lodash';
import reducer from './reducer';
const key = 'resium';
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YTRiNDU3Yy0yY2QxLTQ1MDgtYWI4MS1jNTI4MDRmOTExOGEiLCJpZCI6MjExMzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODA3NjY5NDB9.Qh9GeO3SxngGTX-xvWbfyHQ3p5vNNQ3SgGlc2NgtDOg';

export const convertCartesianToDegrees = (point, ellipsoid) => {
  // console.log(point)
  const cartographic = ellipsoid.cartesianToCartographic(point);
  const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
    10,
  );
  const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
    10,
  );
  const heightString = cartographic.height.toFixed(2);
  return {
    lon: parseFloat(longitudeString),
    lat: parseFloat(latitudeString),
    height: parseFloat(heightString),
  };
};
const Resium = props => {
  useInjectReducer({ key, reducer });
  const [selectedItem, setSelectedItem] = useState(
    props.models.length && props.models[0] !== undefined
      ? props.models[0].name
      : '',
  );
  const [labels, setLabels] = useState([]);
  const [points, setPoints] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [polygones, setPolygones] = useState([]);
  const [movingPolylinePositions, setmovingPolylinePositions] = useState();
  const [closingPolylinePositions, setclosingPolylinePositions] = useState();
  const [pointsCollection, setPointsCollection] = useState(null);
  const [pointsPrimitives, setPointsPrimitives] = useState([]);
  const [color, setColor] = useState('red');
  const [silhouetteColor, setSilhouetteColor] = useState('red');
  const [silhouetteSize, setSilhouetteSize] = useState(1);
  const [silhouetteAlpha, setSilhouetteAlpha] = useState(1);
  const [degrees3dArray, setDegrees3dArray] = useState([]);
  const [degrees2dArray, setDegrees2dArray] = useState([]);
  const [alpha, setAlpha] = useState(1);
  const [calibrationState, setCalibrationState] = useState(null);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [multiplier, setMultiplier] = useState(100000);
  const [step, setStep] = useState(5);
  const [rotationStep, setRotationStep] = useState(1);
  const [rotationMultiplier, setRotationMultiplier] = useState(1);
  const [tileSetBoundingSphere, setTileSetBoundingSphere] = useState();
  const [showOverLay, setShowOverLay] = useState(false);
  const [showRightClickMenu, setShowRightClickMenu] = useState(false);
  const [overLayName, setOverLayName] = useState('');
  const [overLayElement, setOverLayElement] = useState({});
  const [overLayPosition, setOverLayPosition] = useState({});
  const [toolBarOpen, settoolBarOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState();
  // const [entityTitle, setEntityTitle] = useState(props.bridge.name);
  const [entitySubTitle, setEntitySubTitle] = useState('');
  const [entityDescription, setEntityDescription] = useState('');
  const [calibrationMode, setCalibrationMode] = useState();
  const [resetCameraView, setResetCameraView] = useState();
  const [rightClickMenuActions, setRightClickMenuActions] = useState([
    { name: 'Set current view' },
    { name: 'Add Annotation' },
    { name: 'Show Selected elements' },
    { name: 'Show this element' },
  ]);
  const [calibrationGlobePosition, setCalibrationGlobePosition] = useState();
  let viewer; let camera; let scene; let globe; let geodesic; let ellipsoid;

  const hasTileSet = models => {
    let hasTile = false;
    for (let index = 0; index < models.length; index++) {
      const model = models[index];
      if (model.type == 'model') {
        hasTile = true;
        break;
      }
    }
    return hasTile;
  };

  let distanceLabel; let verticalLabel; let horizontalLabel;

  const LINEPOINTCOLOR = Cesium.Color.RED;
  const CENTERPOINTCOLOR = Cesium.Color.GREEN;
  const CLOSINGLINECOLOR = Cesium.Color.GREEN;
  const LINECOLOR = Cesium.Color.WHITE;
  const label = {
    font: '12px sans-serif',
    showBackground: true,
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.CENTER,
    pixelOffset: new Cesium.Cartesian2(0, 0),
    eyeOffset: new Cesium.Cartesian3(0, 0, -0.5),
    fillColor: Cesium.Color.WHITE,
  };
  const viewerRef = useRef(null);
  // VeiwerRef useEffect
  useEffect(() => {
    if (viewerRef.current) {
      viewer = viewerRef.current.cesiumElement;
      viewer.scene.globe.depthTestAgainstTerrain = true;
      scene = viewer.scene;
      camera = viewer.camera;
      globe = scene.globe;

      ellipsoid = globe.ellipsoid;
      console.log(viewer.scene.imageryLayers.get(0))
      // console.log(viewer.scene.imageryLayers.get(2))
      setPointsCollection(
        scene.primitives.add(new Cesium.PointPrimitiveCollection()),
      );
      setPolylines(scene.primitives.add(new Cesium.PolylineCollection()));

      document.addEventListener('contextmenu', function(e) {
        // e.preventDefault()
      });
    }

    return () => {
      // console.log(viewerRef)
      // viewerRef.current.cesiumElement.entities.removeAll();
      // viewerRef.current.cesiumElement.destroy()
    };
  }, [viewerRef]);
  // useEffect(() => {
  //   if (viewerRef.current && props.models.length > 1) {
  //     viewerRef.current.cesiumElement.entities.removeAll();
  //     viewerRef.current.cesiumElement.destroy()
  //   }

  //   return () => {
  //   }
  // }, [props.destroy]);
  useEffect(() => () => {
      // if (viewerRef.current && props.models.length > 1) {
   
        viewerRef.current.cesiumElement.entities.removeAll();
        viewerRef.current.cesiumElement.destroy()
      // }
    }, []);
  // props.bridge useEffect
  useEffect(() => {
    if (props.bridge) {
      const bridgeLocation = Cesium.Cartesian3.fromDegrees(
        props.bridge.lon,
        props.bridge.lat,
      );
      addPoint(bridgeLocation);
      // console.log(props.bridge)
      if (viewerRef.current) {
        if (props.bridge.default_view_data) {
          const defaultView = JSON.parse(props.bridge.default_view_data);
          console.log('defaultView', defaultView);
          // console.log('camera', camera)
          setResetCameraView(defaultView);
          camera.setView({
            destination: defaultView.position,
            orientation: {
              heading : defaultView.heading, 
              pitch : defaultView.pitch,
              roll : defaultView.roll                             
            },
          });
          // camera.flyToBoundingSphere(
          //    defaultView.boundingSphere,
          //   {
          //     offset: new Cesium.HeadingPitchRange(defaultView.heading, defaultView.pitch, defaultView.roll),
          //     duration: 0.2
          //   },
          // );
        } else if (!props.models.length) {
            zoomToBridge()
          }
      }
    }
    return () => {};
  }, [props.bridge]);
  // props.models useEffect
  useEffect(() => {
    console.log('MODELS CHANGED!!!!!!!!');

    // viewer && viewer.entities.removeAll()
    setmovingPolylinePositions();
    setclosingPolylinePositions();
    setLabels([]);
    // setPoints([]);
    setPolylines([]);
    setPolygones([]);
    pointsCollection && pointsCollection.removeAll();
    // setPointsCollection(null)
    setPointsPrimitives([]);
    if (
      props.models.length &&
      !hasTileSet(props.models) &&
      !props.bridge.default_view_data &&
      viewerRef.current
    ) {
      zoomToBridge();
    }
    if (props.models.length) setModelsControlerStates(props.models);
  }, [props.models]);

  // props.viewData useEffect
  // useEffect(() => {
  //   if (viewerRef.current) {
  //     console.log('viewerRef.current.cesiumElement', viewerRef.current.cesiumElement)
  //     const camera = viewerRef.current.cesiumElement.camera;
  //     if (props.viewData && viewerRef && props.mode == 'Zoom to element') {

  //       camera.lookAt(
  //         props.boundingSphere.center,
  //         new Cesium.HeadingPitchRange(
  //           props.viewData.heading,
  //           props.viewData.pitch,
  //           20,
  //         ),
  //       );
  //       // camera.viewRectangle(props.viewData, ellipsoid)
  //     }

  //   }
  // }, [props.viewData]);

  // polygones useEffect
  useEffect(() => {
    polygones.length && polygones.map((polygonePoints, index) => {
      const polygone = addPolygoneEntity(
          polygonePoints,
          `Polygone ${index + 1}`
          )
    })
    // }
    return () => {};
  }, [polygones]);
  useEffect(() => {
    console.log('escape changed');
    setmovingPolylinePositions();
    setclosingPolylinePositions();
    setPolygones([]);
    setLabels([]);
    setPointsPrimitives([]);
    if (pointsCollection && pointsCollection.length)
      pointsCollection.removeAll();
    if (viewer) viewer.entities.removeAll();
  }, [esc]);
  useEffect(() => {
    if (props.zoomElement && viewerRef.current) {
      const element = props.bridgeElements.find(
        el => el.object_id == props.zoomElement,
      );
      const viewData = JSON.parse(element.default_view_data);
      console.log(viewData);
      if (viewData) {
        const target = viewData.position;

        viewer.camera.setView({
          destination: target,
          orientation: {
            heading : viewData.heading, // east, default value is 0.0 (north)
            pitch : viewData.pitch,    // default value (looking down)
            roll : viewData.roll                             // default value
          },
        });
      }
    }

    return () => {};
  }, [props.zoomElement]);
  // useEffect(() => {
  //   console.log('control changed')
  //   if (keyA === true) props.updateMode("Select elements");
  //   else {
  //     props.updateMode('')
  //   }
  // }, [keyA]);
  const pickedEntities = new Cesium.EntityCollection();
  const pickColor = Cesium.Color.YELLOW.withAlpha(0.5);
  if (viewerRef.current) {
    viewer = viewerRef.current.cesiumElement;
    scene = viewer.scene;
    ellipsoid = scene.globe.ellipsoid;
    camera = viewer.camera;
  }
  // const shift = useKey('shift')
  // const ctrl = useKey('control')
  const esc = useKey('escape');

  const zoomToBridge = () => {
    const bridgeLocation = Cesium.Cartesian3.fromDegrees(
      props.bridge.lon,
      props.bridge.lat,
      300,
    );
    zoomToPoint(bridgeLocation, 100);
  };

  const setModelsControlerStates = models => {
    console.log('SETTING DATA', models);
    const calibrationObj = {};
    models.map((model, index) => {
      let calibrationData = null;
      let center = null;
      if (
        model.calibration_data &&
        model.calibration_data !== 'undefined' &&
        model.calibration_data !== 'null'
      ) {
        calibrationData = JSON.parse(model.calibration_data);
        center = JSON.parse(model.calibration_data);
      } else {
        calibrationData = {
          lon:
            props.bridge && props.bridge.lon
              ? props.bridge.lon
              : props.background.lon,
          lat:
            props.bridge && props.bridge.lat
              ? props.bridge.lat
              : props.background.lat,
          height:
            props.bridge && props.bridge.height ? props.bridge.height : 100,
          'rotate-x': 0,
          'rotate-y': 0,
          'rotate-z': 0,
        };
        center = {
          lon: props.bridge && props.bridge.lon ? props.bridge.lon : 0,
          lat: props.bridge && props.bridge.lat ? props.bridge.lat : 0,
          height: 0,
        };
      }
      let show = false;
      if (
        (model.id && model.id == props.bridge.primary_model_id) ||
        model.type == 'model' ||
        model.isNew
      )
        show = true;
      calibrationObj[`${model.name}`] = {
        calibrationData,
        center,
        show,
        alpha: 1,
      };
    });

    setCalibrationState(calibrationObj);
  };

  const getItem = (itemType, itemName) => {
    switch (itemType) {
      case 'models':
        return props.models.filter(model => model.name === itemName)[0];
      case 'tiles':
        return props.tiles.filter(tileSet => tileSet.name === itemName)[0];
    }
  };

  const handleSelectedEntityChanged = () => {
    // console.log(console.log('viewerRef.current.cesiumElement', viewerRef.current.cesiumElement))
    // if (!viewerRef.current.cesiumElement) {
    //   return;
    // }
    // const selectedEntity = viewerRef.current.cesiumElement.selectedEntity;
    // if (selectedEntity) {
    //   // console.log('akjsdhkajshdkjasdh')
    //   // viewer.camera.flyToBoundingSphere(
    //   //   new BoundingSphere(selectedEntity.position.getValue(viewer.clock.currentTime), 1000),
    //   //   { duration: 1 }
    //   // );
    // }
  };

  const handleActionFromResiumToolBar = (
    value,
    actionGroup,
    actionName,
    modelName,
    modelId,
  ) => {
    console.log(
      'handleActionFromResiumToolBar',
      value,
      actionGroup,
      actionName,
      modelName,
      modelId,
    );
    switch (actionGroup) {
      case 'Models':
        const updatedCalibrationState = { ...calibrationState };
        const updatedItem = { ...updatedCalibrationState[modelName] };
        console.log(updatedItem);
        switch (actionName) {
          case 'Alpha':
            console.log('setting alpha ', value);

            updatedItem.alpha = value;

            updatedCalibrationState[modelName] = updatedItem;
            setCalibrationState(updatedCalibrationState);
            break;
          case 'Delete':
            if (props.bridge.primary_model_id == modelId) {
              props.onToggleAlert({
                title: `${modelName} is a primary model`,
                text:
                  'Primary models cant be deleted',
                confirmButton: 'Got it',
                // cancelButton: 'Cancel',
                alertType: 'danger',
                // confirmFunction: () => {
                // }
              })
            } else {
              props.onToggleAlert({
                title: `Are you sure you want to delete ${modelName}?`,
                text:
                  'Model will be deleted from database and google cloud permanently',
                confirmButton: 'Delete',
                cancelButton: 'Cancel',
                alertType: 'danger',
                confirmFunction: () => {
                  console.log(props.models);
                  console.log(modelName);
                  console.log(modelId);
                  console.log(props.task)
                  const model = props.models.find(model => model.id == modelId);
                  console.log(model);
                  // const urlTimeStamp = model.url.split('/').find(string => !isNaN(+string) && +string !== 0 && string.length > 10)
                  // console.log(urlTimeStamp)
                  let prefix
                  if (model.folder_id) {
                    prefix = `bid_${model.bid}/survey_${model.survey_id}/Models/3d tiles/${model.folder_id}/`
                  } else {
                    prefix = `bid_${model.bid}/survey_${model.survey_id}/Models/Glb/${modelName}`
                  }
                  props.onDeleteModel(
                    model.id,
                    `3dbia_organization_${props.bridge.organization_id}`,
                    prefix,
                  );
                },
              });

            }
            break;
          case 'Show':
            // updatedItem.show = value === 'true' || value == true ? false : true;
            updatedItem.show = !updatedItem.show;
            updatedCalibrationState[modelName] = updatedItem;
            setCalibrationState(updatedCalibrationState);
            break;
          default:
            break;
        }
        break;
      case 'Views':
        let heading;
        let pitch;
        let range;
        console.log(tileSetBoundingSphere)
        switch (actionName) {
          case 'Top':
            heading = Cesium.Math.toRadians(-90);
            pitch = Cesium.Math.toRadians(-90.0);
            range = 130;
            // camera.lookAt(
            //   tileSetBoundingCenter,
            //   new Cesium.HeadingPitchRange(
            //     heading,
            //     pitch,
            //     50,
            //   ),
            // );
            camera.flyToBoundingSphere(tileSetBoundingSphere, {
              offset: new Cesium.HeadingPitchRange(heading, pitch, range),
              duration: 0.5,
            });
            break;
          case 'Bottom':
            // heading = 0.2667257632392488;
            heading = Cesium.Math.toRadians(90);
            pitch = Cesium.Math.toRadians(90.0);
            range = 130;
            camera.flyToBoundingSphere(tileSetBoundingSphere, {
              offset: new Cesium.HeadingPitchRange(heading, pitch, range),
              duration: 0.5,
            });
            break;
          case 'Front':
            heading = Cesium.Math.toRadians(0.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150;
            camera.flyToBoundingSphere(tileSetBoundingSphere, {
              offset: new Cesium.HeadingPitchRange(heading, pitch, range),
              duration: 0.5,
            });
            break;
          case 'Back':
            heading = Cesium.Math.toRadians(180.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150;
            camera.flyToBoundingSphere(tileSetBoundingSphere, {
              offset: new Cesium.HeadingPitchRange(heading, pitch, range),
              duration: 0.5,
            });
            break;
          case 'Left':
            heading = Cesium.Math.toRadians(90.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150;
            camera.flyToBoundingSphere(tileSetBoundingSphere, {
              offset: new Cesium.HeadingPitchRange(heading, pitch, range),
              duration: 0.5,
            });
            break;
          case 'Right':
            heading = Cesium.Math.toRadians(270.0);
            pitch = Cesium.Math.toRadians(0.0);
            range = 150;
            camera.flyToBoundingSphere(tileSetBoundingSphere, {
              offset: new Cesium.HeadingPitchRange(heading, pitch, range),
              duration: 0.5,
            });
            break;

          default:
            break;
        }
        break;
      case 'Calibration':
        switch (actionName) {
          case 'Select entity':
            // console.log(value);
            setSelectedItem(value);
            break;
          case 'Adust Accuracy':
            console.log(Math.pow(10, value));
            setMultiplier(Math.pow(10, value));
            setStep(value);
          default:
            console.log(calibrationState);
            const updatedCalibrationState = { ...calibrationState };
            const updatedItem = { ...updatedCalibrationState[selectedItem] };
            updatedItem.calibrationData[actionName.toLowerCase()] = value;
            // console.log(updatedItem, selectedItem)
            updatedCalibrationState[selectedItem] = updatedItem;
            // console.log(updatedCalibrationState[selectedItem]);
            setCalibrationState(updatedCalibrationState);
            break;
        }
        break;
      case 'Rotate':
        switch (actionName) {
          case 'Select entity':
            // console.log(value)
            setSelectedItem(value);
            break;
          case 'Adust Accuracy':
            // console.log(Math.pow(10, value))
            console.log(value);
            setRotationMultiplier(Math.pow(10, value) / 10);
            setRotationStep(value);
            break;
          default:
            const updatedCalibrationState = { ...calibrationState };
            const updatedItem = { ...updatedCalibrationState[selectedItem] };
            console.log(updatedItem.calibrationData[actionName.toLowerCase()]);
            updatedItem.calibrationData[actionName.toLowerCase()] = value;
            // console.log(updatedItem, selectedItem)
            updatedCalibrationState[selectedItem] = updatedItem;
            console.log(updatedCalibrationState[selectedItem]);
            setCalibrationState(updatedCalibrationState);
            break;
        }
        break;
      case 'Colors':
        switch (actionName) {
          case 'Colors':
            if (value) {
              setColor(value);
            }

            break;
          case 'Alpha':
            setAlpha(value);

            // console.log(color)
            break;
          case 'Border Color':
            if (value) {
              setSilhouetteColor(value);
            }

            break;

          case 'Border alpha':
            setSilhouetteAlpha(value);

            // console.log(color)
            break;
          case 'Border size':
            setSilhouetteSize(value);

            // console.log(color)
            break;

          default:
            break;
        }
        break;
      case 'accuracy':
        console.log(Math.pow(10, value));
        setMultiplier(Math.pow(10, value));
        setStep(value);
        break;
      case 'sideAction':
        pointsCollection.removeAll();
        // viewer.entities.removeAll();
        props.updateMode(actionName);
        // setLabels([])
        break;
      case 'ResetView':
        console.log(resetCameraView);
        if (resetCameraView) {
          camera.setView({
            destination: resetCameraView.position,
            orientation: {
              heading : resetCameraView.heading, // east, default value is 0.0 (north)
              pitch : resetCameraView.pitch,
              roll : resetCameraView.roll                             // default value
            },
          });
          // camera.flyToBoundingSphere(
          //   resetCameraView.boundingSphere,
          //   {
          //     offset: new Cesium.HeadingPitchRange(resetCameraView.heading, resetCameraView.pitch, 100),
          //     duration: 0.2
          //   },
          // );
        } else {
          zoomToBridge();
        }
        // viewer.camera.setView({
        //   destination : resetCameraView.position,
        //   orientation: {
        //       heading : resetCameraView.heading, // east, default value is 0.0 (north)
        //       pitch : resetCameraView.pitch,
        //       roll : resetCameraView.roll                            // default value
        //   }
        //   // orientation: {
        //   //     heading : Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north)
        //   //     pitch : Cesium.Math.toRadians(-90),
        //   //     roll : 1                             // default value
        //   // }
        // });
        // camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.5, -0.2, boundingSphere.radius * 4.0));
        // camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        //   viewer.zoomTo(tileCenter);
        break;
    }
  };
  // console.log(resetCameraView)
  const save = actionGroup => {
    const model = props.models.filter(model => model.name == selectedItem)[0];
    // console.log(model);
    // console.log(actionGroup);
    const {calibrationData} = calibrationState[selectedItem];
    console.log(calibrationData);

    model.calibration_data = JSON.stringify(calibrationData);
    props.save(model);
  };

  const reset = actionGroup => {
    // let model = props.models.filter(model => model.name == selectedItem)[0];

    // console.log(calibrationState[selectedItem].center)
    const updatedState = { ...calibrationState };
    const updatedItem = { ...updatedState[selectedItem] };
    updatedItem.calibrationData = { ...updatedItem.center };
    updatedState[selectedItem] = updatedItem;
    // console.log(updatedState)
    setCalibrationState(updatedState);
  };

  const handleModelLoad = (nodes, model) => {
    if (model.isNew) {
      props.onToggleModal({
        title: 'New glb was uploaded',
        text: '',
        // confirmButton: 'Save',
        // cancelButton: 'Cancel',
        // formType: 'modelForm',
        data: {
          editMode: 'Import',
        },
        // confirmFunction: (elements) => console.log(elements),
        body: (
          <ElementsComparisonModul
            elements={props.bridgeElements}
          nodes={nodes}
            model={model}
        />
        )
        // body: <div>New model detected</div>
      })
    }
  };
  const handleTileSetReady = (tileset, modelName) => {
    console.log('TILESETREADY', tileset.boundingSphere)
    // console.log(viewerRef.current.cesiumElement.camera)
    // console.log(tileset)
    setTileSetBoundingSphere(tileset.boundingSphere);
    // props.onSetCesiumNotification('Ready', false)
    if (!props.bridge.default_view_data) {
      // if (props.models.length == 1) {
      viewerRef.current.cesiumElement.zoomTo(tileset);

      // }

      setTimeout(() => {
        // const position = tileset.boundingSphere.center
        const view = getCurrentViewData();
        setResetCameraView(view);
        props.onUpdateBridgeDefaultView(view, props.bridge.bid);
      }, 1000);
    }
  };

  const addPoint = point => {
    console.log('point', point);
    setPoints([...points, point]);
  };

  const zoomToPoint = (point, range) => {
    const currentView = getCurrentViewData();
    viewerRef.current.cesiumElement.camera.setView({
      destination: point,
      orientation: {
        heading : Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north)
        pitch : Cesium.Math.toRadians(-90),
        roll : 1                             // default value
      },
    });
    // viewerRef.current.cesiumElement.scene.camera.lookAt(
    //   point,
    //   new Cesium.HeadingPitchRange(
    //     currentView.heading,
    //     currentView.pitch,
    //     range,
    //   ),
    // );
  };

  const handleViewerClick = (m, t) => {
    // setShowOverLay(true);
    // console.log(toolBarOpen)
    // if (toolBarOpen)
    settoolBarOpen(!toolBarOpen);
    const {scene} = viewerRef.current.cesiumElement
    const cartesian = scene.pickPosition(m.position);
    const pickedFeature = scene.pick(m.position);

    switch (props.mode) {
      case 'Add entities':
        addPoint(cartesian);
        break;
      case 'Measure line':
        if (pickedFeature) {
          // console.log(props.boundingSphere)
          const initialGeoPosition = Cesium.Cartographic.fromCartesian(
            cartesian,
          );
          const lastGeoPosition = Cesium.Cartographic.fromCartesian(
            cartesian,
          );

          const newPositions = [
            new Cesium.Cartesian3.fromRadians(
              initialGeoPosition.longitude,
              initialGeoPosition.latitude,
              initialGeoPosition.height,
            ),
            new Cesium.Cartesian3.fromRadians(
              lastGeoPosition.longitude,
              lastGeoPosition.latitude,
              lastGeoPosition.height,
            ),
          ];
          setmovingPolylinePositions([cartesian, cartesian]);
        }
        drawMeasureLine(scene, viewer, pickedFeature, cartesian);

        break;
      case 'Measure polyline':
        if (pickedFeature) {
          // console.log(props.boundingSphere)
          setmovingPolylinePositions([cartesian, cartesian]);
          drawMeasurePolygone(scene, viewer, pickedFeature, cartesian);

        }

        break;
      case 'Measure polygone':
        if (pickedFeature) {
          setmovingPolylinePositions([cartesian, cartesian]);
          drawMeasurePolygone(pickedFeature, cartesian);
        }
        break;
      case 'Zoom to element':
        if (pickedFeature) zoomToPoint(cartesian, 20);
        break;
      default:
        if (pickedFeature && pickedFeature.node) {
          props.onNodeSelected(pickedFeature.node.name, props.mode);
          props.onFocusElement(pickedFeature.node.name);
        }
        break;
    }
    setShowRightClickMenu(false);
  };

  const handleViewerRightClick = (m, t) => {
    const viewer = viewerRef.current.cesiumElement;
    setShowOverLay(false);
    const pickedFeature = viewer.scene.pick(m.position);
    const cartesian = viewer.scene.pickPosition(m.position);
    const {ellipsoid} = viewer.scene.globe
    const degrees = convertCartesianToDegrees(cartesian, ellipsoid);
    if (
      props.selectedSubTask &&
      props.selectedSubTask.name == 'Calibrate models'
    ) {
      setOverLayPosition({
        bottom: viewer.canvas.clientHeight - m.position.y,
        left: m.position.x,
        lon: degrees.lon,
        lat: degrees.lat,
        height: degrees.height,
      });
      setRightClickMenuActions([{ name: 'Position calibration globe here' }]);
      setShowRightClickMenu(true);
    } else if (!Cesium.defined(pickedFeature)) {
        setShowRightClickMenu(false);
      } else {
        setOverLayPosition({
          bottom: viewer.canvas.clientHeight - m.position.y,
          left: m.position.x,
          lon: degrees.lon,
          lat: degrees.lat,
          height: degrees.height,
        });
        switch (props.mode) {
          case 'Add entities':
            
            break;
          case 'Measure line':
            
            if (!polylines.length) {
              // console.log(props.boundingSphere)
              
              setmovingPolylinePositions();
              break
            }
           
    
            break;
          case 'Measure polygone':
            // if (pickedFeature) {
              setmovingPolylinePositions();
              setclosingPolylinePositions();
              if (pointsPrimitives.length > 2)
              drawMeasurePolygone(pickedFeature, pointsPrimitives[0].position);
             
              let polygonePoints = [];
              pointsPrimitives.map(point => polygonePoints.push(point.position))
              
              setPolygones([...polygones, polygonePoints]);
              setPointsPrimitives([]);
              pointsCollection.removeAll()
            // }
            break;
          case 'Select elements':
            if (!props.selectedObjectIds.length)
              setOverLayName('Id ' + pickedFeature.node.id);
  
            if (props.selectedObjectIds.includes(pickedFeature.node.id))
              setOverLayName('Ids ' + props.selectedObjectIds);
            else
              setOverLayName(
                'Ids ' + [...props.selectedObjectIds, pickedFeature.node.id],
              );
            
            setShowRightClickMenu(true);
            
            break;
          default:
            if (pickedFeature && pickedFeature.node)  {
              
              const hoveredElement = props.bridgeElements.find(el => el.object_id == pickedFeature.node.name)
              if (
                pickedFeature.node && !props.selectedObjectIds.includes(pickedFeature.node.name)
              ) {
                // props.onNodeSelected(pickedFeature.node.name);
              } else setOverLayName('No node');
              setOverLayName(pickedFeature.node.name);
              setOverLayElement(hoveredElement);
              setShowRightClickMenu(true);
              break;
  
            }
        }
      }
  };

  const handleRightMenuClick = (
    action,
    elementType,
    elementGroupId,
    spanId,
  ) => {
    console.log(action, elementType, elementGroupId, spanId);
    const updatedElements = [...props.bridgeElements];
    switch (action) {
      case 'Allocate to Span':
        const elementsToUpdate = [];
        for (const id of props.selectedObjectIds) {
          const updatedElement = updatedElements.find(el => el.object_id == id);
          updatedElement.span_id = spanId;
          updatedElement.element_group_id = elementGroupId;
          updatedElement.element_type_id = elementType.id;
          updatedElement.primary_unit = elementType.primary_unit;
          updatedElement.secondary_unit = elementType.secondary_unit;
          updatedElement.importance = elementType.importance;
          updatedElement.detailed_evaluation_required =
            elementType.detailed_evaluation_required;
          updatedElement.remarks = elementType.remarks;

          console.log(updatedElement);
          elementsToUpdate.push(updatedElement);
        }
        // console.log(updatedElements)
        props.updateElements(elementsToUpdate);
        break;
      case 'Show this element':
        console.log(props.selectedElements[0]);
        console.log(overLayElement.object_id);
        props.onElementsSelected([overLayElement.object_id]);
        props.onShowInView('bottomView', 'elements', 'edit');
        props.onSetSelectedTab('Spans');
        // if (props.selectedElements[0] && props.selectedElements[0].object_id == overLayElement.object_id){

        // } else {
        //   props.onElementsSelected([overLayElement.object_id], true)
        //   props.onShowInView('bottomView', 'elements', 'edit')
        //   props.onSetSelectedTab('Spans')
        // }

        break;
      case 'Show Selected elements':
        // console.log(overLayElement)
        props.onShowInView('bottomView', 'elements', 'edit');
        props.onSetSelectedTab('Spans');
        // if (!props.selectedElements.find(el => el.object_id == overLayElement.object_id)){
        //   props.onElementsSelected([overLayElement.object_id], false)
        //   props.onShowInView('bottomView', 'elements', 'edit')
        //   props.onSetSelectedTab('Spans')
        // }
        break;
      case 'Set current view':
        const viewData = getCurrentViewData();
        console.log(viewData);
        const updatedElement = updatedElements.find(
          el => el.object_id == props.selectedObjectIds[0],
        );
        updatedElement.default_view_data = JSON.stringify(viewData);
        console.log(updatedElement);
        props.editElement(updatedElement);
        break;
      case 'Add Annotation':
        console.log(overLayElement);
        console.log(overLayPosition);
        props.onToggleModal({
          title: `Add Annotation to '${overLayElement.object_id}'`,
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'annotationForm',
          data: {
            editMode: 'edit',
            colWidth: 12,
          },
          // options: {
          //   buttonText: 'Add users',
          //   options: [],
          // },
          confirmFunction: (data, event) => {
            console.log(data);
            // const location = JSON.stringify({
            //   lat: overLayPosition.lat,
            //   lon: overLayPosition.lon,
            //   height: overLayPosition.height
            // })
            const location = JSON.stringify(getCurrentViewData());
            addAnnotation(
              data.subject,
              data.message,
              location,
              overLayElement.id,
            );
          },
        });
        break;
      case 'Position calibration globe here':
        console.log(overLayPosition);
        setCalibrationGlobePosition(overLayPosition);
        break;
      default:
        break;
    }
    setShowRightClickMenu(false);
  };
  const addAnnotation = (subject, message, location, elementId) => {
    const messageObject = {
      sender_user_id: props.currentUser.userInfo.id,
      receiver_user_id: null,
      subject,
      message,
      createdAt: Date.now(),
      type: null,
      status: 'Sent',
      task_id: props.selectedTask ? props.selectedTask.id : null,
      survey_id: props.survey.id,
      bid: props.bridge.bid,
      parent_message_id: null,
      location,
      element_id: elementId,
    };
    props.onCreateMessage(messageObject);
  };
  const handleViewerMouseMove = (movement, t) => {
    // console.log(movement)
    if (calibrationMode == 'lon') {
      const yDifference = movement.startPosition.y - movement.endPosition.y;
      const xDifference = movement.startPosition.x - movement.endPosition.x
      console.log(yDifference)
      const updatedCalibrationState = { ...calibrationState };
      let updatedItem = { ...updatedCalibrationState[selectedItem] };

      let newGlobePosition = {...calibrationGlobePosition}
      updatedItem.calibrationData.lon = updatedItem.calibrationData.lon - yDifference/multiplier ;
      newGlobePosition.lon = calibrationGlobePosition.lon - yDifference/multiplier
      // console.log(updatedItem, selectedItem)
      updatedCalibrationState[selectedItem] = updatedItem;
      // console.log(updatedCalibrationState[selectedItem]);
      setCalibrationState(updatedCalibrationState);
      setCalibrationGlobePosition(newGlobePosition)


      
    } else {
      const height = viewerRef.current.cesiumElement.camera.positionCartographic.height.toFixed(
        2,
      );
      const cartesianEndposition = viewerRef.current.cesiumElement.scene.pickPosition(
        movement.endPosition,
      );
      const {ellipsoid} = viewerRef.current.cesiumElement.scene.globe
      // console.log(ellipsoid)
      if (cartesianEndposition) {
        const degrees = convertCartesianToDegrees(
          cartesianEndposition,
          ellipsoid,
        );
        const mousePos = { ...degrees, height: height };
        setMousePosition(mousePos);
        const pickedFeature = viewerRef.current.cesiumElement.scene.pick(
          movement.endPosition,
        );
        // console.log(pickedFeature)
        if (!Cesium.defined(pickedFeature)) {
          document.getElementById('app').style.cursor = 'default';
          if (showOverLay) setShowOverLay(false);
        } else {
          document.getElementById('app').style.cursor = 'pointer';

          if (movingPolylinePositions) {
            const newPositions = [
              movingPolylinePositions[0],
              cartesianEndposition,
            ];
            setmovingPolylinePositions(newPositions);
          }
          if (closingPolylinePositions) {
            const newPositions = [
              closingPolylinePositions[0],
              cartesianEndposition,
            ];
            setclosingPolylinePositions(newPositions);
          }

          setOverLayPosition({
            bottom:
              viewerRef.current.cesiumElement.canvas.clientHeight -
              movement.endPosition.y,
            left: movement.endPosition.x,
            lon: degrees.lon,
            lat: degrees.lat,
            height: degrees.height,
          });
          if (pickedFeature.node && pickedFeature.node.name) {
            const hoveredElement = props.bridgeElements.find(
              el => el.object_id == pickedFeature.node.name,
            );
            if (pickedFeature.node.name !== overLayName)
              setOverLayName(
                hoveredElement ? hoveredElement.name : pickedFeature.node.name,
              );
          } else setOverLayName('No element');
          if (!showOverLay) setShowOverLay(true);
        }
      }
    }
  };

  const handleViewerMouseDown = (m, t) => {

    if (t && t.node && t.node.name == 'LON') {
      viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableInputs = false;
      setCalibrationMode('lon');
      // console.log(m)
    }
  };
  const handleViewerMouseUp = (m, t) => {
    // console.log('handleViewerMouseUp',t)
    // if (t && t.node.name == 'X') {
    viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableInputs = true
    // }
    setCalibrationMode();
  };

  const addCartasianToPointsCollection = (
    cartesian,
    pointCollection,
    color,
  ) => {
    return pointCollection.add({
      position: new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z),
      color,
    });
  };

  const addLineEntity = positions => viewerRef.current.cesiumElement.entities.add({
      polyline: {
        positions: positions,
        followSurface: false,
        width: 3,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.ORANGE,
          outlineWidth: 2,
          outlineColor: Cesium.Color.BLACK,
        }),
        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.RED,
          outlineWidth: 2,
          outlineColor: Cesium.Color.BLACK,
        }),
      },
    })
  const addPolygoneEntity = (polygonePoints, title) => {
    const degrees3d = createDegrees3dArray(polygonePoints);
    const cyanPolygon = viewer.entities.add({
      name: title,
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(degrees3d),
        perPositionHeight: true,
        material: Cesium.Color.CYAN.withAlpha(0.5),

        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });
    return cyanPolygon;
  };
  const getCartesianPositionsFromTwoCartographicPoints = (
    cartographic1,
    cartographic2,
  ) => {
    const positions = {
      distanceLinePositions: [
        new Cesium.Cartesian3.fromRadians(
          cartographic1.longitude,
          cartographic1.latitude,
          cartographic1.height,
        ),
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic2.height,
        ),
      ],
      horizontalLinePositions: [
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic2.height,
        ),
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic1.height,
        ),
      ],
      verticalLinePositions: [
        new Cesium.Cartesian3.fromRadians(
          cartographic1.longitude,
          cartographic1.latitude,
          cartographic1.height,
        ),
        new Cesium.Cartesian3.fromRadians(
          cartographic2.longitude,
          cartographic2.latitude,
          cartographic1.height,
        ),
      ],
    };
    return positions;
  };
  const getCartographicDistanceFromTwoCartasians = (
    cartesian1,
    cartesian2,
  ) => {};
  const drawMeasureLine = (scene, viewer, pickedFeature, cartesian) => {
    console.log('cartesian', cartesian);
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      if (scene.pickPositionSupported && Cesium.defined(pickedFeature)) {
        if (Cesium.defined(cartesian)) {
          if (pointsCollection.length === 2) {
            pointsCollection.removeAll();
          }
          // add first point
          if (pointsCollection.length === 0) {
            const point1 = addCartasianToPointsCollection(
              cartesian,
              pointsCollection,
              LINEPOINTCOLOR,
            );
            // console.log(point1)
            setPointsPrimitives([point1]);
          } // add second point and lines
          else if (pointsCollection.length === 1) {
            const point2 = addCartasianToPointsCollection(
              cartesian,
              pointsCollection,
              LINEPOINTCOLOR,
            );
            console.log('point2.position', point2.position);
            const point1GeoPosition = Cesium.Cartographic.fromCartesian(
              pointsPrimitives[0].position,
            );
            const point2GeoPosition = Cesium.Cartographic.fromCartesian(
              point2.position,
            );
            const point3GeoPosition = Cesium.Cartographic.fromCartesian(
              new Cesium.Cartesian3(
              point2.position.x,
              point2.position.y,
              pointsPrimitives[0].position.z,
            ),
            );
            const positions = getCartesianPositionsFromTwoCartographicPoints(
              point1GeoPosition,
              point2GeoPosition,
            );
            // const distanceLine = addLineEntity(positions.distanceLinePositions)
            const distanceLine = addLineEntity([
              pointsPrimitives[0].position,
              point2.position,
            ]);
            // const verticalLine = addLineEntity(positions.horizontalLinePositions)
            // const horizontalLine = addLineEntity(positions.verticalLinePositions)
            console.log('point1GeoPosition', point1GeoPosition);
            let labelZ;
            if (point2GeoPosition.height >= point1GeoPosition.height) {
              labelZ =
                point1GeoPosition.height +
                (point2GeoPosition.height - point1GeoPosition.height) / 2.0;
            } else {
              labelZ =
                point2GeoPosition.height +
                (point1GeoPosition.height - point2GeoPosition.height) / 2.0;
            }
            // console.log(point1GeoPosition);
            addDistanceLabel(
              pointsPrimitives[0],
              point2,
              labelZ,
              point1GeoPosition,
              point2GeoPosition,
            );
          }
        }
      }
    }
  };

  const drawMeasurePolygone = (pickedFeature, cartesian) => {
    console.log(pickedFeature)
    console.log(cartesian)
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      if (scene.pickPositionSupported && Cesium.defined(pickedFeature)) {
        // console.log(cartesian);
        if (Cesium.defined(cartesian)) {
          if (pointsCollection.length === 0) {
            const point1 = addCartasianToPointsCollection(
              cartesian,
              pointsCollection,
              LINEPOINTCOLOR,
            );

            setPointsPrimitives([point1]);
          } else {
            const point = addCartasianToPointsCollection(
              cartesian,
              pointsCollection,
              LINEPOINTCOLOR,
            );
            console.log(point);
            console.log(pointsPrimitives);
            const newPointsPrimitives = [...pointsPrimitives, point];

            setPointsPrimitives([...pointsPrimitives, point]);

            console.log(pointsPrimitives);
            const firstPoint = pointsPrimitives[0];
            const firstPointGeoPosition = Cesium.Cartographic.fromCartesian(
              firstPoint.position,
            );
            const lastPoint = pointsPrimitives[pointsPrimitives.length - 1];
            const lastPointGeoPosition = Cesium.Cartographic.fromCartesian(
              lastPoint.position,
            );
            const newPointGeoPosition = Cesium.Cartographic.fromCartesian(
              point.position,
            );
            const heightGeoPosition = Cesium.Cartographic.fromCartesian(
              new Cesium.Cartesian3(
                point.position.x,
                point.position.y,
                lastPoint.position.z,
              ),
            );
            console.log(lastPointGeoPosition, newPointGeoPosition);
            const positions = getCartesianPositionsFromTwoCartographicPoints(
              lastPointGeoPosition,
              newPointGeoPosition,
            );

            const closingLinePositions = [
              new Cesium.Cartesian3.fromRadians(
                lastPointGeoPosition.longitude,
                lastPointGeoPosition.latitude,
                lastPointGeoPosition.height,
              ),
              new Cesium.Cartesian3.fromRadians(
                firstPointGeoPosition.longitude,
                firstPointGeoPosition.latitude,
                firstPointGeoPosition.height,
              ),
            ];
            const newLine = addLineEntity(positions.distanceLinePositions);
            console.log(newLine);
            let labelZ;
            if (newPointGeoPosition.height >= lastPointGeoPosition.height) {
              labelZ =
                lastPointGeoPosition.height +
                (newPointGeoPosition.height - lastPointGeoPosition.height) /
                  2.0;
            } else {
              labelZ =
                newPointGeoPosition.height +
                (lastPointGeoPosition.height - newPointGeoPosition.height) /
                  2.0;
            }

            if (newPointsPrimitives.length > 2) {
              setclosingPolylinePositions([
                firstPoint.position,
                point.position,
              ]);
              if (labels.length == polygones.length) {
                createLabel(newPointsPrimitives);
              } else {
                updateLabel(newPointsPrimitives);
              }
            }
            // if (props.mode == 'Measure polyline')
            addDistanceLabel(
              lastPoint,
              point,
              labelZ,
              lastPointGeoPosition,
              newPointGeoPosition,
            );
          }
        }
      }
    }
  };

  const getAvg = nums => {
    // console.log(nums)
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
      total += nums[i];
    }

    return total / nums.length;
  };

  const getCenterCartesian = pointsPrimitives => {
    const positionsX = [];
    const positionsY = [];
    const positionsZ = [];
    let avgX; let avgY; let avgZ;
    pointsPrimitives.forEach(point => {
      positionsX.push(point.position.x);
      positionsY.push(point.position.y);
      positionsZ.push(point.position.z);
    });
    const centerCartesian = {
      x: getAvg(positionsX),
      y: getAvg(positionsY),
      z: getAvg(positionsZ),
    };

    return centerCartesian;
  };
  const getPolylineLength = pointsPrimitives => {
    let length = 0;
    for (let index = 0; index < pointsPrimitives.length; index++) {
      if (index !== 0) {
        const point1 = pointsPrimitives[index - 1];
        const point2 = pointsPrimitives[index];
        point1.cartographic = ellipsoid.cartesianToCartographic(
          point1.position,
        );
        point2.cartographic = ellipsoid.cartesianToCartographic(
          point2.position,
        );
        const point1GeoPosition = Cesium.Cartographic.fromCartesian(
          point1.position,
        );
        const point2GeoPosition = Cesium.Cartographic.fromCartesian(
          point2.position,
        );
        console.log(point1, point2);
        const distance = getDistance(
          point1,
          point2,
          point1GeoPosition,
          point2GeoPosition,
        );
        console.log(distance, typeof distance);
        length += +distance;
      }
    }

    return length.toFixed(2);
  };

  const updateLabel = pointsPrimitives => {
    const allLabels = [...labels];
    const currentLabel = allLabels[labels.length - 1];
    const centerCartesian = getCenterCartesian(pointsPrimitives);
    currentLabel.position = centerCartesian;
    console.log(currentLabel);
    let text;
    switch (props.mode) {
      case 'Measure polygone':
        text = `Area: `;
        break;
      case 'Measure polyline':
        text = `Length: ${getPolylineLength(pointsPrimitives)}`;
        break;

      default:
        break;
    }
    currentLabel.text = text;
    setLabels(allLabels);

    // console.log(centerCartesian)
    // label.text = `Area: : `;
    // // 'Distance: ' +
    // // getDistance(point1, point2, point1GeoPosition, point2GeoPosition);
    // const centerLabel = viewer.entities.add({
    //   position: centerCartesian,
    //   label: label,
    // });
  };

  const createLabel = pointsPrimitives => {
    const centerCartesian = getCenterCartesian(pointsPrimitives);
    let text = '';
    switch (props.mode) {
      case 'Measure polygone':
        text = `Area: `;
        break;
      case 'Measure polyline':
        text = `Length: ${getPolylineLength(pointsPrimitives)}`;
        break;

      default:
        break;
    }

    setLabels([...labels, {text,  position: centerCartesian}])
    

    // console.log(centerCartesian)
    // label.text = `Area: : `;
    // // 'Distance: ' +
    // // getDistance(point1, point2, point1GeoPosition, point2GeoPosition);
    // const centerLabel = viewer.entities.add({
    //   position: centerCartesian,
    //   label: label,
    // });
  };

  function addDistanceLabel(
    point1,
    point2,
    height,
    point1GeoPosition,
    point2GeoPosition,
  ) {
    const viewer = viewerRef.current.cesiumElement;
    const {ellipsoid} = viewer.scene.globe
    point1.cartographic = ellipsoid.cartesianToCartographic(point1.position);
    point2.cartographic = ellipsoid.cartesianToCartographic(point2.position);
    point1.longitude = parseFloat(Cesium.Math.toDegrees(point1.position.x));
    point1.latitude = parseFloat(Cesium.Math.toDegrees(point1.position.y));
    point2.longitude = parseFloat(Cesium.Math.toDegrees(point2.position.x));
    point2.latitude = parseFloat(Cesium.Math.toDegrees(point2.position.y));

    // label.text = 'Horizontal: ' + getHorizontalDistanceString(point1, point2);
    // horizontalLabel = viewer.entities.add({
    //   position: getMidpoint(point1, point2, point1GeoPosition.height),
    //   label: label,
    // });
    // console.log(Number.POSITIVE_INFINITY)
    label.disableDepthTestDistance = Number.POSITIVE_INFINITY;
    if (props.mode == 'Measure line') {
      label.text = `Distance: ${getDistance(
        point1,
        point2,
        point1GeoPosition,
        point2GeoPosition,
      )}
         Height difference: ${getVerticalDistanceString(
           point1GeoPosition,
           point2GeoPosition,
         )}`;
    } else {
      label.text = getDistance(
        point1,
        point2,
        point1GeoPosition,
        point2GeoPosition,
      );
    }

    distanceLabel = viewer.entities.add({
      position: getMidpoint(point1, point2, height),
      label,
    });
    // console.log(label)
    // label.text =
    //   'Vertical: ' +
    //   getVerticalDistanceString(point1GeoPosition, point2GeoPosition);
    // verticalLabel = viewer.entities.add({
    //   position: getMidpoint(point2, point2, height),
    //   label: label,
    // });
  }

  function getHorizontalDistanceString(point1, point2) {
    geodesic.setEndPoints(point1.cartographic, point2.cartographic);
    const meters = geodesic.surfaceDistance.toFixed(2);
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)  } км`;
    }
    return `${meters  } м`;
  }

  function getVerticalDistanceString(point1GeoPosition, point2GeoPosition) {
    const heights = [point1GeoPosition.height, point2GeoPosition.height];
    const meters =
      Math.max.apply(Math, heights) - Math.min.apply(Math, heights);
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)  } км`;
    }
    return `${meters.toFixed(2)  } м`;
  }

  function getDistance(point1, point2, point1GeoPosition, point2GeoPosition) {
    const geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1.cartographic, point2.cartographic);
    const horizontalMeters = geodesic.surfaceDistance.toFixed(2);
    const heights = [point1GeoPosition.height, point2GeoPosition.height];
    const verticalMeters =
      Math.max.apply(Math, heights) - Math.min.apply(Math, heights);
    const meters = Math.pow(
      Math.pow(horizontalMeters, 2) + Math.pow(verticalMeters, 2),
      0.5,
    );

    if (meters >= 1000) {
      // return (meters / 1000).toFixed(1) + ' км';
      return (meters / 1000).toFixed(2);
    }
    // return meters.toFixed(2) + ' м';
    return meters.toFixed(2);
  }

  function getMidpoint(point1, point2, height) {
    const geodesic = new Cesium.EllipsoidGeodesic();
    const scratch = new Cesium.Cartographic();
    geodesic.setEndPoints(point1.cartographic, point2.cartographic);
    const midpointCartographic = geodesic.interpolateUsingFraction(
      0.5,
      scratch,
    );
    return Cesium.Cartesian3.fromRadians(
      midpointCartographic.longitude,
      midpointCartographic.latitude,
      height,
    );
  }

  const getCameraDistanceFromBoundingSphere = boundingSphere => viewerRef.current.cesiumElement.scene.camera.distanceToBoundingSphere(
      boundingSphere,
    )

  const getCurrentViewData = () => {
    const cam = viewerRef.current.cesiumElement.camera;
    const {heading} = cam;
    const {pitch} = cam;
    const {roll} = cam;
    const {position} = cam;
    const scratchRectangle = new Cesium.Rectangle();
    // console.log(camera)
    // console.log(Cesium.Math.fromRadians(heading))
    // console.log(Cesium.Math.fromRadians(pitch))
    const computeViewRectangle = cam.computeViewRectangle(
      ellipsoid,
      scratchRectangle,
    );
    // console.log(computeViewRectangle)
    return { heading, pitch, roll, position };
    // return computeViewRectangle
  };

  const saveView = () => {
    // const cam = viewerRef.current.cesiumElement.camera
    // const cameraPosition = cam.position
    // const heading = cam.heading
    // const pitch = cam.pitch
    // const roll = cam.roll
    // const view = {
    //   // boundingSphere: tileset.boundingSphere,
    //   cameraPosition : {...cameraPosition},
    //   heading,
    //   pitch,
    //   roll
    // }
    const view = getCurrentViewData();
    setResetCameraView(view);
    props.onUpdateBridgeDefaultView(view, props.bridge.bid);
  };

  const setViewToElement = objecId => {
    console.log(objecId);
  };

  const makeProperty = (entity, color) => {
    const colorProperty = new Cesium.CallbackProperty(function(time, result) {
      if (pickedEntities.contains(entity)) {
        return pickColor.clone(result);
      }
      return color.clone(result);
    }, false);

    entity.polygon.material = new Cesium.ColorMaterialProperty(colorProperty);
  };

  const createDegrees3dArray = points => {
    const degrees = [];
    points.map(point => {
      // console.log(point)
      const pointDegrees = convertCartesianToDegrees(
        point,
        Cesium.Ellipsoid.WGS84,
      );
      degrees.push(pointDegrees.lon);
      degrees.push(pointDegrees.lat);
      degrees.push(pointDegrees.height);
    });
    return degrees;
    // setDegrees3dArray(degrees)
  };
  const createDegrees2dArray = points => {
    const degrees = [];
    return points.map(point => {
      const pointDegrees = convertCartesianToDegrees(
        point,
        Cesium.Ellipsoid.WGS84,
      );
      degrees.push(pointDegrees.lon);
      degrees.push(pointDegrees.lat);
      setDegrees2dArray(degrees);
    });
  };

  const exitTaskState = () => {
    props.onSetSharedState('selectedSubTask', null)
    props.onSetSharedState('selectedTask', null)
  }
  // console.log(props.models)
  const models = useMemo(
    () =>
      props.models.map(model => {
  
    if (model.type === 'cad') {
      // console.log('running models', calibrationState)
      // console.log(calibrationState)
      if (calibrationState && calibrationState[model.name]) { 
        // const center = calibrationState[model.name].center;
        // const alpha = calibrationState[model.name].alpha;

        return (
          <ModelComponent
            key={model.id}
            model={model}
            // mode={props.mode}
            // bridge={props.bridge}
            onModelLoad={nodes => {handleModelLoad(nodes, model)}}
            calibrationData={calibrationState[model.name]}
            viewerRef={viewerRef}
            silhouetteColor={getColor(silhouetteColor, silhouetteAlpha)}
            silhouetteSize={silhouetteSize}
            color={color}
            // selectedObjectIds={props.selectedObjectIds}
            handleModelClick={(m, t, modelName) =>
              handleModelClick(m, t, modelName)
            }
            handleModelMouseMove={(m, t, modelName) =>
              handleModelMouseMove(m, t, modelName)
            }
            handleModelMouseDown={(m, t, modelName) =>
              setSelectedItem(modelName)
            }
          />
        );
      } 
        return null;
      
    }
  }), [props.models, calibrationState]) 

  const tiles = useMemo(
    () =>
      props.models.map(model => {
        // console.log('running tiles')
        if (model.type === 'model') {
          if (calibrationState && calibrationState[model.name]) {
            return (
              <TileSet
                key={model.id}
                item={model}
                viewerRef={viewerRef}
                onReady={tileSet => handleTileSetReady(tileSet, model.name)}
                calibrationData={calibrationState[model.name]}
                tileType={model.type}
                colorBlendAmount={1}
                colorBlendMode={Cesium.Cesium3DTileColorBlendMode.MIX}
                handleModelMouseDown={(m, t, modelName) =>
                  setSelectedItem(modelName)
                }
                addPoint={point => console.log(point)}
              />
            );
          }
        } else {
          return null;
        }
      }),
    [props.models, calibrationState],
  );

  const toolbar = useMemo(
    () => (
      <ResiumToolBar
        toolBarOpen={toolBarOpen}
        bridge={props.bridge}
        models={props.models}
        calibrationData={calibrationState}
        mode={props.mode}
        multiplier={multiplier}
        step={step}
        rotationMultiplier={rotationMultiplier}
        // rotationStep={rotationStep}
        selectedItem={selectedItem}
        selectedColor={color}
        position="top"
        onAction={(event, actionGroup, actionName, modelName, modelId) =>
          handleActionFromResiumToolBar(
            event,
            actionGroup,
            actionName,
            modelName,
            modelId,
          )
        }
        save={actionGroup => save(actionGroup)}
        reset={actionGroup => reset(actionGroup)}
        saveView={() => saveView()}
        selectedSubTask={props.selectedSubTask && props.selectedSubTask.name}
      />
    ),
    [props.models, calibrationState, props.mode, toolBarOpen, 
      resetCameraView, props.selectedSubTask, tileSetBoundingSphere, selectedItem],
  );

  const pointsHtml = useMemo(
    () =>
      points.map((point, index) => {
        console.log('point', point);
        const ellipsoid = Cesium.Ellipsoid.WGS84;
        const position = convertCartesianToDegrees(point, ellipsoid);
        return (
          <Entity
            key={index}
            name={`Entity ${index + 1}`}
            position={point}
            selected={false}
          >
            <PointGraphics pixelSize={10} color={Color.GREEN} />

            <EntityDescription>
              {/* <h1>Hello world</h1> */}
              <p>X: {point.x}</p>
              <p>Y: {point.y}</p>
              <p>Z: {point.z}</p>
              <p>Lat: {position.lon}</p>
              <p>Lon: {position.lat}</p>
              <p>Height: {position.height}</p>
            </EntityDescription>
          </Entity>
        );
      }),
    [points],
  );

  return (
    <Viewer
      full
      ref={viewerRef}
      timeline={false}
      baseLayerPicker
      onSelectedEntityChange={handleSelectedEntityChanged}
      selectionIndicator={false}
      animation={false}
      fullscreenButton={false}
      onClick={(m, t) => handleViewerClick(m, t)}
      onRightClick={(m, t) => handleViewerRightClick(m, t)}
      onMouseMove={(m, t) => handleViewerMouseMove(m, t)}
      onMouseDown={(m, t) => handleViewerMouseDown(m, t)}
      onMouseUp={(m, t) => handleViewerMouseUp(m, t)}
    >
      {/* <ScreenSpaceCameraController enableTranslate={true} /> */}
      {/* {useMemo(() => <ImageryLayer
        show={true}
        minimumTerrainLevel={1}
        maximumTerrainLevel={1000}
        imageryProvider={
          // new BingMapsImageryProvider()
          new ArcGisMapServerImageryProvider({
            url:
              '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
          })
        } 
      />, [])} */}
      {/* {viewerRef.current && <Transforms viewer={viewerRef.current.cesiumElement}/>} */}
      {/* <ImageryLayer imageryProvider={provider3} /> */}
      {calibrationState && (
        <>
          {viewerRef.current && calibrationGlobePosition && (
            <CalibrationGlobe
              position={calibrationGlobePosition}
              viewer={viewerRef}
              multiplier={multiplier}
              rotationMultiplier={rotationMultiplier}
              // calibrationData={calibrationState}
              onAction={(event, actionGroup, actionName, modelName) =>
                handleActionFromResiumToolBar(
                  event,
                  actionGroup,
                  actionName,
                  modelName,
                )
              }
            />
          )}
          {props.models.length && models}
          {props.models.length && tiles}
          {props.models.length && selectedItem && toolbar}

          <div className="cesiumTitle topMiddle d-flex">
            {(props.selectedTask || props.selectedSubTask) && (
            <span>
              {/* <MDBBtn
                className="bgSecondary"
                size="sm"
                onClick={() => exitTaskState()}
              >
                  <MDBIcon icon="sign-out-alt" className="ml-1" size="lg" rotate="180"/>
              </MDBBtn> */}
              <IconButtonToolTip
                className="mr-2"
                size="lg"
                iconName="sign-out-alt"
                toolTipType="info"
                toolTipPosition="right"
                // flip="vertical"
                rotate="180"
                // toolTipEffect="float"
                toolTipText="Exit task"
                onClickFunction={() => exitTaskState()}
              />

            </span>

            )}
            <div>
              <span className="bold">
                {props.selectedTask && props.selectedTask.name}
              </span>

              <span className="">
                {props.selectedSubTask && ` - ${props.selectedSubTask.name}`}
              </span>

            </div>
          </div>
          {/* <PointPrimitiveCollection modelMatrix={Transforms.eastNorthUpToFixedFrame(center)}> */}

          {points.length && pointsHtml}
          {/* {polygones.length && polygones.map((polygonePoints, index) => {
          // const degreesArray = createDegrees3dArray(polygonePoints);
          // const polygone = viewer.entities.add({
          //   name: 'Cyan vertical polygon with per-position heights and outline',
          //   polygon: {
          //     hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(degreesArray),
          //     perPositionHeight: true,
          //     material: Cesium.Color.CYAN.withAlpha(0.5),
              
          //     outline: true,
          //     outlineColor: Cesium.Color.BLACK,
          //   },
          // });
          // console.log(polygone)
          return  <Polygone
            // ref={polygoneRef}
            key={index}
            viewer={viewerRef.current.cesiumElement}
            type="3D"
            points={polygonePoints}
          />
        })} */}
          {movingPolylinePositions &&
            viewerRef.current &&
            (props.mode === 'Measure line' ||
              props.mode === 'Measure polygone' ||
              props.mode === 'Measure polyline') && (
              <Polyline
                flyTo={false}
                center={Cesium.Cartesian3.fromDegrees(34.91307, 32.41295)}
                viewer={viewerRef.current.cesiumElement}
                color={LINECOLOR}
                positions={movingPolylinePositions}
              />
            )}

          {closingPolylinePositions &&
            props.mode === 'Measure polygone' &&
            viewerRef.current && (
              <Polyline
                flyTo={false}
                center={Cesium.Cartesian3.fromDegrees(34.91307, 32.41295)}
                viewer={viewerRef.current.cesiumElement}
                color={CLOSINGLINECOLOR}
                positions={closingPolylinePositions}
              />
            )}
          {scene && (
            <LabelCollection
              modelMatrix={scene.primitives._primitives[1].modelMatrix}
            >
              {labels.map((label, index) => (
                <Label
                  key={index}
                  fillColor={Color.ORANGE}
                  position={label.position}
                  text={label.text}
                  font="12px sans-serif"
                  showBackground
                  disableDepthTestDistance={Number.POSITIVE_INFINITY}
                  // distanceDisplayCondition={0.5}
                  horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
                  verticalOrigin={Cesium.VerticalOrigin.CENTER}
                  pixelOffset={new Cesium.Cartesian2(0, 0)}
                  eyeOffset={new Cesium.Cartesian3(0, 0, -0.5)}
                  fillColor={Cesium.Color.WHITE}
                />
              ))}
            </LabelCollection>
          )}

          {/* <Camera flyToBoundingSphere={props.boundingSphere} /> */}
        </>
      )}
      {useMemo(
        () => (
          <NameOverLay
            name={overLayName}
            show={showOverLay}
            position={overLayPosition}
          />
        ),
        [overLayName, showOverLay, overLayPosition],
      )}
      {useMemo(
        () => (
          <RightClickMenu
            actions={rightClickMenuActions}
            name={overLayName}
            element={overLayElement}
            handleAction={action => handleRightMenuClick(action)}
            show={showRightClickMenu}
            position={overLayPosition}
            onLeave={() => setShowRightClickMenu(false)}
          />
        ),
        [overLayName, overLayElement, showRightClickMenu, overLayPosition],
      )}
      {useMemo(
        () => mousePosition && <MouseLocation position={mousePosition} />,
        [mousePosition],
      )} 
      {useMemo(
        () => props.notification && <CesiumNotifications notification={props.notification} loading={props.loading}/>,
        [props.notification, props.loading],
      )} 
    </Viewer>
  );
};

// const mapStateToProps = state => {
//   // console.log('mapStateToProps', state)
//   return {
//     currentUser: state.global.currentUser,
//     mode: getMode(state),
//     selectedObjectIds: getSelectedObjectIds(state),
//     elementsGroups: getElementsGroups(state),
//     elementsTypes: getElementsTypes(state),
//     bridgeSpans: getBridgeSpans(state),
//     bridgeElements: getBridgeElements(state),

//     // models: getBridgeModels(state),
//     // boundingSphere: state.resiumReducer.boundingSphere,
//     // showRightClickMenu: state.resiumReducer.showRightClickMenu,
//   };
// };

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  bridge: makeSelectBridge(),
  models: makeSelectBridgeModels(),
  bridgeSpans: makeSelectBridgeSpans(),
  bridgeElements: makeSelectBridgeElements(),
  selectedObjectIds: makeSelectSelectedObjectIds(),
  selectedElements: makeSelectSelectedElements(),
  elementsGroups: makeSelectElementsGroups(),
  structureTypes: makeSelectStructureTypes(),
  elementsTypes: makeSelectElementsTypes(),
  bridgeTypes: makeSelectBridgeTypes(),
  selectedTask: makeSelectSelectedTask(),
  survey: makeSelectDisplayedSurvey(),
  selectedSubTask: makeSelectSelectedSubTask(),
  viewData: makeSelectViewData(),
  mode: makeSelectMode(),
  boundingSphere: makeSelectBoundingSphere(),
  zoomElement: selectors.makeSelectZoomElement(),
  destroy: selectors.makeSelectDestroy(),
  notification: selectors.makeSelectNotification(),
  loading: selectors.makeSelectLoading(),
  // elementsGroups: getElementsGroups(state),
  // elementsTypes: getElementsTypes(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateMode: mode => dispatch(actions.updateResiumMode(mode)),
    onNodeSelected: (nodeName, selectMultiple) =>
      dispatch(actions.elementSelected(nodeName, selectMultiple)),
    onFocusElement: nodeName => dispatch(setFocusedElement(nodeName)),
    onRightMenuOptionClick: (action, data) =>
      dispatch(actions.onRightMenuOptionClick(action, data)),
    editElement: element => dispatch(editElement(element)),
    updateElements: element => dispatch(updateElements(element)),
    onModelLoaded: (nodes, model) =>
      dispatch(actions.modelLoaded(nodes, model)),
    save: model => dispatch(updateModel(model)),
    onUpdateBridgeDefaultView: (view, bid) =>
      dispatch(updateBridgeDefaultView(view, bid)),
    onElementsSelected: (ids, selectSingle) =>
      dispatch(actions.elementsSelected(ids, selectSingle)),
    onShowInView: (view, componentName, mode, id) =>
      dispatch(showInView(view, componentName, mode, id)),
    onSetSelectedTab: selectedTab => dispatch(setSelectedTab(selectedTab)),
    onCreateMessage: messageObject => dispatch(createMessage(messageObject)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onDeleteModel: (modelId, bucketName, prefix) =>
      dispatch(deleteModel(modelId, bucketName, prefix)),
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onSetSharedState: (key, value) => dispatch(setSharedState(key, value)),
    onSetCesiumNotification: (notification) => dispatch(actions.setCesiumNotification(notification)),

    // save: () => console.log('save')
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  hot,
)(Resium);
// export default hot(memo(resium))
