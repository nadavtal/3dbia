import React, { useState, useRef } from 'react'
import { Resizable } from "re-resizable";
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip'
const ResizablePage = ({
    leftComponent,
    rightComponent
}) => {
    // const [leftWidth, setWidth] = useState(300);
    // const [leftWeight, setHeight] = useState(200);
    const leftRef = useRef()
    const rightRef = useRef()
    const bottomRef = useRef()
    const innerPageRef = useRef()
    const [sizes, setSizes] = useState({
        leftWidth: '29.7%',
        rightWidth: '70%',
        height: '81vh',

    })
    const [fullPageComponent, setFullPageComponent] = useState()
    const spaceBetween = 5
    const style = {
    //   height: '83vh',
    //   width: '50%',
      border: 'solid 1px #ddd',
      background: '#f0f0f0',
    }; 
    const toggleFullPage = (component) => {
        const currentSizes = sizes
        if (fullPageComponent == component) {
            setFullPageComponent();
            setSizes({
              leftWidth: '29.7%',
              rightWidth: '70%',
              height: '81vh',
            });
        }
        else {
            setFullPageComponent(component)
            if (component == 'left') {
                setSizes({...sizes, 
                    leftWidth: innerPageRef.current.offsetWidth,
                    // rightWidth: innerPageRef.current.offsetWidth - leftRef.current.size.width - spaceBetween,
                    // height: leftRef.current.size.height
                });

            } else {
                setSizes({...sizes, 
                    rightWidth: innerPageRef.current.offsetWidth,
                    // rightWidth: innerPageRef.current.offsetWidth - leftRef.current.size.width - spaceBetween,
                    // height: leftRef.current.size.height
                }); 
            }
        }
    }
    const FullPageButton = ({component}) => {

        return <IconButtonToolTip
          className="topCornerRightButton"
          iconName={fullPageComponent == component ? 'compress-arrows-alt' : "arrows-alt"}
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText='Toggle full page'
          onClickFunction={() => toggleFullPage(component)}
        />
    
      };
  
    const handleResize = (component, d) => {

        // console.log(d.width)
        console.log(component)
        console.log(innerPageRef.current.offsetWidth)
        console.log(leftRef.current.size)
        switch (component) {
            case 'leftComponent':
                setSizes({...sizes, 
                    leftWidth: leftRef.current.size.width,
                    rightWidth: innerPageRef.current.offsetWidth - leftRef.current.size.width - spaceBetween,
                    // height: leftRef.current.size.height
                });
                // setSizes({...sizes, height: sizes.height + d.height});
                break;
            case 'rightComponent':
                setSizes({...sizes, 
                    rightWidth: rightRef.current.size.width,
                    leftWidth: innerPageRef.current.offsetWidth - rightRef.current.size.width - spaceBetween,
                    // height: rightRef.current.size.height
                });
                break;
        
            default:
                break;
        }
        
    }
    return <div className=""
        ref={innerPageRef}>
      {/* {fullPageComponent !== 'right' &&  */}
      <Resizable
        className={`float-left leftViewWrapper ${fullPageComponent == 'right' ? 'offScreenLeft' : '' }`}
        ref={leftRef}
        style={style}
        size={{ width: sizes.leftWidth, height: sizes.height }}
        onResizeStop={(e, direction, ref, d) => {
            // handleResize('leftComponent', d)          
        }}
        onResize={(e, direction, ref, d) => {
            // console.log(e)
            // console.log(direction)
            // console.log(d)
            // console.log(ref)
            handleResize('leftComponent', d)          
        }}
      >
        {leftComponent}
        <FullPageButton component="left"/>
      </Resizable>
      {/* } */}
      
      {/* {fullPageComponent !== 'left' &&  */}
      <Resizable
    //   className="rightViewWrapper"
      className={`float-right rightViewWrapper ${fullPageComponent == 'left' ? 'offScreenRight' : ''}`}
        ref={rightRef}
        style={style}
        size={{ width: sizes.rightWidth, height: sizes.height }}
        onResizeStop={(e, direction, ref, d) => {
            // handleResize('rightComponent', d)
        }}
        onResize={(e, direction, ref, d) => {
            // console.log(e)
            // console.log(direction)
            // console.log(d)
            // console.log(ref)
            handleResize('rightComponent', d)          
        }}
      >
        {rightComponent}
        <FullPageButton component="right"/>
      </Resizable>
      {/* } */}
      {/* <Resizable
        className="bottomViewWrapper"
        ref={bottomRef}
        style={style}
        size={{ width: sizes.rightWidth, height: sizes.height }}
        onResizeStop={(e, direction, ref, d) => {
            // handleResize('rightComponent', d)
        }}
        onResize={(e, direction, ref, d) => {
            // console.log(e)
            // console.log(direction)
            // console.log(d)
            // console.log(ref)
            handleResize('bottomComponent', d)          
        }}
      >
        Bottom component
      </Resizable> */}
    </div>;
  };

export default ResizablePage