export function setInitalCameraView() {
  const initialPosition = Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.69114333714821, 753);
  const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
  viewer.scene.camera.setView({
      destination: initialPosition,
      orientation: initialOrientation,
      endTransform: Cesium.Matrix4.IDENTITY
  });
}

export const getColor = (colorName, alpha) => {
  // console.log('colorName', colorName)
  var color = Cesium.Color[colorName.toUpperCase()];
  return Cesium.Color.fromAlpha(color, parseFloat(alpha));
}

export const degreesToRadians = (val) => {
  return val*Math.PI/180;
}

export const enuToRadians = (val) => {
  return val*Math.PI/180;
}


