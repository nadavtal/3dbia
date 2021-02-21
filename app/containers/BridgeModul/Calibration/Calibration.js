import { MDBBtn, MDBIcon, MDBSelect } from 'mdbreact';
import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import CustomSlider from 'components/Slider/Slider';
import { makeSelectBridge, makeSelectBridgeModels } from '../selectors';

const Calibration = ({
    selectedItem,
    models,
    rotationStep,
    calibrationData,
    rotationMultiplier,
    bridge
    }) => {
        const [initialCalibrationState, setInitialCalibrationState] = useState();
        const [step, setStep] = useState(5);
        const [multiplier, setMultiplier] = useState(100000);
        // const incomingCalibrationData = calibrationData[selectedItem].calibrationData;
        // const initialCalibrationCenter = calibrationData[selectedItem].center
        const positionActions =  [
            {
            label: 'Select entity',
            elementType: 'select',
            elementConfig: {
                options: models.map(model => {
                return {text: model.name, value: model.name}
                })
            },
            value: selectedItem,

            },
            {
            label: 'Adust Accuracy',
            showLabel: true,
            elementType: 'slider',
            elementConfig: {
                min: 1,
                max: 7,
                defaultValue: step,
                step: 1,
                tipFormatter: value => `1/${Math.pow(10, value)}`,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
            },
            value: step,
            defaultValue: step,
            stepMultyplier: multiplier
            },
            {
            label: 'Lon',
            elementType: 'input',
            elementConfig: {
                type: 'number',
                step: 1/multiplier
            },
            value: incomingCalibrationData ? incomingCalibrationData.lon : 0,

            },
            {
            label: 'Lon',
            elementType: 'slider',
            elementConfig: {
                min: -50,
                max: 50,
                defaultValue: 0,
                step: 1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
            },
            value: incomingCalibrationData ?  (incomingCalibrationData.lon - initialCalibrationState.lon) * multiplier : 0,
            defaultValue: initialCalibrationState ? initialCalibrationState.lon : 0,
            stepMultyplier: multiplier
            },
            {
            label: 'Lat',
            elementType: 'input',
            elementConfig: {
                type: 'number',
                step: 1/multiplier
            },
            value: incomingCalibrationData ? incomingCalibrationData.lat : 0,

            },
            {
            label: 'Lat',
            elementType: 'slider',
            elementConfig: {
                min: -50,
                max: 50,
                defaultValue: 0,
                step: 1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
            },
            value: incomingCalibrationData ?  (incomingCalibrationData.lat - initialCalibrationState.lat) * multiplier : 0,
            defaultValue: initialCalibrationState ? initialCalibrationState.lat : 0,
            stepMultyplier: multiplier
            },
            {
            label: 'Height',
            elementType: 'input',
            elementConfig: {
                type: 'number'

            },
            value: incomingCalibrationData ? incomingCalibrationData.height : 0,

            },
            {
            label: 'Height',
            elementType: 'slider',
            elementConfig: {
                min: -999,
                max: 999,
                defaultValue:  initialCalibrationState ? initialCalibrationState.height : 0,
                step: 1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
            },
            value: incomingCalibrationData ? incomingCalibrationData.height : 0,
            defaultValue: initialCalibrationState ? initialCalibrationState.height : 0,
            stepMultyplier: 1
            },


        ]
        const rotationAction = [
        {
            label: 'Select entity',
            elementType: 'select',
            elementConfig: {
            options: models.map(model => {
                return { text: model.name, value: model.name };
            }),
            },
            value: selectedItem,
        },
        {
            label: 'Adust Accuracy',
            showLabel: true,
            elementType: 'slider',
            elementConfig: {
            min: 1,
            max: 3,
            defaultValue: 1,
            step: 1,
            tipFormatter: value => `1/${Math.pow(10, value) / 10}`,
            // defaultMin: 0,
            // defaultMax: 100,
            range: false,
            },
            value: rotationStep,
            defaultValue: rotationStep,
            stepMultyplier: rotationMultiplier,
        },
        {
            label: 'Rotate-X',
            elementType: 'input',
            elementConfig: {
            type: 'number',
            step: 1 / rotationMultiplier,
            },
            value: incomingCalibrationData['rotate-x'],
        },
        {
            label: 'Rotate-X',
            elementType: 'slider',
            elementConfig: {
            min: -180,
            max: 180,
            defaultValue: 0,
            step: 1 / rotationMultiplier,
            // defaultMin: 0,
            // defaultMax: 100,
            range: false,
            },
            // value: incomingCalibrationData ? incomingCalibrationData['rotate-x'] * stepMultiplier : 0 ,
            value: incomingCalibrationData
            ? (incomingCalibrationData['rotate-x'] -
                initialCalibrationState['rotate-x']) *
                rotationMultiplier
            : 0,
            defaultValue: initialCalibrationState
            ? initialCalibrationState['rotate-x']
            : 0,
            stepMultyplier: rotationMultiplier,
        },
        {
            label: 'Rotate-Y',
            elementType: 'input',
            elementConfig: {
            type: 'number',
            step: 1 / rotationMultiplier,
            },
            value: incomingCalibrationData
            ? incomingCalibrationData['rotate-y']
            : 0,
        },
        {
            label: 'Rotate-Y',
            elementType: 'slider',
            elementConfig: {
            min: -180,
            max: 180,
            defaultValue: incomingCalibrationData
                ? incomingCalibrationData['rotate-y']
                : 0,
            step: 1 / rotationMultiplier,
            // defaultMin: 0,
            // defaultMax: 100,
            range: false,
            },
            value: incomingCalibrationData
            ? (incomingCalibrationData['rotate-y'] -
                initialCalibrationState['rotate-y']) *
                rotationMultiplier
            : 0,
            defaultValue: initialCalibrationState
            ? initialCalibrationState['rotate-y']
            : 0,
            stepMultyplier: rotationMultiplier,
        },
        {
            label: 'Rotate-Z',
            elementType: 'input',
            elementConfig: {
            type: 'number',
            step: 1 / rotationMultiplier,
            },
            value: incomingCalibrationData
            ? incomingCalibrationData['rotate-z']
            : 0,
        },
        {
            label: 'Rotate-Z',
            elementType: 'slider',
            elementConfig: {
            min: -180,
            max: 180,
            defaultValue: incomingCalibrationData
                ? incomingCalibrationData['rotate-z']
                : 0,
            step: 1 / rotationMultiplier,
            // defaultMin: 0,
            // defaultMax: 100,
            range: false,
            },
            value: incomingCalibrationData
            ? (incomingCalibrationData['rotate-z'] -
                initialCalibrationState['rotate-z']) *
                rotationMultiplier
            : 0,
            defaultValue: initialCalibrationState
            ? initialCalibrationState['rotate-z']
            : 0,
            stepMultyplier: rotationMultiplier,
        },
        ];
        const positionActionsHtml = positionActions.map((action, index) => {
            // console.log(actionGroups.models.actions)
            // console.log(actions)
            switch (action.elementType) {
              case 'button':
                return <MDBBtn
                      className="resiumToolBar_action resiumToolBar_view_button p-1"
                      key={index}
                      onClick={() => inputChangedHandler(event, actionGroup, action)}>
                        <MDBIcon icon='image' className='mr-1' />{action.label}
                      </MDBBtn>
              case 'select':
                // console.log(action.value)
                return <MDBSelect
                          key={index}
                          className='toolBar_input'
                          options={action.elementConfig.options}
                          // label={action.label}
                          selected={action.value}
                          getValue={(event) => inputChangedHandler(event[0], actionGroup, action)}
                        />
              case 'checkbox':
                // console.log(action.value)
                return <div key={index} className="toolBar_input">
                        <Input
                          label={action.label}
                          elementtype='checkbox'
                          value={action.value}
                          changed={(event) => inputChangedHandler(action.value, actionGroup, action)}
                          // invalid={!formElement.config.valid}
                          shouldValidate={false}
                          touched={false}
                          // errMsg={formElement.config.errMsg}
                        />
        
                      </div>
              case 'slider':
                // console.log(action)
                return <div className="p-1"  key={index}>
                        {action.showLabel && <div>{action.label}</div>}
                        <CustomSlider
                          {...action.elementConfig}
                          onChange={(event) => inputChangedHandler(event, actionGroup, action)}
                          // value={action.label !== 'Height' ? (action.value - action.defaultValue) * action.stepMultyplier : action.value}
                          value={action.value}
                          sliderType='normal'
                          />
                        <hr />
                      </div>
        
              default:
        
                return <div key={index} className="d-flex justify-content align-item-middle resiumToolBar_action mb-1">
                  <label className="">{action.label}:</label>
        
                  <input
                    label={action.label}
                    value={action.value}
                    {...action.elementConfig}
                    onChange={(event) => inputChangedHandler(parseFloat(event.target.value), actionGroup, action)}
                    className=""
                    />
                </div>
        
                // <MDBInput
                //           label={action.label}
                //           value={action.value}
                //           type="number"
                //           // step='0.00001'
                //           onChange={(event) => inputChangedHandler(parseFloat(event.target.value), actionGroup, action)}
                //           className=""
                //           />
            }
          })
        
        const inputChangedHandler = (value, actionGroup, action) => {

            if (value !== null && value !== undefined) {
              
              switch (action.elementType) {
                case 'slider':
                  switch (action.label) {
                    case 'Lon':
                      value = action.defaultValue + value/multiplier
                      break;
                    case 'Lat':
                      // console.log(action.defaultValue + value/multiplier)
                      value = action.defaultValue + value/multiplier
                      break;
                    case 'Rotate-X':
                      // console.log(rotationMultiplier)
                      value = action.defaultValue + value/rotationMultiplier
                      break;
                    case 'Rotate-Y':
                      // console.log(action.defaultValue + value/multiplier)
                      value = action.defaultValue + value/rotationMultiplier
                      break;
                    case 'Rotate-Z':
                      // console.log(action.defaultValue + value/multiplier)
                      value = action.defaultValue + value/rotationMultiplier
                      break;
        
        
                    default:
                      value = value
                      break;
                  }
        
                  break;
                case 'checkbox':
        
                default:
        
                  break;
              }
        
              action.modelName ? onAction(value, actionGroup, action.label, action.modelName) : onAction(value, actionGroup, action.label)
        
            }
          }
        return <div>
            <h5>Models Calibration</h5>
            <div>
                <h6>Position</h6>
                {positionActionsHtml}
            </div>
        </div>
}

const mapStateToProps = createStructuredSelector({
    bridge: makeSelectBridge(),
    models: makeSelectBridgeModels(),
  });
  
  
  const mapDispatchToProps = (dispatch) => {
    return {
    //   onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(Calibration);
  
  