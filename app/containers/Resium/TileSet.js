import React, { useRef, useEffect, memo, useState } from 'react';
import { Cartesian3 } from 'cesium';
import { Cesium3DTileset, Entity, EntityDescription } from 'resium';
import Polyline from './Polyline';
import NameOverLay from './NameOverLay';

const tileSet = props => {
  // console.log('TILESET RENDER - ', props);
  const [modelResource, setModelResource] = useState();
  const [tileSet, setTileSet] = useState();

  useEffect(() => {
    console.log('RUNING USEEFFECT', props.item)
    if (props.item.ion_id) {
      const promise = Cesium.IonResource.fromAssetId(props.item.ion_id).then(
        function(resource) {
          console.log(resource);
          setModelResource(resource);
        },
      );
    } else {
      setModelResource(props.item.url);
    }
    // setModelResource('https://drive.google.com/uc?export=view&id=19gr9RKfZ8MsSTbqQno04iNT93lVp3Z--')
    return () => {
      // console.log('cleanup')
    };
  }, []);

  useEffect(() => {
    // console.log('alksdjalskdjlaksjdlaksjdlj', tileSet)
    if (tileSet) {
      console.log(tileSet);
      tileSet.style = new Cesium.Cesium3DTileStyle({
        color: {
          conditions: [
            ['true', `color("white", ${props.calibrationData.alpha})`],
          ],
        },
        // show : '${Height} > 0',
        meta: {
          description: '"Building id ${id} has height ${Height}."',
        },
      });
    }
    return () => {};
  }, [props.calibrationData.alpha]);

  const show = props.calibrationData.show;
  const tileSetRef = useRef(null);

  const viewer = props.viewerRef.current.cesiumElement;

  const ellipsoid = props.viewerRef.current.cesiumElement.scene.globe.ellipsoid;
  const incomingCalibrationData = props.calibrationData.calibrationData;
  const center = props.calibrationData.center;
  const centerCartesian = Cesium.Cartesian3.fromDegrees(
    center.lon,
    center.lat,
    center.height,
    ellipsoid,
  );
  const offSetCartesian = Cesium.Cartesian3.fromDegrees(
    incomingCalibrationData.lon,
    incomingCalibrationData.lat,
    incomingCalibrationData.height,
    ellipsoid,
  );
  const cartographic = Cesium.Cartographic.fromCartesian(centerCartesian);
  const offSetCartographic = Cesium.Cartographic.fromCartesian(offSetCartesian);
  const surface = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    0.0,
  );
  const offset = Cesium.Cartesian3.fromRadians(
    offSetCartographic.longitude,
    offSetCartographic.latitude,
    incomingCalibrationData.height,
  );
  const translation = Cesium.Cartesian3.subtract(
    offset,
    surface,
    new Cesium.Cartesian3(),
  );
  const modelMatrix = Cesium.Matrix4.fromTranslation(translation);

  
  // console.log(viewer.scene.primitives)

  const handleModelClick = (m, t, item) => {
    console.log(m, t, item);
    const tile = t.content.tile;
    const boundingVolumeCenter = tile.boundingVolume.center;
    console.log(tile);
    // props.addPoint(boundingVolumeCenter);
  };

  // console.log(modelResource)
  if (modelResource) {
    return (
      <Cesium3DTileset
        ref={tileSetRef}
        maximumScreenSpaceError={1}
        modelMatrix={modelMatrix}
        url={modelResource}
        show={show}
        onClick={(m, t) => handleModelClick(m, t, props.item)}
        // onMouseDown={(movement, target) => props.handleModelMouseDown(movement, target, props.item.name)}
        // onTileLoad={tile => console.log(tile)}
        onReady={tiles => {
          // console.log(tiles);

          props.onReady(tiles);
          setTileSet(tiles);
        }}
        // onClick={(movement, target) => console.log("onClick", movement, target)}
      />
    );
  } else {
    return <></>;
  }
};

export default memo(tileSet);
