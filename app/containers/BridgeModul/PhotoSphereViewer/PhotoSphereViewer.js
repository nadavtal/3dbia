import React, { Component } from 'react'
import * as Sphere from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.min.css"

// console.log(Sphere)
export default class SphereComponent extends Component {
    constructor(props) {
        super(props)
        this.divStyle = {
          width: '100%',
          height: '100%',
          zIndex: '100000'
        };
        this.sphereDiv = element => {
            this.photoSphereViewer = element;
        };
        this.sphereDiv.appendChild = (elem) => {
            this.subDiv.appendChild(elem)
        }
    }

    componentDidMount() {
      // console.log(this.props.url)
        const PVS = Sphere({
            parent: this,
            container: this.sphereDiv,
            panorama: this.props.url,
            time_anim: false,
            navbar: [
                'autorotate',
                'zoom',
                'fullscreen'
            ]
        })
        // console.log(PVS)
    }

    render() {
        return <div style={this.divStyle} ref={this.sphereDiv} id="viewer">
                  <div ref={node => this.subDiv = node} style={this.divStyle}></div>
                </div>
    }
}
