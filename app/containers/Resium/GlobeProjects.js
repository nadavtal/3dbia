import React, { useRef, useEffect } from "react";
import { BoundingSphere, PointGraphics, Cartesian3, Color } from "cesium";
import { Viewer, Entity ,EntityDescription, CameraFlyToBoundingSphere, CesiumWidget } from "resium";


const GlobeProjects = (props) => {
  // console.log(props)
  // const viewerRef = useRef(null);
  const handleSelectedEntityChanged = () => {
    // console.log(viewerRef)
    if (!viewerRef.current || !viewerRef.current.cesiumElement) {
      return;
    }

    const viewer = viewerRef.current.cesiumElement;
    const selectedEntity = viewer.selectedEntity;

    if (selectedEntity) {
      viewer.camera.flyToBoundingSphere(
        new BoundingSphere(selectedEntity.position.getValue(viewer.clock.currentTime), 1000),
        { duration: 1 }
      );
    }
  };

  return  <div>
            <Entity
              name="Entity 1"
              position={Cartesian3.fromDegrees(61, 130, 100)}
              >
              <PointGraphics pixelSize={10} color={Color.RED} />

              <EntityDescription>
                <h1>Hello world</h1>
                <p>test</p>
              </EntityDescription>
            </Entity>
            <Entity
              name="Entity 2"
              position={Cartesian3.fromDegrees(81, 130, 100)}
              >
              {/* <PointGraphics pixelSize={10} color={Color.BLUE} /> */}

              <EntityDescription>
                <h1>Hello world</h1>
                <p>test</p>
              </EntityDescription>
            </Entity>
          </div>
}

export default GlobeProjects
