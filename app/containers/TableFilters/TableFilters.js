import React, { useEffect, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUsers } from '../App/selectors';
import {makeSelectDisaplayedData} from './selectors'
import { useInjectReducer } from 'utils/injectReducer';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip'
import { useHistory , Link } from 'react-router-dom';
import {
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import reducer from './reducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBTable,
  MDBView,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBDatePicker,

} from 'mdbreact';
// import saga from './saga';
import * as actions from './actions'
import FilterSection from '../../components/FilterSection/FilterSection';
import DataTableCheckBox from '../../components/DataTableCheckBox/DataTableCheckBox'
import {tables} from './tables'
import './TableFilters.css';
const key = 'TableFilters';


export function TableFilters({
  tableName,
  data,
  dataType,
  onRowClick,
  isChecked,
  checkBoxFunction,
  actions,
  theme
}) {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  const [showFilter, setShowFilter] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState({});
  let actionInput;
  // console.log(actions)
  useEffect(() => {
    // console.log(data)
    // console.log(filters)
  }, [filters, data]);

  const handleResultsFromFilter = (results, updatedFilters) => {
    console.log(results, updatedFilters);
    setDisplayedData(results);
    setFilters(updatedFilters)
    // onHandleResults(results)
    // if (results.length > 0) setDisplayedData(results)
    // setDisplayedData(results)
  }

  const handleActionInput = (values) => {
    console.log(values)
    actionInput = values
  }

  const addFilter = (selectedFilters) => {
    console.log(selectedFilters, filters);
    let updatedFilters = [];
    if (selectedFilters.length) {
      for (let filter of selectedFilters) {
        for (let column of tables[dataType].columns){
          column.values = [];
          if (column.label == filter) {
            updatedFilters.push(column)

          }
        }

      }

    }
    console.log(updatedFilters)
    setFilters(updatedFilters)

  }

  const Action = () => {
    // console.log(action)
    if (action) {
      switch (action.type) {
        case 'button':
          return <IconButtonToolTip iconName={action.icon}
            className="border border-primary rounded p-2 "
            far
            // iconClassName="primary"
            size="lg"
            toolTipType="info"
            toolTipPosition="bottom"
            toolTipEffect="float"
            toolTipText={action.name}
            onClickFunction={() => action.clickFunction(displayedData, dataType)}
            key={action.name}
          />;
        case 'selectMultiple':
          return <>
                  <MDBSelect
                  className="colorful-select float-left dropdown-primary hidden-md-down actionInput"
                  key={action.name}
                  multiple
                  getValue={(event) => handleActionInput(event)}>

                  <MDBSelectInput selected={action.name} />
                    <MDBSelectOptions>
                      <MDBSelectOption disabled>{action.name}</MDBSelectOption>
                      {(action.options && action.options.length) && (
                        action.options.map(option => <MDBSelectOption key={option.name} value={option.name}>{option.name}</MDBSelectOption>)
                      )}
                    </MDBSelectOptions>
                  </MDBSelect>
                  <MDBBtn rounded outline color="primary"
                    onClick={() => action.clickFunction(actionInput, dataType)}
                    className="float-right"
                    >Allocate
                  </MDBBtn>
                  {/* <MDBBtn
                    color='success'
                    rounded
                    className='ml-3'
                    onClick={() => action.clickFunction(actionInput, dataType)}
                  >Allocate <MDBIcon icon='hand-point-right' className='ml-1' />
                </MDBBtn> */}
               </>
        case 'select':
          return <>
            <MDBSelect
              className="colorful-select float-left dropdown-primary hidden-md-down actionInput"
              key={action.name}
              getValue={(event) => handleActionInput(event)}
              >

            <MDBSelectInput selected={action.name} />
              <MDBSelectOptions>
                <MDBSelectOption disabled>{action.name}</MDBSelectOption>
                {(action.options && action.options.length) && (
                  action.options.map(option => <MDBSelectOption key={option.name} value={option.name}>{option.name}</MDBSelectOption>)
                )}
              </MDBSelectOptions>
            </MDBSelect>
            <MDBBtn rounded outline color="success"
              onClick={() => action.clickFunction(actionInput[0], dataType)}
              className="float-right"
              >Allocate
            </MDBBtn>
            {/* <MDBBtn
              color='success'
              rounded
              className='ml-3'
              onClick={() => action.clickFunction(actionInput, dataType)}
            >Allocate <MDBIcon icon='hand-point-right' className='ml-1' />
          </MDBBtn> */}
          </>
        case 'date':
          return <>
            <span className="actionInput float-left pt-2">{action.name}</span>
            <MDBDatePicker
              getValue={(event) => action.clickFunction(event)}
              emptyLabel={action.name}
              className="float-right mt-0"
              // value ={props.value}
            />
          </>
        case 'textarea':
          return <>
            {/* <span className="actionInput float-left pt-2">{action.name}</span> */}
            <MDBInput
              type="textarea"
              label={action.name}
              rows="2"
              // icon="pencil-alt"
              getValue={(event) => handleActionInput(event)}
              className="actionInput float-left mt-0"
            />
            <MDBBtn rounded outline color="primary"
              onClick={() => action.clickFunction(actionInput, dataType)}
              className="float-right"
              >Add
            </MDBBtn>
          </>

        default:
          return <></>;
        }

    }
  }


  const Actions = () => {

    return (
      <div className="actions">
        {actions && (actions.map(action => {
          switch (action.type) {
            case 'button':
              return <IconButtonToolTip iconName={action.icon}
                className="border border-primary rounded p-2 "
                far
                // iconClassName="primary"
                size="lg"
                toolTipType="info"
                toolTipPosition="bottom"
                toolTipEffect="float"
                toolTipText={action.name}
                onClickFunction={() => action.clickFunction(displayedData, dataType)}
                key={action.name}
              />;
            case 'selectMultiple':
              return <>
                      <MDBSelect
                      className="colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down"
                      key={action.name}
                      multiple
                      getValue={(event) => handleActionInput(event)}>

                      <MDBSelectInput selected={action.name} />
                        <MDBSelectOptions>
                          <MDBSelectOption disabled>{action.name}</MDBSelectOption>
                          {(action.options && action.options.length) && (
                            action.options.map(option => <MDBSelectOption value={option.name}>{option.name}</MDBSelectOption>)
                          )}
                        </MDBSelectOptions>
                      </MDBSelect>
                      <MDBBtn
                        color='success'
                        rounded
                        className='ml-3'
                        onClick={() => action.clickFunction(actionInput, dataType)}
                      >Allocate <MDBIcon icon='hand-point-right' className='ml-1' />
                    </MDBBtn>
                   </>
            case 'select':
              return <>
                      <MDBSelect
                      className="colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down"
                      key={action.name}
                      getValue={(event) => handleActionInput(event)}>

                      <MDBSelectInput selected={action.name} />
                        <MDBSelectOptions>
                          <MDBSelectOption disabled>{action.name}</MDBSelectOption>
                          {(action.options && action.options.length) && (
                            action.options.map(option => <MDBSelectOption key={option.name} value={option.name}>{option.name}</MDBSelectOption>)
                          )}
                        </MDBSelectOptions>
                      </MDBSelect>
                      <MDBBtn
                        color='success'
                        rounded
                        className='ml-3'
                        onClick={() => action.clickFunction(actionInput, dataType)}
                      >Allocate <MDBIcon icon='hand-point-right' className='ml-1' />
                    </MDBBtn>
                   </>
            case 'date':
              return <>
                     <span>{action.name}</span>
                      <MDBDatePicker
                        getValue={(event) => action.clickFunction(event)}
                        emptyLabel={action.name}
                        // value ={props.value}
                      />
                      </>

            default:
              break;
            }
          }
        ))}
      </div>
    )
  }

  return (
    <div id='profile-v1'>
      <MDBCard narrow className='pb-3'>
          <MDBView
            cascade
            className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 transitioned'
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className='text-left'>
                <IconButtonToolTip iconName="filter"
                  toolTipType="info"
                  toolTipPosition="bottom"
                  toolTipEffect="float"
                  toolTipText='Show filters'
                  rotate={showFilter ? '180' : ''}
                  onClickFunction={() => setShowFilter(!showFilter)}
                  />

              </div>
              <a href='#!' className='white-text mx-3'>
                {tableName}
              </a>
              <div className='d-flex '>
                {actions && (actions.map(action =>
                  <IconButtonToolTip iconName={action.icon}
                  toolTipType="info"
                  toolTipPosition="bottom"
                  toolTipEffect="float"
                  toolTipText={action.name}
                  onClickFunction={() => action.clickFunction(displayedData, dataType)}
                  key={action.name}
                  className="mx-3"
                  />))}
                {/* <MDBBtn outline color='white' rounded size='sm' className='px-2'>
                  <MDBIcon icon='pencil-alt' className='mt-0' />
                </MDBBtn>
                <MDBBtn outline color='white' rounded size='sm' className='px-2'>
                  <MDBIcon icon='times' className='mt-0' />
                </MDBBtn>
                <MDBBtn outline color='white' rounded size='sm' className='px-2'>
                  <MDBIcon icon='info-circle' className='mt-0' />
                </MDBBtn> */}
              </div>

            </div>
            {showFilter && (
              <FilterSection
                data={data}
                className="d-block "
                table={tables[dataType]}
                handleResults={(results) => handleResultsFromFilter(results, filters)}
                addFilter={(filterNames) => addFilter(filterNames)}
                filters={filters}
                theme={theme}
                />

            )}
          </MDBView>
          <MDBCardBody>
            <MDBRow>
             <MDBCol lg={theme && theme === 'narrow' ? '12' : '3'} md='12' >
              <h5 className="">Showing {displayedData.length? displayedData.length : data.length} {tableName} </h5>
             </MDBCol>
             <MDBCol lg={theme && theme === 'narrow' ? '12' : '6'} md='12'>
              <Action />
             </MDBCol>
             <MDBCol lg={theme && theme === 'narrow' ? '12' : '3'} md='12' className="">
              {/* <div className="d-flex text-right"> */}
                  {actions && (actions.map(action =>
                      <IconButtonToolTip iconName={action.icon}
                      toolTipType="info"
                      toolTipPosition="bottom"
                      toolTipEffect="float"
                      toolTipText={action.name}
                      onClickFunction={() => setAction(action)}
                      key={action.name}
                      size="lg"
                      className="mx-2 float-right"
                    />))}

             </MDBCol>
            </MDBRow>
            <DataTableCheckBox
              table={tables[dataType]}
              data={displayedData.length? displayedData : data}
              dataType={dataType}
              onRowClick={id => onRowClick(id)}
              isChecked={item => isChecked(item)}
              checkBoxFunction={item => checkBoxFunction(item)}
              />
            {/* <MDBSelect className="colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down">
              <MDBSelectInput selected="Rows number" />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>Rows number</MDBSelectOption>
                  <MDBSelectOption value="1">5 rows</MDBSelectOption>
                  <MDBSelectOption value="2">25 rows</MDBSelectOption>
                  <MDBSelectOption value="3">50 rows</MDBSelectOption>
                  <MDBSelectOption value="4">100 rows</MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect> */}

            {/* <MDBPagination circle className='my-4 float-right'>
              <li className='page-item disabled clearfix d-none d-md-block'>
                <a className='page-link' href='#!'>
                  First
                </a>
              </li>
              <MDBPageItem disabled>
                <MDBPageNav className='page-link' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                  <span className='sr-only'>Previous</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active>
                <MDBPageNav className='page-link'>
                  1 <span className='sr-only'>(current)</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>2</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>3</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>4</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>5</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link' aria-label='Next'>
                  <span aria-hidden='true'>&raquo;</span>
                  <span className='sr-only'>Next</span>
                </MDBPageNav>
              </MDBPageItem>
            </MDBPagination> */}
          </MDBCardBody>
        </MDBCard>

    </div>

   );
}

const mapStateToProps = createStructuredSelector({
  displayedData: makeSelectDisaplayedData(),


});

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleResults: (results) => dispatch(actions.onHandleResults(results)),


  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TableFilters);
