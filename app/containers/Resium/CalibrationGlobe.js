import React, { useState, useEffect } from 'react'
import { Model, Entity } from "resium";
const CalibrationGlobe = ({
  position,
  viewer,
  multiplier,
  rotationMultiplier,
  // calibrationData,
  onAction
}) => {
    const createLinesFromPosition = (position) => {
      
    }
    const [oositions, setPositions] = useState({
      lon: null,
      lat: null,
      height: null,
    })
    const lonEntityRef = useRef(null);
    const ellipsoid = viewer.current.cesiumElement.scene.globe.ellipsoid;
    const offSetCartesian = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.height, ellipsoid);
    const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(offSetCartesian);
    
    // const handleGlobeMouseDown = (movement, target) => {
    //   // const pickedFeature = viewer.current.cesiumElement.scene.pick(movement.position);
    //   console.log(calibrationData)
    //   console.log(movement)
    //   console.log(target)
    //   let value
    //   console.log(target.node.name)
    //   switch (target.node.name) {
    //     case 'X':
    //       // value = action.defaultValue + value / multiplier;
    //       break;
    //     case 'Y':
    //       // console.log(action.defaultValue + value/multiplier)
    //       // value = action.defaultValue + value / multiplier;
    //       break;
    //     case 'Rotate-X':
    //       // console.log(rotationMultiplier)
    //       value =
    //         action.defaultValue + value / rotationMultiplier;
    //       break;
    //     case 'Rotate-Y':
    //       // console.log(action.defaultValue + value/multiplier)
    //       value =
    //         action.defaultValue + value / rotationMultiplier;
    //       break;
    //     case 'Rotate-Z':
    //       // console.log(action.defaultValue + value/multiplier)
    //       value =
    //         action.defaultValue + value / rotationMultiplier;
    //       break;

    //     default:
    //       value = value;
    //       break;
    //   }
    // }

    const inputChangedHandler = (value, actionGroup, action) => {

      if (value !== null && value !== undefined) {
        
        switch (action.elementType) {
          case 'slider':
            switch (action.label) {
              case 'Lon':
                value = action.defaultValue + value / multiplier;
                break;
              case 'Lat':
                // console.log(action.defaultValue + value/multiplier)
                value = action.defaultValue + value / multiplier;
                break;
              case 'Rotate-X':
                // console.log(rotationMultiplier)
                value =
                  action.defaultValue + value / rotationMultiplier;
                break;
              case 'Rotate-Y':
                // console.log(action.defaultValue + value/multiplier)
                value =
                  action.defaultValue + value / rotationMultiplier;
                break;
              case 'Rotate-Z':
                // console.log(action.defaultValue + value/multiplier)
                value =
                  action.defaultValue + value / rotationMultiplier;
                break;

              default:
                value = value;
                break;
            }
  
            break;
          case 'checkbox':
  
          default:
  
            break;
        }
  
        action.modelName ? onAction(value, actionGroup, action.label, action.modelName) : onAction(value, actionGroup, action.label)
  
      }
    }
    return <>
     <Model
    url={require('models/XYZ_axis_V02.glb')}
    // ref={viewerRef}
    modelMatrix={modelMatrix}
    scale={3}
    // minimumPixelSize={128}
    // maximumScale={20000}
    // color={getColor(color, alpha)}
    // // colorBlendMode="Highlight"
    // colorBlendAmount={1}
    // onClick={(movement, target) => handleGlobeClick(movement, target)}
    // onMouseDown={(movement, target) =>
    //   handleGlobeMouseDown(movement, target)
    // }
    // onMouseMove={(m, t) => console.log(m, t, model.name)}
    // silhouetteColor={silhouetteColor}
    // silhouetteColor={silhouetteColor ? getColor(silhouetteColor, silhouetteAlpha) : {}}
    // silhouetteSize={silhouetteSize}
    show={true}
    onReady={model => {
      console.log('Globe READY', model);
    }}
    // color={getColor('red', 1)}
  />
          {console.log('lonPositions', lonPositions)}
        {console.log('lonEntityRef', lonEntityRef)}
        <Entity
          ref={lonEntityRef}
          selected={false}
          tracked={false}
          polyline={{
            positions: lonPositions,
            followSurface: false,
            width: 10,
            material: new Cesium.PolylineOutlineMaterialProperty({
              color: Cesium.Color.GREEN,
            }),
            // depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
            //   color: Cesium.Color.RED,
            //   outlineWidth: 2,
            //   outlineColor: Cesium.Color.BLACK,
            // }),
          }}
        />
  </>
}

export default CalibrationGlobe