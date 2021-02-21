import React, { useRef, useEffect, memo, useState, useMemo } from "react";
import { Model } from "resium";
import { getColor, degreesToRadians } from './cesiumUtils'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';  
import * as selectors from './selectors'
import {
  makeSelectBridge,
  makeSelectBridgeElements,
  makeSelectSelectedObjectIds,
  makeSelectMode,
} from '../BridgeModul/selectors';

const ModelComponent = (props) => {
  // console.log('ModelComponent RENDER - ', props);
  // console.log('selectedObjectIds', props.selectedObjectIds)


  const [selected, setSelected] = useState({
    feature: undefined,
    originalColor: new Cesium.Color()
  });
  const [silhouetteBlue, setSilhouetteBlue] = useState();
  const [silhouetteGreen, setSilhouetteGreen] = useState();
  const [modelResource, setModelResource] = useState()
  const [modelCenter, setModelCenter] = useState()
  
  const show = props.calibrationData.show
  const alpha = props.calibrationData.alpha
  const modelRef = useRef(null);
  const cloneModelRef = useRef(null);

  
  useEffect(() => {
    // console.log('RUNING USEEFFECT')
    // console.log('viewer', viewer.scene.primitives)
    // viewer.scene.primitives.add(
    //   new Cesium.DebugModelMatrixPrimitive({
    //     modelMatrix: modelMatrix,
    //     length: 50.0,
    //     width: 10.0,
    //   })
    // );
    if (props.model.ion_id) {
      let promise = Cesium.IonResource.fromAssetId(props.model.ion_id)
        .then(function (resource) {
          console.log(resource)
          setModelResource(resource)
  
        })

    } else {
      setModelResource(props.model.url)
      
    }
    return () => {
      console.log('cleanup')
      modelRef.current.cesiumElement.destroy()
      cloneModelRef.current.cesiumElement.destroy()
    };
  }, [])
  // useEffect(() => {
  //   console.log(modelRef)
  //   if (modelRef.current) {
  //     // viewerRef.current.cesiumElement.entities.removeAll();
  //     modelRef.current.cesiumElement.destroy()
  //     cloneModelRef.current.cesiumElement.destroy()
  //   }

  //   return () => {
  //   } 
  // }, [props.destroy]);
  useEffect(() => {

    if (modelRef.current && cloneModelRef.current) {
      let modelNodes = modelRef.current.cesiumElement._runtime.nodes
      let cloneNodes = cloneModelRef.current.cesiumElement._runtime.nodes;
      switch (props.mode) {
        case 'Show only selected':
          
          setAllNodes(false, cloneNodes)
          handleSelectedNodes()
          break;
        // case 'Show only selected':
        //   console.log('alskdjalksdjlaksjdlkajsldkj')
        //   handleSelectedNodes()
        //   break;
      
        default:
          setAllNodes(true, modelNodes);
      }

    }

  }, [props.mode])
  // console.log(props.calibrationData)
  useEffect(() => {
    console.log('modelRef', modelRef)
    if (modelRef && modelRef.current) {


      // const newModelCenter = modelRef.current.cesiumElement.boundingSphere.center
      // console.log('newModelCenter', newModelCenter)

    }
    return () => {
      
    }
  }, [modelRef])

  // useEffect(() => {
  //   console.log(props.zoomElement)
    
  //   if (props.zoomElement && props.viewerRef.current) {
  //     console.log('enableTranslate', props.viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableTranslate)
  //     console.log('enableTranslate', props.viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableTranslate)

  //     const element = props.bridgeElements.find(
  //       el => el.object_id == props.zoomElement,
  //     );
  //     let viewData, target
  //     if (element && element.default_view_data || element.default_view_data !== 'null') {
  //       viewData = JSON.parse(element.default_view_data);
  //       console.log(viewData);
  //       target = viewData.position;
  //       props.viewerRef.current.cesiumElement.camera.setView({
  //         destination : target,
  //         orientation: {
  //             heading : viewData.heading, // east, default value is 0.0 (north)
  //             pitch : viewData.pitch,    // default value (looking down)
  //             roll : 1                             // default value
  //         }
  //       });
  //       // props.viewerRef.current.cesiumElement.scene.camera.lookAt(
  //       //   target,
  //       //   new Cesium.HeadingPitchRange(viewData.heading, viewData.pitch, viewData.roll),
  //       // );

  //     } else {
  //       console.log(modelRef)
  //       const node = modelRef.current.cesiumElement._runtime.nodesByName[props.zoomElement]
  //       const viewData = getCurrentViewData();
  //       console.log(node)
  //       target = node.commands[0].boundingSphere.center;
  //       console.log(target)

  //       // target && props.viewerRef.current.cesiumElement.scene.camera.lookAt(
  //       //   target,
  //       //   new Cesium.HeadingPitchRange(viewData.heading, viewData.pitch, 1),
  //       // );

  //       // camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  //     }
  //   }
  
  //   return () => {
      
  //   }
  // }, [props.zoomElement])
  // const modelCenter = props.calibrationData.calibrationData ?
  //    Cartesian3.fromDegrees(props.calibrationData.calibrationData.lon, props.calibrationData.calibrationData.lat, props.calibrationData.calibrationData.height) :
  //    Cartesian3.fromDegrees(props.bridge.lon, props.bridge.lat, 0)
  const viewer = props.viewerRef.current.cesiumElement;
  const ellipsoid = props.viewerRef.current.cesiumElement.scene.globe.ellipsoid;
  const getCurrentViewData = () => {
    console.log(viewer.scene.camera)
    const heading = viewer.scene.camera.heading;
    const pitch = viewer.scene.camera.pitch;
    const roll = viewer.scene.camera.roll;
    const position = viewer.scene.camera.position;
    const scratchRectangle = new Cesium.Rectangle();
    // console.log(camera)
    // console.log(Cesium.Math.fromRadians(heading))
    // console.log(Cesium.Math.fromRadians(pitch))
    // const computeViewRectangle = viewerRef.current.cesiumElement.scene.camera.computeViewRectangle(
    //   ellipsoid, scratchRectangle
    // );
    // console.log(computeViewRectangle)
    return { heading, pitch, roll, position };
    // return computeViewRectangle
  }; 

  const createModelMatrix = () => {
    console.log('createModelMatrix', modelRef)
    
    
    let modelMatrix
    let rotateMatrix
    let rotation4
    let rotatedModel
    if (props.calibrationData && props.calibrationData.calibrationData) {
      console.log('modelCenter', modelCenter)
      //  console.log('modelRef', modelRef.current && modelRef.current.cesiumElement.boundingSphere.center)
    
      const incomingCalibrationData = props.calibrationData.calibrationData;
      const position = Cesium.Cartesian3.fromDegrees(incomingCalibrationData.lon, incomingCalibrationData.lat, incomingCalibrationData.height)
      const converter = Cesium.Transforms.eastNorthUpToFixedFrame;
      // var heading = -Cesium.Math.PI_OVER_TWO;
      // var pitch = Cesium.Math.PI_OVER_FOUR;
      // var roll = 0.0;

      // const hpRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      const hpRoll = new Cesium.HeadingPitchRoll()
      const offSetCartesian = Cesium.Cartesian3.fromDegrees(incomingCalibrationData.lon, incomingCalibrationData.lat, incomingCalibrationData.height, ellipsoid);
      // modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(offSetCartesian);

      modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        position,
        hpRoll,
        ellipsoid,
        converter
      );
      

      // const heading = Cesium.Math.toRadians(incomingCalibrationData.heading);
      // const pitch = Cesium.Math.toRadians(incomingCalibrationData.pitch);
      // const roll = Cesium.Math.toRadians(incomingCalibrationData.roll);
      // const orientation = Cesium.Transforms.headingPitchRollQuaternion(offSetCartesian, {heading, pitch, roll});
      // console.log(orientation)
      // rotateMatrix = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(incomingCalibrationData['rotate-x']));
      // rotation4 = Cesium.Matrix4.fromRotationTranslation(rotateMatrix, Cesium.Cartesian3.ZERO);
      // rotatedModel = Cesium.Matrix4.multiply(modelMatrix, rotation4, modelMatrix);
      // rotateMatrix = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(incomingCalibrationData['rotate-y']));
      // rotation4 = Cesium.Matrix4.fromRotationTranslation(rotateMatrix, Cesium.Cartesian3.ZERO);
      // rotatedModel = Cesium.Matrix4.multiply(modelMatrix, rotation4, modelMatrix);
      // rotateMatrix = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(incomingCalibrationData['rotate-z']));
      // rotation4 = Cesium.Matrix4.fromRotationTranslation(rotateMatrix, Cesium.Cartesian3.ZERO);
      // rotatedModel = Cesium.Matrix4.multiply(modelMatrix, rotation4, modelMatrix);
      let hpr = new Cesium.Matrix3();

      // new Cesium.HeadingPitchRoll(heading, pitch, roll)

      // heading the rotation around the negative z-axis. The pitch is a rotation around the negative y-axis. Roll is a rotation around the positive x-axis

      let hprObj = new Cesium.HeadingPitchRoll(
        -Cesium.Math.toRadians(incomingCalibrationData['rotate-z']), 
        -Cesium.Math.toRadians(incomingCalibrationData['rotate-y']), 
        Cesium.Math.toRadians(incomingCalibrationData['rotate-x'])
        );

      //  Cesium.Matrix3.fromHeadingPitchRoll （headingPitchRoll，result）

      hpr = Cesium.Matrix3.fromHeadingPitchRoll(hprObj, hpr);

      //rotateMatrix = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(incomingCalibrationData['rotate-x']));

      rotatedModel = Cesium.Matrix4.multiplyByMatrix3(modelMatrix, hpr, modelMatrix);
    }
  return rotatedModel
  }
  const modelMatrix = useMemo(() => createModelMatrix(), props.calibrationData)


  const positionModel = () => {
    console.log(props.calibrationData)
    // console.log(lon, lat, alt, heading, pitch, roll)
    let point = Cesium.Cartographic.fromDegrees(lon, lat, alt / 3);
    let epoint = ellipsoid.cartographicToCartesian(point);

    heading = degreesToRadians((heading));
    pitch = degreesToRadians(pitch);
    roll = degreesToRadians(roll);

    let currentTranslation = new Cesium.Cartesian3();
    let currentRotation = new Cesium.Matrix3();

    let eastNorthUp = Cesium.Transforms.eastNorthUpToFixedFrame(epoint);
    let p = new Cesium.Cartesian3(lon, lat, alt);

    // Cesium.Matrix4.getRotation(eastNorthUp, currentRotation);
    Cesium.Matrix4.fromRotationTranslation(currentRotation, eastNorthUp)
    Cesium.Matrix4.getTranslation(eastNorthUp, currentTranslation);

    let headingQuaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, -heading);
    let pitchQuaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Y, -pitch);
    let rollQuaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_X, -roll);

    let headingPitchQuaternion = Cesium.Quaternion.multiply(headingQuaternion, pitchQuaternion, new Cesium.Quaternion());
    let finalQuaternion = new Cesium.Quaternion();
    Cesium.Quaternion.multiply(headingPitchQuaternion, rollQuaternion, finalQuaternion);

    let rM = new Cesium.Matrix3();
    Cesium.Matrix3.fromQuaternion(finalQuaternion, rM);

    Cesium.Matrix3.multiply(currentRotation, rM, currentRotation);

    modelMatrix = Cesium.Matrix4.fromRotationTranslation(
        currentRotation,
        currentTranslation,
        modelMatrix
    );
    console.log(modelMatrix)
    return modelMatrix
  };

  // const modelMatrix = useMemo(() => positionModel(), props.calibrationData)

  const findNodeById = (id, nodes) => {

    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      // console.log(node)
      if(node.publicNode.id == id) {
        // console.log('clicked node', node)
        if ( !node.publicNode.name ) {
          // console.log('parent node', node.parents[0])
          if (node.parents[0].publicNode.name) {
            // setEntitySubTitle(node.parents[0].publicNode.name)
            return node.parents[0]
          }
        } else {
          return node
          // setEntitySubTitle(node.publicNode.name)
        }
      }
    }

  }



  const handleModelClick = (m, t, modelName) => {

  }

  const setAllNodesShowExceptId = (nodeId, nodes, show) => {
    // console.log(nodeId)
    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      console.log(node)
      if (node.publicNode.id !== 0) {
        // console.log(node.publicNode.id == nodeId)
        node.publicNode.show = node.publicNode.name == nodeId ? show : !show
      }
    }
  }
  const setAllNodesExceptIds = (nodeIds, nodes, show) => {
    
    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      // console.log(node)
      if (node.publicNode.id !== 0) {
        node.publicNode.show = nodeIds.includes(node.publicNode.name) ? show : !show
      }
    }
  }

  const setAllNodes = (show, nodes) => {
    for (let index = 0; index < Object.keys(nodes).length; index++) {
      const node = nodes[Object.keys(nodes)[index]];
      if (node.publicNode.id !== 0) node.publicNode.show = show
    }
  }

  const handleSelectedNodes = () => {
    // console.log('handleSelectedNodes', props.selectedObjectIds)
    if (modelRef.current && cloneModelRef.current) {
      // console.log(cloneModelRef)
      let modelNodes = modelRef.current.cesiumElement._runtime.nodes
      let cloneNodes = cloneModelRef.current.cesiumElement._runtime.nodes;
      switch (props.mode) {
        case 'Show only selected':
          
          // setAllNodesShowExceptId(props.selectedObjectIds[0], modelNodes, true)
          setAllNodesExceptIds(props.selectedObjectIds, modelNodes, true)
          break;
        case 'Select elements':
          setAllNodesExceptIds(props.selectedObjectIds, cloneNodes, true)
          break;
      
        default:
          if (!props.selectedObjectIds.length) setAllNodes(false, cloneNodes)
          else setAllNodesExceptIds(props.selectedObjectIds, cloneNodes, true)
          break;
      }
    }
  }

  const handleSelectedIds = useMemo(() => handleSelectedNodes(), [props.selectedObjectIds])
  const handleModelMouseDown = (m, t) => {
    // console.log(m)
 
  }

  
  // console.log(modelResource)
  // console.log(modelMatrix)
  if (modelResource) {
    handleSelectedIds
    // console.log(modelMatrix)
    return (
      <>
        {/* CLONE */}
        <Model
          url={modelResource}
          ref={cloneModelRef}
          modelMatrix={modelMatrix}
          minimumPixelSize={128}
          maximumScale={20000}
          color={getColor(props.color, alpha)}
          // colorBlendMode="Highlight"
          colorBlendAmount={1}
          // onClick={(movement, target) => handleModelClick(movement, target, 'clone')}
          onMouseDown={(movement, target) =>
            props.handleModelMouseDown(movement, target, props.model.name)
          }
          // onMouseMove={(m, t) => console.log(m, t, props.model.name)}
          // silhouetteColor={props.silhouetteColor}
          // silhouetteColor={silhouetteColor ? getColor(silhouetteColor, silhouetteAlpha) : {}}
          // silhouetteSize={props.silhouetteSize}
          show={show}
          onReady={model => {
            console.log('MODEL READY', model);
            const nodesByName = model._runtime.nodesByName;
            const nodes = model._runtime.nodes;
            const modelBoundingSphereCenter = model.boundingSphere.center;
            const nodesData = Object.keys(nodes).map((key, index) => {
              // console.log(index)
              const node = nodes[index];
              // console.log(node)
              let nodeBoudingSphere;
              if (node.commands && node.commands[0]) {
                nodeBoudingSphere = node.commands[0].boundingSphere;
                // console.log('FOUND COMMAND', node)
              } else {
                // console.log('NOT FOUND COMMAND', node)
              }
              if (node.publicNode.id !== 0) node.publicNode.show = false;
              return {
                bid: props.bridge.bid,
                span_id: null,
                bridge_model_id: props.model.id,
                object_id: node.publicNode.name,
                boundingSphere: nodeBoudingSphere,
                name: node.publicNode.name,
              };
            });
            // console.log(nodesData)
            props.onModelLoad(nodesData);
            setModelCenter(modelBoundingSphereCenter);
            let lon2ndPosition = new Cesium.Cartesian3(
              modelBoundingSphereCenter.x,
              modelBoundingSphereCenter.y,
              modelBoundingSphereCenter.z + 10,
            )
           
            setLonPositions([modelBoundingSphereCenter, lon2ndPosition])
          }}
          // color={getColor('red', 1)}
        />
        <Model
          url={modelResource}
          ref={modelRef}
          modelMatrix={modelMatrix}
          minimumPixelSize={128}
          maximumScale={20000}
          color={getColor('white', alpha)}
          // onClick={(movement, target) => handleModelClick(movement, target, props.model.name)}
          onMouseDown={(movement, target) =>
            props.handleModelMouseDown(movement, target, props.model.name)
          }
          show={show}
          onReady={model => {
            console.log('Model ready', model);
            // // const namedNodes = model.gltf.nodes.filter(node => node.name !== undefined)
            // const nodesByName = model._runtime.nodesByName
            // const nodesData = Object.keys(nodesByName).map(key => {
            //   const node = nodesByName[key]
            //   console.log(node.publicNode.id == 11)
            //   if (node.publicNode.id !== 0) node.publicNode.show = false
            //   return {
            //     bid: props.bridge.bid,
            //     span_id: null,
            //     object_id: node.publicNode.id,
            //     boundingSphere: {
            //       center: node.commands[0].command.boundingVolume.center,
            //       radius: 50
            //     },
            //     name: node.publicNode.name,
            //   }
            // })

            // props.onModelLoad(nodesData)
          }}
        />

      </>
    );

  } else {
    return <></>
  }
}
const mapStateToProps = createStructuredSelector({
  // currentUser: makeSelectCurrentUser(),
  bridge: makeSelectBridge(),
  destroy: selectors.makeSelectDestroy(),
  // models: makeSelectBridgeModels(),
  // bridgeSpans: makeSelectBridgeSpans(),
  bridgeElements: makeSelectBridgeElements(),
  selectedObjectIds: makeSelectSelectedObjectIds(),
  // selectedElements: makeSelectSelectedElements(),
  // elementsGroups: makeSelectElementsGroups(),
  // structureTypes: makeSelectStructureTypes(),
  // elementsTypes: makeSelectElementsTypes(),
  // bridgeTypes: makeSelectBridgeTypes(),
  // selectedTask: makeSelectSelectedTask(),
  // survey: makeSelectDisplayedSurvey(),
  // selectedSubTask: makeSelectSelectedSubTask(),
  // viewData: makeSelectViewData(),
  mode: makeSelectMode(),
  // boundingSphere: makeSelectBoundingSphere(),
  zoomElement: selectors.makeSelectZoomElement()
  // elementsGroups: getElementsGroups(state),
  // elementsTypes: getElementsTypes(state),
});

export function mapDispatchToProps(dispatch) {
  return {
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
)(ModelComponent);
// export default hot(memo(resium))
 
// export default memo(ModelComponent)
