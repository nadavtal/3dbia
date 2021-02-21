import React, { Component, memo } from 'react';
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
import DateField from '../../components/DateField/DateField';
import TextSearch from '../../components/TextSearch/TextSearch';
import DataComponent from '../../components/DataComponent/DataComponent'
import Tree from '../../components/Tree/Tree'
import './AccordionTable.css'
import DataTable from '../../components/DataTable/DataTable';
import { isDueDatePassed } from '../../utils/dateTimeUtils';
import Form from '../Forms/Form';
import NodeRow from '../BridgeModul/NodeRow/NodeRow'
import { updateResiumMode } from '../Resium/actions'

class AccordionComponent extends Component {
  state = {
    collapseID: `collapse${this.props.selectedObjectIds ? this.props.selectedObjectIds[0] : ''}`,
    showForm: false
  };

  toggleCollapse = (collapseID) => {
    // console.log(collapseID)
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));
  }

  calculateAverage = (rows) => {
    let sum = 0
    rows.map(row => sum += row.completed)
    let avg = sum/rows.length
    return avg
  }
  componentDidMount = () => {
    //access to array, containing <div>test</div><div>test</div>
    // console.log(this.props);
    //would log childtext, because I am grabbing the child of the first <div> in the array
    // console.log(this.props.children[1].props.children);
  }

  handleTitleClick = (data, active, selectMultuple) => {
    const { collapseID } = this.state
//!active && collapseID !== `collapse${data}` ?
    this.toggleCollapse(`collapse${data}`);
    if (this.props.onTitleClick) {
      console.log(`collapse${data}`, collapseID)
      // if (`collapse${data}` !== collapseID)
      this.props.onTitleClick(data, selectMultuple)
    }
    else if (this.props.onRowClick) this.props.onRowClick(data, selectMultuple)
  }

  render() {
    // console.log('ACCORDION RENDER', this.props)
    const { collapseID } = this.state;
    switch (this.props.dataType) {
      case 'processes':
        return (
          <div className='accordion md-accordion accordion-1'>
            {this.props.data.map((item, index) => {
              // console.log(item)
              let imageUrl = null
              if (this.props.bridges) {
                imageUrl = this.props.bridges.filter(bridge => bridge.bid === item.bid)[0].image_url;
                // console.log(imageUrl)
              }
              const itemRows = this.props.rows.filter(row => item.id === row.process_id)
              itemRows.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.due_date) - new Date(b.due_date);
              });
              const avg = this.calculateAverage(itemRows);
              // console.log(avg)
              return (
                <MDBCard key={index} style={{ backgroundColor: 'transparent' }}>
                  <MDBCollapseHeader
                    onClick={() => this.handleTitleClick(item.bid ? item.bid : item.id, index)}
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
                          this.state.collapseID === `collapse${index+1}`
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
                                          getValue={(event) => this.props.changeDate(task, event)}
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
                                              <input type="number" onChange={(e) => this.props.changePercentage(task, e.target.value)}/>

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
                                        getValue={(event) => this.props.changeDate(task, event)}
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
                                              onClick={(value) => this.props.changePercentage(task, value)}
                                              >Change</MDBBtn> */}
                                          </MDBPopoverHeader>
                                          <MDBPopoverBody>
                                            <input type="number" onChange={(e) => this.props.changePercentage(task, e.target.value)}/>

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
            {this.props.data.map((item, index) => {
              const itemRows = this.props.rows.filter(row => item.id === row.span_id)
              // console.log(collapseID, `collapse${index+1}`)
              return (
                <MDBCard key={index} style={{ backgroundColor: 'transparent' }}>
                  <MDBCollapseHeader
                    onClick={() => this.handleTitleClick(itemRows, index, true)}

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
                          this.state.collapseID === `collapse${index+1}`
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
                    checked={this.state.showForm}
                    onChange={() => this.setState({...this.state, showForm: !this.state.showForm})}
                    labelLeft=""
                    labelRight={`${this.state.showForm ? 'Span info' : 'Elements info'}`}
                    />

                     {this.state.showForm && collapseID == `collapse${index+1}` ?

                      <Form
                      formType="spansForm"
                      editMode="save"
                      colWidth={12}
                      nodes={this.props.rows}
                      structureTypes={this.props.structureTypes}
                      item={item}
                      editFunction={formData => {
                        formData.id = item.id
                        this.props.saveSpan(formData)
                        }
                      }
                      />
                      :
                      <div className="accordion-child">
                        {this.props.children}

                      </div>
                      // itemRows.map((element, index) => {
                      //   const isDone = false;
                      //   // console.log(isPast)
                      //   return (
                      //     <NodeRow
                      //       element={element}
                      //       key={element.object_id}
                      //       onClick={() => this.props.onRowClick(parseInt(element.object_id))}
                      //       editFunction={(objectId) => this.props.showInMainView(objectId)}
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
        // console.log(this.props)
        return (
          <div className='accordion md-accordion accordion-1'>
            {this.props.data.map((item, index) => {
              const element = this.props.rows.find(el => el.object_id == item.object_id);
              const active = this.props.selectedObjectIds.includes(parseInt(item.object_id))
              return (
                <MDBCard key={index} style={{ backgroundColor: 'transparent' }}>
                  <MDBCollapseHeader
                    // onClick={() => this.handleTitleClick(item.object_id, index)}
                    // className={`${this.props.selectedObjectIds.includes(item.object_id) ? 'lighten-3' : 'lighten-4'} blue z-depth-1`}
                    className={`${active ? 'lighten-3' : 'lighten-4'} ${this.props.color} z-depth-1`}
                  >
                    <MDBRow className="no-gutters accordionTitleRow">
                      <MDBCol md='2'>
                        {this.props.checkBox && <MDBInput
                                                  className="accordionCheckBox"
                                                  type="checkbox"
                                                  checked={active}
                                                  id={`accordionCheckBox${index}`}
                                                  onChange={(e) => this.props.onTitleClick ? this.props.onTitleClick(parseInt(item.object_id), true) : this.props.onRowClick(item.object_id, true)}
                                                  // onInput={(e) => console.log(e)}
                                                  />}
                        <span className={`text-${this.props.textColor}`}>
                          {item.object_id}:
                        </span>
                      </MDBCol>
                      <MDBCol md='9' onClick={() => this.handleTitleClick(parseInt(item.object_id), active, false)}>
                        <span className={`text-${this.props.textColor}`}>
                          {item.name}
                        </span>


                      </MDBCol>

                      <MDBCol md='1' onClick={() => this.handleTitleClick(parseInt(item.object_id), active, false)}>
                        <MDBIcon
                        icon={
                          this.state.collapseID === `collapse${index+1}`
                            ? "angle-up"
                            : "angle-down"
                          }
                          className={`text-${this.props.textColor}`}
                          style={{ float: "right" }}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCollapseHeader>

                  <MDBCollapse id={`collapse${item.object_id}`} isOpen={collapseID}>
                    {/* <MDBCardBody> */}
                    {`collapse${item.object_id}` == collapseID && <>
                      <NodeRow
                        className="my-1"
                        element={element}
                        key={element.object_id}
                        onClick={() => console.log(element.object_id)}
                        editFunction={(objectId) => this.props.editElement(objectId)}
                        showId={false}
                      />
                      <DataComponent data={element}/>
                    </>}


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
}

export default memo(AccordionComponent);
