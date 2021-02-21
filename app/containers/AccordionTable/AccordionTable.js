import React, { Component, memo, useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBCollapse,
  MDBCard,
  MDBDatePicker,
  MDBCollapseHeader,
  MDBCardImage,
  MDBRow,
  MDBView,
  MDBProgress,
  MDBIcon,
  MDBStepper,
  MDBStep,
  MDBSimpleChart,
  MDBPopover, MDBPopoverBody, MDBPopoverHeader,
  MDBSwitch,
  MDBInput
} from 'mdbreact';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip'
import DateField from '../../components/DateField/DateField';
import TextSearch from '../../components/TextSearch/TextSearch';
import DataComponent from '../../components/DataComponent/DataComponent'
import Tree from '../../components/Tree/Tree'
import './AccordionTable.css'
import DataTable from '../../components/DataTable/DataTable';
import { isDueDatePassed } from 'utils/dateTimeUtils';
import Form from '../Forms/Form';
import NodeRow from '../BridgeModul/NodeRow/NodeRow'
import { updateResiumMode } from '../Resium/actions'

const AccordionComponent = (props) => {
  // console.log('AccordionComponent' , props)
  const [collapseID, setCollapseID] = useState('');
  useEffect(() => {
    // setCollapseID(props.selectedObjectIds && props.selectedObjectIds[0] ? props.selectedObjectIds[0] : '')
    return () => {

    };
  }, [props.selectedObjectIds])

  const calculateAverage = (rows) => {
    let sum = 0
    rows.map(row => sum += row.completed)
    let avg = sum/rows.length
    return avg
  }

  const caculateCompletedPercentage = (el) => {
    const keysNum = Object.keys(el).length
    let completed = 0;
    let avg
    for (const key of Object.keys(el)) {
      if(el[key]) completed++
    }
    avg = Math.ceil(completed/keysNum*100)
    return avg
  }
  
  const collapse = (id) => {
    if (id !== collapseID) setCollapseID(id)
    else setCollapseID('')
  }
  const handleTitleClick = (item) => {
    // console.log(item, collapseID)

    // if (item !== collapseID) setCollapseID(item)
    // else setCollapseID('')
    if (props.onTitleClick) {
      // if (`collapse${item}` !== collapseID)
      props.onTitleClick(item)
    } else {
      if (props.onRowClick) props.onRowClick(item) 
    }
  }

  switch (props.dataType) {
    case 'processes':
      return (
        <div className='accordion md-accordion accordion-1'>
          {props.data.map((item, index) => {
            // console.log(item)
            let imageUrl = null
            if (props.bridges) {
              imageUrl = props.bridges.filter(bridge => bridge.bid === item.bid)[0].image_url;
              // console.log(imageUrl)
            }
            const itemRows = props.rows.filter(row => item.id === row.process_id)
            itemRows.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.due_date) - new Date(b.due_date);
            });
            const avg = calculateAverage(itemRows);
            // console.log(avg)
            return (
              <MDBCard key={index} style={{ backgroundColor: 'transparent' }}>
                <MDBCollapseHeader
                  onClick={() => collapse(item.id)}
                  className='blue lighten-3 z-depth-1'
                >
                  <MDBRow className="no-gutters">
                    <MDBCol md='8'>
                      <span className='white-text font-weight-bold text-uppercase'>
                        {item.name}:
                      </span>
                      <span className='ml-2 white-text'>
                        {item.process_name}
                      </span>
                      <span className='ml-2 white-text'>
                         {item.provider_name ? item.provider_name : ''}
                      </span>
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBProgress material  value={avg} className="my-2" >{avg}%</MDBProgress>
                    </MDBCol>
                    <MDBCol md='1'>
                      <MDBIcon
                      icon={
                        collapseID === `collapse${index+1}`
                          ? "angle-up"
                          : "angle-down"
                        }
                        className="white-text"
                        style={{ float: "right" }}
                      />
                    </MDBCol>
                  </MDBRow>



                </MDBCollapseHeader>
                <MDBCollapse id={`collapse${item.id}`} isOpen={`collapse${collapseID}`}>
                  {/* <MDBCardBody> */}
                    { imageUrl ?
                    <MDBRow className='my-4 no-gutters'>
                        <MDBCol md='8'>
                          <MDBStepper vertical className="m-0 p-0">
                            {itemRows.map((task, index) => {
                              // console.log(task)
                              const isPast = isDueDatePassed(task.due_date);
                              // console.log(isPast)
                              return (
                                <MDBStep
                                  key={index}
                                  className={task.completed !== 100 && isPast ? 'warning' : 'completed'}>
                                  <MDBRow className="fullWidth">
                                    <MDBCol md='8'>
                                      <a className="mt-2">
                                        <span className="circle">
                                          {task.completed !== 100 && isPast ?
                                            <MDBIcon icon="exclamation-triangle" />
                                            : index + 1}

                                          </span>
                                        <span className="label">{task.name}</span>

                                      </a>

                                    </MDBCol>
                                    <MDBCol md='3'>
                                      <MDBDatePicker
                                        getValue={(event) => props.changeDate(task, event)}
                                        // emptyLabel={action.name}
                                        className="float-right"
                                        value ={task.due_date}/>

                                      {/* <DateField
                                        date={task.due_date}
                                        className="float-right mt-3"/> */}

                                    </MDBCol>
                                    <MDBCol md='1'>
                                      <MDBPopover
                                        placement="left"
                                        popover
                                        clickable
                                        id="popper4"
                                      >
                                        <MDBBtn flat className="percentageButton">
                                          <MDBSimpleChart
                                              strokeColor={task.completed == 100 ? 'green' : 'red'}
                                              strokeWidth={3}
                                              width={50}
                                              height={50}
                                              percent={task.completed}
                                              labelFontWeight='normal'
                                              labelFontSize="13"
                                              labelColor={task.completed !== 100 && isPast ? 'red' : 'green'}
                                              // railColor={'blue'}
                                            />

                                        </MDBBtn>
                                        <div>
                                          <MDBPopoverHeader>
                                            Change percentage

                                          </MDBPopoverHeader>
                                          <MDBPopoverBody>
                                            <input type="number" onChange={(e) => props.changePercentage(task, e.target.value)}/>

                                          </MDBPopoverBody>
                                        </div>
                                      </MDBPopover>
                                      {/* <MDBIcon
                                          icon={
                                            task.completed !== 100 && isPast
                                              ? "exclamation"
                                              : "check"
                                            }
                                            className="red"
                                            style={{ float: "right" }}
                                          /> */}
                                      {/* <div onClick={() => console.log(task)}>
                                        <MDBSimpleChart
                                              strokeColor='red'
                                              strokeWidth={3}
                                              width={55}
                                              height={55}
                                              percent={task.completed}
                                              labelFontWeight='normal'

                                            />

                                      </div> */}
                                    </MDBCol>
                                  </MDBRow>

                                </MDBStep>

                              )
                            })}
                          </MDBStepper>
                        </MDBCol>
                        <MDBCol md='4' className='mt-3 pt-2'>
                          <MDBView className='z-depth-1'>
                            <MDBCardImage
                              className='img-fluid z-depth-1'
                              src={imageUrl.length > 0 ? require('../../images/'+imageUrl) : require('../../images/LOGIN.jpg')}
                              alt=''
                            />
                          </MDBView>
                        </MDBCol>

                    </MDBRow>
                      :
                    <MDBRow className='my-4 no-gutters'>
                      <MDBCol md='12'>
                        <MDBStepper vertical className="m-0 p-0">
                          {itemRows.map((task, index) => {
                            // console.log(task)
                            const isPast = isDueDatePassed(task.due_date);
                            // console.log(isPast)
                            return (
                              <MDBStep
                                className={task.completed !== 100 && isPast ? 'warning' : 'completed'}
                                key={index}>
                                <MDBRow className="fullWidth">
                                  <MDBCol md='7'>
                                    <a className="mt-2">
                                      <span className="circle">
                                        {task.completed !== 100 && isPast ?
                                          <MDBIcon icon="exclamation-triangle" />
                                          : index + 1}

                                        </span>
                                      <span className="label">{task.name}</span>

                                    </a>

                                  </MDBCol>
                                  <MDBCol md='3'>
                                    <MDBDatePicker
                                      getValue={(event) => props.changeDate(task, event)}
                                      // emptyLabel={action.name}
                                      className="float-right"
                                      value ={task.due_date}/>

                                    {/* <DateField
                                      date={task.due_date}
                                      className="float-right mt-3"/> */}

                                  </MDBCol>
                                  <MDBCol md='2'>
                                    <MDBPopover
                                      placement="left"
                                      popover
                                      clickable
                                      id="popper4"
                                    >
                                      <MDBBtn flat className="percentageButton">
                                        <MDBSimpleChart
                                            strokeColor={task.completed == 100 ? 'green' : 'red'}
                                            strokeWidth={3}
                                            width={50}
                                            height={50}
                                            percent={task.completed}
                                            labelFontWeight='normal'
                                            labelFontSize="13"
                                            labelColor={task.completed !== 100 && isPast ? 'red' : 'green'}
                                            // railColor={'blue'}
                                          />

                                      </MDBBtn>
                                      <div>
                                        <MDBPopoverHeader>
                                          Change percentage
                                          {/* <MDBBtn size="sm" className="percentageButton"
                                            onClick={(value) => props.changePercentage(task, value)}
                                            >Change</MDBBtn> */}
                                        </MDBPopoverHeader>
                                        <MDBPopoverBody>
                                          <input type="number" onChange={(e) => props.changePercentage(task, e.target.value)}/>

                                        </MDBPopoverBody>
                                      </div>
                                    </MDBPopover>
                                    {/* <MDBIcon
                                        icon={
                                          task.completed !== 100 && isPast
                                            ? "exclamation"
                                            : "check"
                                          }
                                          className="red"
                                          style={{ float: "right" }}
                                        /> */}
                                    {/* <div onClick={() => console.log(task)}>
                                      <MDBSimpleChart
                                            strokeColor='red'
                                            strokeWidth={3}
                                            width={55}
                                            height={55}
                                            percent={task.completed}
                                            labelFontWeight='normal'

                                          />

                                    </div> */}
                                  </MDBCol>
                                </MDBRow>

                              </MDBStep>

                            )
                          })}
                        </MDBStepper>
                      </MDBCol>

                    </MDBRow>
                    }
                  {/* </MDBCardBody> */}
                </MDBCollapse>
              </MDBCard>

            )
          })}
        </div>
      );
    case 'spans':

      return (
        <div className='accordion md-accordion accordion-1'>
          {props.data.map((item, index) => {
            const itemRows = props.rows.filter(row => item.id === row.span_id)
            // console.log(collapseID, `collapse${index+1}`)
            return (
              <MDBCard key={index} style={{ backgroundColor: 'transparent' }}>
                <MDBCollapseHeader
                  onClick={() => handleTitleClick(itemRows)}

                  className='blue lighten-3 z-depth-1'
                >
                  <MDBRow className="no-gutters">
                    <MDBCol md='4'>
                      <span className='white-text font-weight-bold text-uppercase'>
                        {item.name}:
                      </span>


                    </MDBCol>
                    <MDBCol md='7'>
                      {/* <MDBProgress material  value={avg} className="my-2" >{avg}%</MDBProgress> */}

                    </MDBCol>
                    <MDBCol md='1'>
                      <MDBIcon
                      icon={
                        collapseID === `collapse${index+1}`
                          ? "angle-up"
                          : "angle-down"
                        }
                        className="white-text"
                        style={{ float: "right" }}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCollapseHeader>
                <MDBCollapse id={`collapse${index+1}`} isOpen={collapseID}>
                <MDBSwitch
                  className="mt-1"
                  checked={showForm}
                  onChange={() => setShowForm(!showForm)}
                  labelLeft=""
                  labelRight={`${showForm ? 'Span info' : 'Elements info'}`}
                  />

                   {showForm && collapseID == `collapse${index+1}` ?

                    <Form
                    formType="spansForm"
                    editMode="save"
                    colWidth={12}
                    nodes={props.rows}
                    structureTypes={props.structureTypes}
                    item={item}
                    editFunction={formData => {
                      formData.id = item.id
                      props.saveSpan(formData)
                      }
                    }
                    />
                    :
                    <div className="accordion-child">
                      {props.children}

                    </div>
                    // itemRows.map((element, index) => {
                    //   const isDone = false;
                    //   // console.log(isPast)
                    //   return (
                    //     <NodeRow
                    //       element={element}
                    //       key={element.object_id}
                    //       onClick={() => props.onRowClick(element.objectid))}
                    //       editFunction={(objectId) => props.showInMainView(objectId)}
                    //       showId={true}/>
                    //   )
                    // })
                  }

                </MDBCollapse>
              </MDBCard>

            )
          })}
        </div>

      )
    case 'nodes':
      // console.log(props)
      return (
        <div className='accordion md-accordion accordion-1'>
          {props.data.map((item, index) => {
            const element = props.rows.find(el => el.object_id == item.object_id);
            // console.log(element)
            let hasDefaultViewData = false
            if(element.default_view_data && element.default_view_data !== 'null' && element.default_view_data !== 'undefined')
            hasDefaultViewData = true
            const active = props.selectedObjectIds.includes(item.object_id)
            const avg = caculateCompletedPercentage(element)
            // console.log(collapseID)
            return (
              <MDBCard
                key={index}
                id={item.object_id}
                style={{ backgroundColor: 'transparent' }}
              >
                <MDBCollapseHeader
                  // onClick={() => handleTitleClick(item.object_id, index)}
                  // className={`${props.selectedObjectIds.includes(item.object_id) ? 'lighten-3' : 'lighten-4'} blue z-depth-1`}
                  className={`transitioned z-depth-1 ${
                    active ? 'color-white bgPrimaryFaded5' : ''
                  } ${props.className}`}
                >
                  <MDBRow className="no-gutters accordionTitleRow fontSmall">
                    <MDBCol md="1">
                      {props.checkBox && (
                        <MDBInput
                          className="accordionCheckBox"
                          type="checkbox"
                          checked={active}
                          id={`accordionCheckBox${index}`}
                          onChange={e =>
                            props.onTitleClick
                              ? props.onTitleClick(item)
                              : props.onRowClick(item)
                          }
                          // onInput={(e) => console.log(e)}
                        />
                      )}
                    </MDBCol>
                    <MDBCol
                      md="7"
                      onClick={() => handleTitleClick(item)}
                    >
                      <span className={`text-${props.textColor}`}>
                        {item.name}
                      </span>
                    </MDBCol>
                    <MDBCol
                      md="1"
                      onClick={() => handleTitleClick(item)}
                    >
                      <MDBSimpleChart
                        strokeColor={avg == 100 ? 'green' : 'red'}
                        strokeWidth={1}
                        width={22}
                        height={22}
                        percent={avg}
                        labelFontWeight="normal"
                        labelFontSize="8"
                        labelColor={avg !== 100 ? 'red' : 'green'}
                      />
                    </MDBCol>

                    <MDBCol md="3">
                      <MDBIcon
                        icon={
                          collapseID === item.object_id
                            ? 'angle-up'
                            : 'angle-down'
                        }
                        onClick={() => {
                          collapse(item.object_id);
                          // handleTitleClick(
                          //   +item.object_id
                          // )
                        }}
                        className={`text-${props.textColor}`}
                        style={{ float: 'right' }}
                      />
                      <IconButtonToolTip
                        className=""
                        iconClassName={`text-${
                          props.textColor
                        } mx-1 float-right`}
                        size="sm"
                        iconName="edit"
                        toolTipType="info"
                        toolTipPosition="bottom"
                        toolTipEffect="float"
                        toolTipText="Edit element"
                        onClickFunction={() =>
                          props.editElement(item.object_id)
                        }
                      />
    
                      <IconButtonToolTip
                        className={(!item.default_view_data || item.default_view_data == 'null') && 'disabled'}
                        iconClassName={`text-${
                          props.textColor
                        } mx-1 float-right`}
                        size="sm"
                        iconName="crosshairs"
                        toolTipType="info"
                        toolTipPosition="bottom"
                        toolTipEffect="float"
                        toolTipText="Zoom"
                        onClickFunction={() =>
                          props.zoomToElement(
                            item.object_id,
                          )
                        }
                      />
                      {/* <IconButtonToolTip
                        className=""
                        iconClassName={`text-${
                          props.textColor
                        } mx-1 float-right ${
                          hasDefaultViewData ? '' : 'faded'
                        }`}
                        size="sm"
                        iconName="crosshairs"
                        // toolTipType={`${hasDefaultViewData ? 'info' : 'error'}`}
                        toolTipType="info"
                        toolTipPosition="bottom"
                        toolTipEffect="float"
                        toolTipText="Zoom to element"
                        onClickFunction={() =>
                          props.zoomToElement(
                            item.default_view_data,
                          )
                        }
                      /> */}
                      {/* <MDBIcon
                        icon='edit'
                        className={`text-${props.textColor} mx-1`}
                        style={{ float: 'right' }}
                        onClick={() => props.editElement(+item.object_id)}
                      /> */}
                      {/* {console.log(hasDefaultViewData)} */}
                      {/* <MDBIcon
                        icon='crosshairs'
                        className={`text-${props.textColor} mx-1 ${hasDefaultViewData ? '' : 'faded'}`}
                        style={{ float: 'right' }}
                        onClick={() => props.editElement(+item.object_id)}
                      /> */}
                    </MDBCol>
                  </MDBRow>
                </MDBCollapseHeader>
                <MDBCollapse
                  className="pt-2"
                  id={`collapse${item.object_id}`}
                  isOpen={`collapse${collapseID}`}
                >
                  <DataComponent data={element} />
                </MDBCollapse>
              </MDBCard>
            );
          })}
        </div>

      )
    case 'models':
      // console.log(props)
      return (
        <div className='accordion md-accordion accordion-1'>
          {props.data.map((item, index) => {
            
            const active = true
            return (
              <MDBCard key={index} style={{ backgroundColor: 'transparent' }}>
                <MDBCollapseHeader
                  
                  // className={`${props.selectedObjectIds.includes(item.object_id) ? 'lighten-3' : 'lighten-4'} blue z-depth-1`}
                  className={`${active ? 'lighten-3' : 'lighten-4'} ${props.className} z-depth-1 p-1`}
                >
                  <MDBRow className="accordionTitleRow no-gutters">
                    <MDBCol md='1' >
                      <IconButtonToolTip
                        className=""
                        iconClassName={`text-${props.textColor}`}
                        size="sm"
                        iconName="crosshairs"
                        toolTipType="info"
                        toolTipPosition="right"
                        toolTipEffect="float"
                        toolTipText={`View model`}
                        onClickFunction={() => handleTitleClick(item.name)}
                      />
                      
                    </MDBCol>
                    <MDBCol md='8' onClick={() => {
                      // handleTitleClick(item.name)
                      collapse(+item.id)
                    
                      }
                    }
                    >
                      <span className={`text-${props.textColor}`}>
                        {item.name}
                      </span>

                    </MDBCol>

                    <MDBCol md='1' >
                      <IconButtonToolTip
                        className="text-center"
                        iconClassName={`text-danger`}
                        size="sm"
                        iconName="trash-alt"
                        toolTipType="error"
                        toolTipPosition="left"
                        toolTipEffect="float"
                        toolTipText={`Delete model`}
                        onClickFunction={() => props.toggleAlert('delete')}
                      />
                      
                    </MDBCol>
                    <MDBCol md='1' >
                      <IconButtonToolTip
                        className=""
                        iconClassName={`text-${props.textColor}`}
                        size="sm"
                        iconName="edit"
                        toolTipType="info"
                        toolTipPosition="left"
                        toolTipEffect="float"
                        toolTipText={`Edit model info`}
                        onClickFunction={() => props.toggleModal('editModel', item.id)}
                      />
                      
                    </MDBCol>
                    
                    <MDBCol md='1' 
                      className="text-center"
                      >
                      <MDBIcon
                        onClick={() => {
                          // handleTitleClick(+item.id)
                          collapse(+item.id)
                        
                          }
                        }
                        icon={
                          collapseID === item.id
                            ? "angle-up"
                            : "angle-down"
                          }
                        className={`text-${props.textColor} float-right mt-1 mr-1`}
                        // style={{ float: "right" }}
                        size="sm"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCollapseHeader>
                <MDBCollapse id={`collapse${item.id}`} isOpen={`collapse${collapseID}`}>
                  {/* <MDBCardBody> */}
                  
                  <DataComponent data={item} className="mt-2"/>
                 


                  {/* </MDBCardBody> */}
                </MDBCollapse>
              </MDBCard>

            )
          })}
        </div>

      )
    default:
      break;
  }



}

export default memo(AccordionComponent);
