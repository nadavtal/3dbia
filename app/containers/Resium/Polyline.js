import React, { useState, useRef, memo, useEffect, useMemo } from 'react';
import { Cartesian3, Transforms, Color } from 'cesium';
import {
  PolylineCollection,
  Polyline,
  CameraFlyTo,
  PointPrimitiveCollection,
  PointPrimitive,
  Entity
} from 'resium';
// import { convertCartesianToDegrees } from './Resium';
const PolylineComponent = props => {
  const polylineRef = useRef(null);
  const entityRef = useRef(null);
  // const polyline = useMemo(() => {
  //   // console.log('HEGGINT');
  //   if (polylineRef.current && polylineRef.current.cesiumElement)
  //   return polylineRef.current.cesiumElement},
    // polylineRef.current)
  const polyline = () => {
    // console.log('HEGGINT');
    if (polylineRef.current && polylineRef.current.cesiumElement)
    return polylineRef.current.cesiumElement
  }
    
  
  // console.log(typeof(props.positions), props.positions);
  // console.log(props.viewer.scene.primitives);
  useEffect(() => {
    
    if (polylineRef.current && polylineRef.current.cesiumElement) {
      console.log(polylineRef.current.cesiumElement)
      console.log(entityRef.current.cesiumElement)
      // console.log(polyline)
    }
   
  }, [polylineRef.current])
  // console.log(polylineRef)
  const positions = props.positions.map(
    position => new Cartesian3(position.lon, position.lon, position.height),
  );
  
  console.log('props.positions', props.positions)
  return (
    <div>
      {/* <PolylineCollection modelMatrix={props.viewer.scene.primitives._primitives[1].modelMatrix}>
        <Polyline
          ref={polylineRef}
          positions={props.positions}
          width={2}
          material={new Cesium.Material({
            fabric: {
              type: 'Color',
              uniforms: {
                color: props.color,
              },
            },
          })} 
          
        />
      </PolylineCollection> */}
      <Entity ref={entityRef}
        selected={false}
        tracked={false}
        polyline={{
          positions: props.positions,
          followSurface: false,
          width: 2,
          material: new Cesium.PolylineDashMaterialProperty({
            color: props.color,
          }),
          depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
            color: props.color,
            outlineWidth: 2,
            outlineColor: Cesium.Color.BLACK,
          })
        }}
        />
      <PointPrimitiveCollection
        modelMatrix={Transforms.eastNorthUpToFixedFrame(props.center)}
      >
        {/* {props.points.map(point => {
          console.log(new Cartesian3(point.lon, point.lat, 50))
          console.log(new Cartesian3(-25.3994064331055, -31.7970504760742, 5.3268871307373))
          return <PointPrimitive color={Color.GREEN} position={new Cartesian3(point.lon, point.lat, 20)} />
        }) */}
        {/* <PointPrimitive color={Color.ORANGE} position={props.center} /> */}
        {/* <PointPrimitive
          color={Color.YELLOW}
          position={
            new Cartesian3(
              -25.3994064331055,
              -31.7970504760742,
              5.3268871307373,
            )
          }
        /> */}
        {/* <PointPrimitive color={Color.GREEN} position={point} /> */}
        {/* <PointPrimitive color={Color.GREEN} position={Cartesian3.fromDegrees(-25.3994064331055, -31.7970504760742, 27.3268871307373)} /> */}
        {/* <PointPrimitive color={Color.CYAN} position={new Cartesian3(0.0, 0.0, 1000000.0)} /> */}
      </PointPrimitiveCollection>
    </div>
  );
};

export default PolylineComponent;
