
import React from "react";
import { Cartesian3, Color, Transforms } from "cesium";
import { PointPrimitiveCollection, PointPrimitive} from "resium";


const pointPrimitive = (props) => {
  console.log(props)
  const center = Cartesian3.fromDegrees(props.x, props.y, props.z);

  return (
    <PointPrimitiveCollection modelMatrix={Transforms.eastNorthUpToFixedFrame(center)}>
        <PointPrimitive
          color={Color.ORANGE}
          position={new Cartesian3(props.lon, props.centerLat, 0.0)}
          onClick={(m, t) => console.log(m, t, "onClick")}
          onDoubleClick={(m, t) => console.log(m, t, "onDoubleClick")}
          onMouseDown={(m, t) => console.log(m, t, "onMouseDown")}
          onMouseUp={(m, t) => console.log(m, t, "onMouseUp")}
          onMiddleClick={(m, t) => console.log(m, t, "onMiddleClick")}
          onMiddleDown={(m, t) => console.log(m, t, "onMiddleDown")}
          onMiddleUp={(m, t) => console.log(m, t, "onMiddleUp")}
          onMouseMove={(m, t) => console.log(m, t, "onMouseMove")}
          onPinchEnd={(m, t) => console.log(m, t, "onPinchEnd")}
          onPinchMove={(m, t) => console.log(m, t, "onPinchMove")}
          onPinchStart={(m, t) => console.log(m, t, "onPinchStart")}
          onRightClick={(m, t) => console.log(m, t, "onRightClick")}
          onRightDown={(m, t) => console.log(m, t, "onRightDown")}
          onRightUp={(m, t) => console.log(m, t, "onRightUp")}
          onMouseEnter={(m, t) => console.log(m, t, "onMouseEnter")}
          onMouseLeave={(m, t) => console.log(m, t, "onMouseLeave")}
        />
    </PointPrimitiveCollection>
  )
}

export default pointPrimitive
