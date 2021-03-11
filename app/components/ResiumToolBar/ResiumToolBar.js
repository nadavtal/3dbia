import React, { useState, useEffect, memo, useMemo, useRef } from 'react';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import Input from 'components/Input/Input';
import CustomSlider from 'components/Slider/Slider';

import './ResiumToolBar.css';
import { MDBBtn, MDBInput, MDBSelect, MDBIcon, MDBAnimation } from 'mdbreact';
import CSSTransition from 'react-transition-group/CSSTransition';
import useOutsideAlerter from 'utils/customHooks/useOutSideClick';

const ResiumToolBar = props => {
  // console.log(props.calibrationData)
  const incomingCalibrationData =
    props.calibrationData[props.selectedItem].calibrationData;
  const initialCalibrationCenter =
    props.calibrationData[props.selectedItem].center;
  // console.log('incomingCalibrationData', incomingCalibrationData)
  // console.log('initialCalibrationState', initialCalibrationCenter)
  const [open, setOpen] = useState(props.toolBarOpen);
  const [locked, setLocked] = useState(false);
  const [actionGroup, setActionGroup] = useState('calibration');
  const [initialCalibrationState, setInitialCalibrationState] = useState();

  useEffect(() => {
    setInitialCalibrationState({ ...incomingCalibrationData });
    return () => {
      // cleanup
    };
  }, []);
  // useEffect(() => {
  //   // console.log('setInitialCalibrationState')
  //   updatedActionsMultipliers(actionGroups)
  //   // setInitialCalibrationState(initialCalibrationCenter)
  //   return () => {

  //   };
  // }, [props.step, props.rotationStep])
  useEffect(() => {
    if (open && !locked) {
      setOpen(false);
    }
  }, [props.toolBarOpen]);
  const createModelsActions = () => {
    let modelActions = [];
    props.models.map(model => {
      modelActions.push(
        {
          label: model.name,
          id: model.id,
          elementType: 'checkbox',
          // elementConfig: {
          //   options: props.models.map(model => {
          //     return {text: model.name, value: model.name}
          //   })
          // },
          value: props.calibrationData[model.name].show,
        },
        {
          label: 'Alpha',
          showLabel: true,
          modelName: model.name,
          elementType: 'slider',
          elementConfig: {
            min: 0,
            max: 1,
            defaultValue: 1,
            step: 0.01,
            // defaultMin: 0,
            // defaultMax: 100,
            range: false,
          },
          value: props.calibrationData[model.name].alpha,
          stepMultyplier: 1,
        },
        // {
        //   label: 'Delete Model',
        //   elementType: 'button',
        //   elementConfig: {

        //   },
        //   value: '',
        //   validation: {},
        //   valid: true
        // },
      );
    });
    return modelActions;
  };
  const createActionGroups = () => {
    // console.log('createActionGroups', props.calibrationData);
    // console.log('initialCalibrationState', initialCalibrationState);
    const modelActions = createModelsActions();
    let actions;
    if (initialCalibrationState) {
      // console.log(incomingCalibrationData ?  (incomingCalibrationData['rotate-x'] - initialCalibrationState['rotate-x']) * props.rotationMultiplier: 'no incomingCalibrationData')
      actions = {
        models: {
          name: 'Models',
          iconName: 'cubes',
          show: true,
          actions: modelActions,
        },
        views: {
          name: 'Views',
          iconName: 'eye',
          show: true,
          actions: [
            {
              label: 'Top',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Bottom',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Left',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Right',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Front',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Back',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
          ],
        },
        calibration: {
          name: 'Calibration',
          iconName: 'arrows-alt',
          show: props.selectedSubTask == 'Calibrate models',
          actions: [
            {
              label: 'Select entity',
              elementType: 'select',
              elementConfig: {
                options: props.models.map(model => ({text: model.name, value: model.name})),
              },
              value: props.selectedItem,
            },
            // {
            //   label: 'Adust Accuracy',
            //   showLabel: true,
            //   elementType: 'slider',
            //   elementConfig: {
            //     min: 1,
            //     max: 7,
            //     defaultValue: props.step,
            //     step: 1,
            //     tipFormatter: value => `1/${Math.pow(10, value)}`,
            //     // defaultMin: 0,
            //     // defaultMax: 100,
            //     range: false
            //   },
            //   value: props.step,
            //   defaultValue: props.step,
            //   stepMultyplier: props.multiplier
            // },
            {
              label: 'Position',
              elementType: 'text',
            },
            {
              label: 'Lon',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 1 / props.multiplier,
              },
              value: incomingCalibrationData ? incomingCalibrationData.lon : 0,
            },
            {
              label: 'Lat',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 1 / props.multiplier,
              },
              value: incomingCalibrationData ? incomingCalibrationData.lat : 0,
            },
            {
              label: 'Height',
              elementType: 'input',
              elementConfig: {
                type: 'number',
              },
              value: incomingCalibrationData
                ? incomingCalibrationData.height
                : 0,
            },
            // {
            //   label: 'Adust Accuracy',
            //   showLabel: true,
            //   elementType: 'slider',
            //   elementConfig: {
            //     min: 1,
            //     max: 3,
            //     defaultValue: 1,
            //     step: 1,
            //     tipFormatter: value => `1/${Math.pow(10, value)/10}`,
            //     // defaultMin: 0,
            //     // defaultMax: 100,
            //     range: false
            //   },
            //   value: props.rotationStep,
            //   defaultValue: props.rotationStep,
            //   stepMultyplier: props.rotationMultiplier
            // },
            {
              label: 'Rotation',
              elementType: 'text',
            },
            {
              label: 'Rotate-X',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 0.1,
                // step: 1/props.rotationMultiplier
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
                step: 0.1,
                // step: 1/props.rotationMultiplier,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false,
              },
              // value: incomingCalibrationData ? incomingCalibrationData['rotate-x'] * props.stepMultiplier : 0 ,
              value: incomingCalibrationData
                ? (incomingCalibrationData['rotate-x'] -
                    initialCalibrationState['rotate-x']) *
                  props.rotationMultiplier
                : 0,
              defaultValue: initialCalibrationState
                ? initialCalibrationState['rotate-x']
                : 0,
              stepMultyplier: props.rotationMultiplier,
            },
            {
              label: 'Rotate-Y',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 0.1,
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
                defaultValue: incomingCalibrationData ? incomingCalibrationData['rotate-y'] : 0,
                step: 0.1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
              },
              value: incomingCalibrationData ?  (incomingCalibrationData['rotate-y'] - initialCalibrationState['rotate-y']) * props.rotationMultiplier : 0,
              defaultValue: initialCalibrationState ? initialCalibrationState['rotate-y'] : 0,
              stepMultyplier: props.rotationMultiplier
            },
            {
              label: 'Rotate-Z',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 0.1,
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
                defaultValue: incomingCalibrationData ? incomingCalibrationData['rotate-z'] : 0,
                step: 0.1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
              },
              value: incomingCalibrationData ?  (incomingCalibrationData['rotate-z'] - initialCalibrationState['rotate-z']) * props.rotationMultiplier : 0,
              defaultValue: initialCalibrationState ? initialCalibrationState['rotate-z'] : 0,
              stepMultyplier: props.rotationMultiplier
            },
          ],
        },
      };
    } else {
      actions = {
        models: {
          name: 'Models',
          iconName: 'cubes',
          show: true,
          actions: modelActions,
        },
        views: {
          name: 'Views',
          iconName: 'eye',
          show: true,
          actions: [
            {
              label: 'Top',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Bottom',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Left',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Right',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Front',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
            {
              label: 'Back',
              elementType: 'button',
              elementConfig: {},
              value: '',
              validation: {},
              valid: true,
            },
          ],
        },
        calibration: {
          name: 'Calibration',
          iconName: 'arrows-alt',
          show: props.selectedSubTask == 'Calibrate models',
          actions: [
            {
              label: 'Select entity',
              elementType: 'select',
              elementConfig: {
                options: props.models.map(model => ({text: model.name, value: model.name})),
              },
              value: props.selectedItem,
            },
            // {
            //   label: 'Adust Accuracy',
            //   showLabel: true,
            //   elementType: 'slider',
            //   elementConfig: {
            //     min: 1,
            //     max: 7,
            //     defaultValue: props.step,
            //     step: 1,
            //     tipFormatter: value => `1/${Math.pow(10, value)}`,
            //     // defaultMin: 0,
            //     // defaultMax: 100,
            //     range: false
            //   },
            //   value: props.step,
            //   defaultValue: props.step,
            //   stepMultyplier: props.multiplier
            // },
            {
              label: 'Position',
              elementType: 'text',
            },
            {
              label: 'Lon',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 1 / props.multiplier,
              },
              value: incomingCalibrationData ? incomingCalibrationData.lon : 0,
            },
            // {
            //   label: 'Lon',
            //   elementType: 'slider',
            //   elementConfig: {
            //     min: -50,
            //     max: 50,
            //     defaultValue: 0,
            //     step: 1,
            //     // defaultMin: 0,
            //     // defaultMax: 100,
            //     range: false
            //   },
            //   value: incomingCalibrationData ?  (incomingCalibrationData.lon - initialCalibrationCenter.lon) * props.multiplier : 0,
            //   defaultValue: initialCalibrationCenter ? initialCalibrationCenter.lon : 0,
            //   stepMultyplier: props.multiplier
            // },
            {
              label: 'Lat',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 1 / props.multiplier,
              },
              value: incomingCalibrationData ? incomingCalibrationData.lat : 0,
            },
            // {
            //   label: 'Lat',
            //   elementType: 'slider',
            //   elementConfig: {
            //     min: -50,
            //     max: 50,
            //     defaultValue: 0,
            //     step: 1,
            //     // defaultMin: 0,
            //     // defaultMax: 100,
            //     range: false
            //   },
            //   value: incomingCalibrationData ?  (incomingCalibrationData.lat - initialCalibrationCenter.lat) * props.multiplier : 0,
            //   defaultValue: initialCalibrationCenter ? initialCalibrationCenter.lat : 0,
            //   stepMultyplier: props.multiplier
            // },
            {
              label: 'Height',
              elementType: 'input',
              elementConfig: {
                type: 'number',
              },
              value: incomingCalibrationData
                ? incomingCalibrationData.height
                : 0,
            },
            // {
            //   label: 'Height',
            //   elementType: 'slider',
            //   elementConfig: {
            //     min: -99,
            //     max: 99,
            //     defaultValue:  initialCalibrationCenter ? initialCalibrationCenter.height : 0,
            //     step: 1,
            //     // defaultMin: 0,
            //     // defaultMax: 100,
            //     range: false
            //   },
            //   value: incomingCalibrationData ? incomingCalibrationData.height : 0,
            //   defaultValue: initialCalibrationCenter ? initialCalibrationCenter.height : 0,
            //   stepMultyplier: 1
            // },
            // {
            //   label: 'Select entity',
            //   elementType: 'select',
            //   elementConfig: {
            //     options: props.models.map(model => {
            //       return {text: model.name, value: model.name}
            //     })
            //   },
            //   value: props.selectedItem,

            // },
            // {
            //   label: 'Adust Accuracy',
            //   showLabel: true,
            //   elementType: 'slider',
            //   elementConfig: {
            //     min: 1,
            //     max: 3,
            //     defaultValue: 1,
            //     step: 1,
            //     tipFormatter: value => `1/${Math.pow(10, value)/10}`,
            //     // defaultMin: 0,
            //     // defaultMax: 100,
            //     range: false
            //   },
            //   value: props.rotationStep,
            //   defaultValue: props.rotationStep,
            //   stepMultyplier: props.rotationMultiplier
            // },
            {
              label: 'Rotation',
              elementType: 'text',
            },
            {
              label: 'Rotate-X',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 0.1,
              },
              value: incomingCalibrationData
                ? incomingCalibrationData['rotate-x']
                : 0,
            },
            {
              label: 'Rotate-X',
              elementType: 'slider',
              elementConfig: {
                min: -180,
                max: 180,
                defaultValue: 0,
                step: 0.1,
                // step: 0.1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false,
              },
              // value: incomingCalibrationData ? incomingCalibrationData['rotate-x'] * props.stepMultiplier : 0 ,
              value: incomingCalibrationData
                ? (incomingCalibrationData['rotate-x'] -
                    initialCalibrationCenter['rotate-x']) *
                  props.rotationMultiplier
                : 0,
              defaultValue: initialCalibrationCenter
                ? initialCalibrationCenter['rotate-x']
                : 0,
              stepMultyplier: props.rotationMultiplier,
            },
            {
              label: 'Rotate-Y',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 0.1,
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
                defaultValue: incomingCalibrationData ? incomingCalibrationData['rotate-y'] : 0,
                step: 0.1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
              },
              value: incomingCalibrationData ? incomingCalibrationData['rotate-y'] : 0 ,
              defaultValue: initialCalibrationCenter ? initialCalibrationCenter['rotate-y'] : 0,
              stepMultyplier: props.rotationMultiplier
            },
            {
              label: 'Rotate-Z',
              elementType: 'input',
              elementConfig: {
                type: 'number',
                step: 0.1,
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
                defaultValue: incomingCalibrationData ? incomingCalibrationData['rotate-z'] : 0,
                step: 0.1,
                // defaultMin: 0,
                // defaultMax: 100,
                range: false
              },
              value: incomingCalibrationData ? incomingCalibrationData['rotate-z'] : 0 ,
              defaultValue: initialCalibrationCenter ? initialCalibrationCenter['rotate-z'] : 0,
              stepMultyplier: props.rotationMultiplier
            },
          ],
        },
      };
    }
    return actions;
  };
  const updatedActionsMultipliers = actionGroups => {
    console.log('actionGroups', actionGroups);
    actionGroups.calibration.actions[1].value = props.step;
    actionGroups.calibration.actions[3].value = 0;
    actionGroups.calibration.actions[3].defaultValue =
      incomingCalibrationData.lon;
    actionGroups.calibration.actions[5].value = 0;
    actionGroups.calibration.actions[5].defaultValue =
      incomingCalibrationData.lat;
    actionGroups.calibration.actions[7].value = 0;
    actionGroups.calibration.actions[7].defaultValue =
      incomingCalibrationData.height;

    // actionGroups.calibration.actions[8].value = props.rotationStep;
    actionGroups.calibration.actions[4].value = 0;
    actionGroups.calibration.actions[5].defaultValue =
      incomingCalibrationData['rotate-x'];
    actionGroups.calibration.actions[6].value = 0;
    actionGroups.calibration.actions[7].defaultValue =
      incomingCalibrationData['rotate-y'];
    actionGroups.calibration.actions[8].value = 0;
    actionGroups.calibration.actions[9].defaultValue =
      incomingCalibrationData['rotate-z'];
    // console.log(actionGroups)
    return actionGroups;
  };
  // console.log('props.selectedSubTask', props.selectedSubTask)
  const actionGroups = useMemo(() => createActionGroups(), [
    props.calibrationData, props.selectedSubTask, props.selectedItem, initialCalibrationState
  ]);
  // console.log(props.mode)
  // actionGroups = useMemo(() => updatedActionsMultipliers(actionGroups), [
  //   props.step, props.rotationStep
  // ])
  // const handleIncomingData = useMemo(() => createActionGroups(), [incomingCalibrationData])
  // const actionGroups = createActionGroups()
  const sideActions = [
    // { label: 'draw circle', iconName: 'drafting-compass'},
    // { label: 'Mark area', iconName: 'pencil-alt'},
    // { label: 'Pan', iconName: 'hand-paper', active: props.panMode},
    {
      label: 'Add entities',
      iconName: 'map-pin',
      active: props.mode === 'Add entities',
    },
    {
      label: 'Measure line',
      iconName: 'ruler',
      active: props.mode === 'Measure line',
    },
    {
      label: 'Measure polyline',
      iconName: 'ruler-combined',
      active: props.mode === 'Measure polyline',
    },
    {
      label: 'Measure polygone',
      iconName: 'draw-polygon',
      active: props.mode === 'Measure polygone',
    },
    // { label: 'Show node info', iconName: 'info', active: props.quardinatesMode},
    // { label: 'Select node', iconName: 'pencil-ruler', active: props.selectNodeMode},
    {
      label: 'Show only selected',
      iconName: 'location-arrow',
      active: props.mode === 'Show only selected',
    },
    {
      label: 'Zoom to element',
      iconName: 'search-plus',
      active: props.mode === 'Zoom to element',
    },
    // { label: 'Select Multiple mode', iconName: props.mode === 'Select Multiple mode' ? 'check-double' : 'check', active: props.mode === 'Select Multiple mode'},
  ];

  const onActionGroupClick = actionGroupName => {
    console.log(actionGroupName)
    setActionGroup(actionGroupName);

    if (actionGroupName === actionGroup || actionGroup === '' || !open) {
      setOpen(!open);
    }
  };

  const onSideActionClick = actionName => {};

  const inputChangedHandler = (value, actionGroup, action) => {
    if (value !== null && value !== undefined) {
      switch (action.elementType) {
        case 'slider':
          switch (action.label) {
            case 'Lon':
              value = action.defaultValue + value / props.multiplier;
              break;
            case 'Lat':
              // console.log(action.defaultValue + value/props.multiplier)
              value = action.defaultValue + value / props.multiplier;
              break;
            case 'Rotate-X':
              // console.log(props.rotationMultiplier)
              value = action.defaultValue + value / props.rotationMultiplier;
              break;
            case 'Rotate-Y':
              // console.log(action.defaultValue + value/props.multiplier)
              value = action.defaultValue + value / props.rotationMultiplier;
              break;
            case 'Rotate-Z':
              // console.log(action.defaultValue + value/props.multiplier)
              value = action.defaultValue + value / props.rotationMultiplier;
              break;

            default:
              value = value;
              break;
          }

          break;

        default:
          break;
      }

      action.modelName
        ? props.onAction(value, actionGroup, action.label, action.modelName)
        : props.onAction(value, actionGroup, action.label);
    }
  };

  const topActionGroups = Object.keys(actionGroups).map(
    (actionGroup, index) => actionGroups[actionGroup].show && (
      <IconButtonToolTip
        key={index}
        className="resiumToolBar_tool p-1 active align-middle"
        iconName={actionGroups[actionGroup].iconName}
        toolTipType="info"
        toolTipPosition="bottom"
            toolTipEffect="float"
        toolTipText={actionGroups[actionGroup].name}
        onClickFunction={() => onActionGroupClick(actionGroups[actionGroup].name)}
      />)
      )

  const sideActionsHtml = sideActions.map((action, index) => (
    <IconButtonToolTip
    key={index}
    className="resiumToolBar_tool p-1 "
      key={index}
      iconName={action.iconName}
    iconClassName={action.active ? 'active' : ''}
    toolTipType="info"
      toolTipPosition="right"
    toolTipEffect="float"
      toolTipText={action.label}
    onClickFunction={(e) => inputChangedHandler(e, 'sideAction', action)}
  />)
  )

  const actionsHtml = actionGroups[actionGroup.toLowerCase()].actions.map(
    (action, index) => {
      // console.log(actionGroups.models.actions)
      // console.log(actions)
      switch (action.elementType) {
        case 'text':
          return (
            <h6 key={index} className="bold pt-2">
              {action.label}
            </h6>
          );
        case 'button':
          return (
            <MDBBtn
              className="resiumToolBar_action resiumToolBar_view_button p-1"
              key={index}
              onClick={() => inputChangedHandler(event, actionGroup, action)}>
              <MDBIcon icon='image' className='mr-1' />{action.label}
            </MDBBtn>
          );
        case 'select':
          // console.log(action.value)
          return (
            <MDBSelect
              key={index}
              className='toolBar_input background-white w-75 px-2 py-1'
              options={action.elementConfig.options}
          // label={action.label}
              selected={action.value}
              getValue={(event) => inputChangedHandler(event[0], actionGroup, action)}
        />
          );
        case 'checkbox':
          // console.log(action.value)
          return (
            <div
              key={index}
              className="toolBar_input d-flex justify-content-between align-items-center"
            >
              <Input
                label={action.label}
                elementtype="checkbox"
                value={action.value}
                changed={event =>
                  props.onAction(
                    action.value,
                    actionGroup,
                    'Show',
                    action.label,
                  )
                }
                // invalid={!formElement.config.valid}
                shouldValidate={false}
                touched={false}
                // errMsg={formElement.config.errMsg}
              />
              <IconButtonToolTip
                className="color-red"
                iconName="trash"
                toolTipType="error"
                toolTipPosition="left"
                toolTipEffect="float"
                toolTipText="Delete Model"
                onClickFunction={e =>
                  props.onAction(
                    action.value,
                    actionGroup,
                    'Delete',
                    action.label,
                    action.id,
                  )
                }
              />
            </div>
          );
        case 'slider':
          // console.log(action)
          return (
            <div className="p-1" key={index}>
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
          );

        default:
          return (
            <div
              key={index}
              className="d-flex justify-content align-item-middle resiumToolBar_action mb-1"
            >
              <label className="">{action.label}:</label>

              <input
                label={action.label}
                value={action.value}
                {...action.elementConfig}
                onChange={event =>
                  inputChangedHandler(
                    parseFloat(event.target.value),
                    actionGroup,
                    action,
                  )
                }
                className=""
              />
            </div>
          );

        // <MDBInput
        //           label={action.label}
        //           value={action.value}
        //           type="number"
        //           // step='0.00001'
        //           onChange={(event) => inputChangedHandler(parseFloat(event.target.value), actionGroup, action)}
        //           className=""
        //           />
      }
    },
  );

  const reset = () => {
    props.onAction(value, actionGroup, action.label.toLowerCase());
  };
  const animationTimings = {
    enter: 1000,
    exit: 500,
  };
  const showButtons = actionGroup.toLowerCase() !== 'views';
  // console.log(props.selectedSubTask)
  // console.log(props.selectedSubTask && props.selectedSubTask.name !== 'Calibrate models')
  return (
    <div className={`resiumToolBar_${props.position}`}>
      <div className="resiumToolBar_corner bgPrimaryFaded1">
        <IconButtonToolTip
          iconName="globe"
          toolTipType="info"
          toolTipPosition="right"
          toolTipEffect="float"
          toolTipText="Reset view"
          onClickFunction={(e) => props.onAction('ResetView', 'ResetView', 'ResetView')}
        />
      </div>
      <div className="resiumToolBar_topBar bgPrimaryFaded1 d-flex ">
        {initialCalibrationState && topActionGroups}
      </div>

      <div className="resiumToolBar_sideBar bgPrimaryFaded1">
        {sideActionsHtml}
      </div>

      <CSSTransition
        in={open}
        timeout={400}
        mountOnEnter
        unmountOnExit
        // classNames="boxAnimation_1_top"
        classNames={{
          enter: 'hide-content',
          enterActive: 'boxAnimation_1_top-enter-active',
          exit: 'hide-content',
          exitActive: 'boxAnimation_1_top-exit-active',
          // appear: 'hide-content',
          // appearActive: 'boxAnimation_1_top-exit-active'
        }}
      >
        <div className="resiumToolBar_actionsWrapper">
          <IconButtonToolTip
            // key={index}
            className="resiumToolBar_tool p-1 align-middle text-center float-right mt-1"
            iconName={locked ? 'lock-open' : 'lock'}
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText={locked ? 'Unlock menu' : 'Lock menu'}
            onClickFunction={() => setLocked(!locked)}
          />
          {actionGroups && (actionsHtml)}

          {showButtons && (
            <>
              <MDBBtn
                color="dark-green"
                size="sm"
                onClick={() => props.reset(actionGroup)}
              >
                Reset
              </MDBBtn>
              <MDBBtn
                color="primary"
                size="sm"
                onClick={() => props.save(actionGroup)}
                // disabled={
                //   !props.selectedSubTask ||
                //   (props.selectedSubTask &&
                //     props.selectedSubTask.name !== 'Calibrate models')}
                >Save
                </MDBBtn>
 
              {actionGroup == 'Calibration' && <MDBBtn
                color="danger"
                size="sm"
                className="saveViewButton"
                onClick={() => props.saveView()}
              >
                Save View
              </MDBBtn>}
            </>

           )
          }
            
          </div>
        </CSSTransition>
    </div>
          
    );
};

export default memo(ResiumToolBar);
