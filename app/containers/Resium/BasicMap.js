import React, { useState, useRef } from 'react'
import {
    Viewer,
    Entity,
    EntityDescription,
    // ArcGisMapServerImageryProvider
  } from 'resium';

const BasicMap = ({
    bridges
}) => {

    const viewerRef = useRef(null);
    return (
        <Viewer
        full
        ref={viewerRef}
        timeline={false}
        baseLayerPicker
        sceneMode={Cesium.SceneMode.SCENE2D}
        // onSelectedEntityChange={handleSelectedEntityChanged}
        selectionIndicator={false}
        animation={false}
        fullscreenButton={false}
        // onClick={(m, t) => handleViewerClick(m, t)}
        // onRightClick={(m, t) => handleViewerRightClick(m, t)}
        // onMouseMove={(m, t) => handleViewerMouseMove(m, t)}
        // onMouseDown={(m, t) => handleViewerMouseDown(m, t)}
        // onMouseUp={(m, t) => handleViewerMouseUp(m, t)}
      >

          </Viewer>
    )

}


export default BasicMap