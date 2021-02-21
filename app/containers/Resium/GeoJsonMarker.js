
import React, { useState } from "react";

import { Color } from "cesium";
import { GeoJsonDataSource }  from "resium";
// console.log(GeoJsonDataSource )


const geoJsonMarker = (props) => {

  const onLoadAction = (g) => {
    // console.log("onLoad", g);

  }
  return <GeoJsonDataSource
            data={props.data}
            markerColor={Color.RED}
            onLoad={g => {
              // You can process the data source here
              // g.entities.values[0].name = "Coors Field!";
              onLoadAction(g);
            }}
            onError={(err)=> console.log("onError", err)}
          />
}

export default geoJsonMarker
