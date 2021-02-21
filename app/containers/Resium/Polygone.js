import React,  {useEffect, useState} from 'react';

import { convertCartesianToDegrees } from './Resium';
const Polygone = ({viewer, type, points}) => {
  const [degrees3d, setDegrees3d] = useState([])
  const [degrees2d, setDegrees2d] = useState([])

  
  useEffect(() => {
    console.log('Setting degrees', points)
    createDegrees3d(points);
    createDegrees2d(points);
    
    // return () => {
      //   cleanup
      // }
    }, [points])
  
  useEffect(() => {
    if (points.length >= 3 && degrees3d && degrees3d.length) {
      console.log(degrees3d)
      const cyanPolygon = viewer.entities.add({
        name: 'Cyan vertical polygon with per-position heights and outline',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(degrees3d),
          perPositionHeight: true,
          material: Cesium.Color.CYAN.withAlpha(0.5),
          
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
  
      console.log(cyanPolygon)
      }
    return () => {
      
    }
  }, [degrees3d])
  const createDegrees3d = (points) => {
    let degrees = []
    points.map(point => {
      console.log(point)
      const pointDegrees = convertCartesianToDegrees(point, Cesium.Ellipsoid.WGS84);
      degrees.push(pointDegrees.lon)
      degrees.push(pointDegrees.lat)
      degrees.push(pointDegrees.height)
    })
    setDegrees3d(degrees)
  }
  const createDegrees2d = (points) => {
    return points.map(point => {
      const pointDegrees = convertCartesianToDegrees(point, Cesium.Ellipsoid.WGS84);
      setDegrees2d([...degrees2d, pointDegrees.lon, pointDegrees.lat])
    })
  }
  
  return (
    <>

    </>
  );
};

export default Polygone;
