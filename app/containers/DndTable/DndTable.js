import React, { useState, memo, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError,makeSelectUsers, makeSelectRoleTypes} from 'containers/App/selectors';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import Input from '../../components/Input/Input'
import Form from '../Forms/Form';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
// import type { Quote as QuoteType } from "../types";



const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const orderChanged = (quote, index) => {
  // console.log(quote, index)
  if (quote.task_order == index) return false;
  else return true
}

const QuoteItem = styled.div`
  // width: 200px;
  display: flex;
  border-bottom: 1px solid grey;
  margin-bottom: ${grid}px;
  // background-color: lightblue;
  padding: 10px;
`;

function sortByTaskOrder( a, b ) {
  if ( a.task_order < b.task_order ){
    return -1;
  }
  if ( a.task_order > b.task_order ){
    return 1;
  }
  return 0;
}



function DND(props) {
  console.log('DND INITIALIZED', props);
  const initial2 = props.quotes.map((quote, index) => {
    const custom = {
      id: `id-${index}`,
      content: `Quote ${quote.task_name}`
    };

    return custom;

  });

  const [state, setState] = useState({ quotes: [] });
  // props.quotes.sort( sortByTaskOrder );
  useEffect(() => {
    console.log('[props.quotes changed]', state.quotes)
    setState({quotes: props.quotes.sort( sortByTaskOrder )})
  }, [props.quotes]);

  // const taskRow

  function Quote({ quote, index }) {
    quote.orderChanged = orderChanged(quote, index)
    console.log(quote)

    return (
      <Draggable draggableId={`id-${index}`} index={index}>
        {provided => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <MDBRow className="fullWidth">
              <MDBCol md="3" className="d-flex">
                <h6 className="mr-3">{index+1}</h6>
                <h6 className="mr-3">{quote.task_name}</h6>
              </MDBCol>

              <MDBCol md="4">
                <h6 className="mr-3">{quote.task_description}</h6>

              </MDBCol>
              <MDBCol md="2">
                <h6 className="mr-3">{quote.role_type_name}</h6>

              </MDBCol>
              <MDBCol md="2">
                <h6 className="mr-3">{quote.task_def_status}</h6>

              </MDBCol>
              <MDBCol md="1" className="d-flex justify-content-between">
                 <IconButtonToolTip iconName="edit"
                    toolTipType="info"
                    toolTipPosition="left"
                    toolTipEffect="float"
                    toolTipText='Edit task'
                    onClickFunction={() => props.toggleModal('editTask', quote)}
                  />
                 <IconButtonToolTip iconName="trash-alt"
                    toolTipType="info"
                    toolTipPosition="left"
                    toolTipEffect="float"
                    toolTipText='Delete task'
                    onClickFunction={() => removeTask(index)}
                  />

              </MDBCol>
            </MDBRow>

            {/* <Form
              formType="processTemaplateTaskForm"
              editMode="Save"
              colWidth="3"
              btnColor="success"
              item={quote}
              editFunction={(data) => props.updateQuote(data, quote, index)}
            /> */}
            {/* <IconButtonToolTip iconName="trash-alt"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText='Delete task'
              onClickFunction={() => removeTask(index)}
            /> */}

            {/* <Input
              key={quote.task_name}
              label="Task name"
              value={quote.task_name}
              changed={(e) => inputChangedHandler(e, index, 'task_name')}
              />
            <Input
              label="Task Description"
              value={quote.task_description}
              elementconfig={{type: "text", placeholder: 'Task Description'}}
              changed={(e) => inputChangedHandler(e, index, 'task_description')}
              />
            <Input
              label="Role type"
              value={quote.role_type_name}
              elementtype="select"
              elementconfig={{options: props.roleTypes,  optionValueAttr: 'name',}}
              changed={(e) => inputChangedHandler(e, index, 'role_type_name')}
              />
            <Input
              label="Task Default status"
              value={quote.task_def_status}
              elementconfig={{type: "text", placeholder: 'Task Default status'}}
              changed={(e) => inputChangedHandler(e, index, 'task_def_status')}
              />

            <MDBBtn color="success"
              onClick={() => props.updateQuote(index, quote)}>
              <MDBIcon icon="save" className="mr-1" />
              Save
            </MDBBtn>
            <MDBBtn color="danger"
              onClick={() => removeTask(index)}>
              <MDBIcon icon="trash-alt" className="mr-1" />
            </MDBBtn> */}

          </QuoteItem>
        )}
      </Draggable>
    );
  }

  const QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => {

      return <Quote quote={quote} index={index} key={index} />
    });
  });




  const inputChangedHandler = (event, index, inputIdentifier) => {
    console.log(event, index)
    // clone 1st order
    const updatedQuotes = [...state.quotes]

    //clone 2st order
    const updatedQuotesElement = {
      ...updatedQuotes[index]
    }
    updatedQuotesElement[inputIdentifier] = event.target.value;
    // console.log(updatedQuotesElement);
    updatedQuotes[index] = updatedQuotesElement
    // console.log(updatedQuotes);

    setState({quotes: updatedQuotes});



  }

  function onDragEnd(result) {
    console.log(result)
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  // function addTask(){
  //   // console.log(state.quotes)
  //   const newQuotes = [...state.quotes, {
  //     task_name: '',
  //     // task_order: state.quotes.length,
  //     task_description: '',
  //     role_type_name: '',
  //     task_def_status: 'active',
  //     organization: ''}]
  //   console.log(newQuotes)
  //   setState({quotes: newQuotes})
  // }
  function removeTask(index){
    props.deleteQuote(state.quotes[index].id)
    console.log(index)
    // const newQuotes = [...state.quotes]
    // newQuotes.splice(index, 1)
    // console.log(newQuotes)
    // setState({quotes: newQuotes})
  }

  function updateQuote(data, quote, index) {
    props.updateQuote(data, index, quote);

  }
  function saveChanges(data, quote, index) {
    console.log(state.quotes)
    let quotesToUpdate = [];
    for (let i=0; i<state.quotes.length; i++) {
      if(state.quotes[i].orderChanged) {
        state.quotes[i].task_order = i
        quotesToUpdate.push(state.quotes[i])
      }

    }
    if(quotesToUpdate.length) props.updateQuotes(quotesToUpdate)
  }

  return (
    <div>
      <MDBBtn color="primary"
        onClick={() => props.toggleModal('addTask')}>
        <MDBIcon icon="plus" className="mr-1" /> Add Task
      </MDBBtn>
      <MDBBtn color="warning"
        onClick={() => saveChanges()}>
        <MDBIcon icon="check" className="mr-1" /> Save changes
      </MDBBtn>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <QuoteList quotes={state.quotes} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  roleTypes: makeSelectRoleTypes(),
  users: makeSelectUsers(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

const mapDispatchToProps = (dispatch) => {
  return {
    // onCreateUser: (user) => dispatch(registerUser(user)),
    // onDeleteUser: (user) => dispatch(actionCreators.deletUser(user)),
    // onUpdateUser: (user) => dispatch(actionCreators.editUser(user)),
    // getUsers: () => dispatch(actionCreators.getUsers())

  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DND);
