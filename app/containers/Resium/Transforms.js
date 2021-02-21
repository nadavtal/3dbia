import React, { useState } from 'react'

const Transforms = ({
    url = "https://storage.googleapis.com/3dbia_organization_169/bid_1200/survey_559/Models/Glb/Beit_Shemesh_050720_1.glb",
    viewer
}) => {
    // var viewer = new Cesium.Viewer("cesiumContainer");
    console.log('viewer', viewer)
    var canvas = viewer.canvas;
    canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
    canvas.addEventListener("click", function () {
      canvas.focus();
    });
    canvas.focus();
    
    var scene = viewer.scene;
    var camera = viewer.camera;
    var controller = scene.screenSpaceCameraController;
    var r = 0;
    var center = new Cesium.Cartesian3();
    
    var hpRoll = new Cesium.HeadingPitchRoll();
    var hpRange = new Cesium.HeadingPitchRange();
    var deltaRadians = Cesium.Math.toRadians(1.0);
    
    var localFrames = [
      {
        pos: Cesium.Cartesian3.fromDegrees(-123.075, 44.045, 5000.0),
        converter: Cesium.Transforms.eastNorthUpToFixedFrame,
        comments: "Classical East North Up\nlocal Frame",
      },
      {
        pos: Cesium.Cartesian3.fromDegrees(-123.075, 44.05, 5500.0),
        converter: Cesium.Transforms.localFrameToFixedFrameGenerator(
          "north",
          "west"
        ),
        comments: "North West Up\nlocal Frame",
      },
      {
        pos: Cesium.Cartesian3.fromDegrees(-123.075, 44.04, 4500.0),
        converter: Cesium.Transforms.localFrameToFixedFrameGenerator(
          "south",
          "up"
        ),
        comments: "South Up West\nlocal Frame",
      },
      {
        pos: Cesium.Cartesian3.fromDegrees(-123.075, 44.05, 4500.0),
        converter: Cesium.Transforms.localFrameToFixedFrameGenerator(
          "up",
          "east"
        ),
        comments: "Up East North\nlocal Frame",
      },
      {
        pos: Cesium.Cartesian3.fromDegrees(-123.075, 44.04, 5500.0),
        converter: Cesium.Transforms.localFrameToFixedFrameGenerator(
          "down",
          "east"
        ),
        comments: "Down East South\nlocal Frame",
      },
    ];
    
    var primitives = [];
    var hprRollZero = new Cesium.HeadingPitchRoll();
    
    for (var i = 0; i < localFrames.length; i++) {
      var position = localFrames[i].pos;
      var converter = localFrames[i].converter;
      var comments = localFrames[i].comments;
      var planePrimitive = scene.primitives.add(
        Cesium.Model.fromGltf({
          url: url,
          modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
            position,
            hpRoll,
            Cesium.Ellipsoid.WGS84,
            converter
          ),
          minimumPixelSize: 128,
        })
      );
    
      primitives.push({
        primitive: planePrimitive,
        converter: converter,
        position: position,
      });
      var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        position,
        hprRollZero,
        Cesium.Ellipsoid.WGS84,
        converter
      );
      scene.primitives.add(
        new Cesium.DebugModelMatrixPrimitive({
          modelMatrix: modelMatrix,
          length: 300.0,
          width: 10.0,
        })
      );
    
      var positionLabel = position.clone();
      positionLabel.z = position.z + 300.0;
      viewer.entities.add({
        position: positionLabel,
        label: {
          text: comments,
          font: "18px Helvetica",
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          HorizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
        },
      });
    }
    
    primitives[0].primitive.readyPromise.then(function (model) {
      // Play and loop all animations at half-speed
      model.activeAnimations.addAll({
        multiplier: 0.5,
        loop: Cesium.ModelAnimationLoop.REPEAT,
      });
    
      // Zoom to model
      r = 2.0 * Math.max(model.boundingSphere.radius, camera.frustum.near);
      controller.minimumZoomDistance = r * 0.5;
      Cesium.Matrix4.multiplyByPoint(
        model.modelMatrix,
        model.boundingSphere.center,
        center
      );
      var heading = Cesium.Math.toRadians(90.0);
      var pitch = Cesium.Math.toRadians(0.0);
      hpRange.heading = heading;
      hpRange.pitch = pitch;
      hpRange.range = r * 100.0;
      camera.lookAt(center, hpRange);
    });
    
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 40:
          // pitch down
          hpRoll.pitch -= deltaRadians;
          if (hpRoll.pitch < -Cesium.Math.TWO_PI) {
            hpRoll.pitch += Cesium.Math.TWO_PI;
          }
          break;
        case 38:
          // pitch up
          hpRoll.pitch += deltaRadians;
          if (hpRoll.pitch > Cesium.Math.TWO_PI) {
            hpRoll.pitch -= Cesium.Math.TWO_PI;
          }
          break;
        case 39:
          if (e.shiftKey) {
            // roll right
            hpRoll.roll += deltaRadians;
            if (hpRoll.roll > Cesium.Math.TWO_PI) {
              hpRoll.roll -= Cesium.Math.TWO_PI;
            }
          } else {
            // turn right
            hpRoll.heading += deltaRadians;
            if (hpRoll.heading > Cesium.Math.TWO_PI) {
              hpRoll.heading -= Cesium.Math.TWO_PI;
            }
          }
          break;
        case 37:
          if (e.shiftKey) {
            // roll left until
            hpRoll.roll -= deltaRadians;
            if (hpRoll.roll < 0.0) {
              hpRoll.roll += Cesium.Math.TWO_PI;
            }
          } else {
            // turn left
            hpRoll.heading -= deltaRadians;
            if (hpRoll.heading < 0.0) {
              hpRoll.heading += Cesium.Math.TWO_PI;
            }
          }
          break;
        default:
      }
    });
    
    // var headingSpan = document.getElementById("heading");
    // var pitchSpan = document.getElementById("pitch");
    // var rollSpan = document.getElementById("roll");
    
    viewer.scene.preUpdate.addEventListener(function (scene, time) {
      for (var i = 0; i < primitives.length; i++) {
        var primitive = primitives[i].primitive;
        var converter = primitives[i].converter;
        var position = primitives[i].position;
        Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          hpRoll,
          Cesium.Ellipsoid.WGS84,
          converter,
          primitive.modelMatrix
        );
      }
    });
    
    // viewer.scene.preRender.addEventListener(function (scene, time) {
    //   headingSpan.innerHTML = Cesium.Math.toDegrees(hpRoll.heading).toFixed(
    //     1
    //   );
    //   pitchSpan.innerHTML = Cesium.Math.toDegrees(hpRoll.pitch).toFixed(1);
    //   rollSpan.innerHTML = Cesium.Math.toDegrees(hpRoll.roll).toFixed(1);
    // });
    

    return <div id="cesiumContainer"> 

    </div>
}

export default Transforms