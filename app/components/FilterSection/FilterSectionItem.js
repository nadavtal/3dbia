import React, {memo, useState} from 'react'
import {
    MDBRow,
    MDBCol,
    MDBDatePicker,
    MDBInput,
    MDBSelect,
    MDBSelectInput,
    MDBSelectOptions,
    MDBSelectOption,
    MDBBtn,
    MDBIcon
  } from 'mdbreact';
import CustomSelect from 'components/CustomSelect';

const FilterSectionItem = ({
    filter,
    handleFilterInput
}) => {
    // console.log(filter)
    const [input, setinput] = useState(filter.value ? filter.value : '')
    switch (filter.type) {
      case 'text':
        return (
          <MDBInput
            className=""
            type="text"
            label={`Filter by ${filter.name}`}
            onChange={event => {
              handleFilterInput(event.target.value, filter);
              // let updatedFilters = [...selectedFilters]
              // updatedFilters.find(fil => fil.name == filter.name).value = event.target.value;
              // console.log(updatedFilters)
              setinput(event.target.value);
              // setSelectedFilters(updatedFilters)
            }}
            value={input}
          />
        );
      case 'number':
        return (
          <div className="row">
            <div className="col-9">
              <CustomSelect
                options={[
                  { id: 'lesserThen', name: 'Lesser then...' },
                  { id: 'greaterThen', name: 'Greater then...' },
                  { id: 'equals', name: 'Equals...' },
                ]}
                onChange={event => {
                  //   handleFilterInput(event[0], filter);
                  setinput(event[0]);
                  // let updatedFilters = [...selectedFilters]
                  // updatedFilters.find(fil => fil.name == filter.name).value = event[0]
                  // setSelectedFilters(updatedFilters)
                }}
                value={input}
                label={`Filter by ${filter.name}`}
              />
            </div>
            <div className="col-3">
                {input && <MDBInput
                type="number"
                label={'Num'}
                getValue={event => handleFilterInput(event, filter, input)}
              />}
              
            </div>
          </div>
        );
      case 'select':
        // const selectOptions = getUniqueValuesFromColumn(filter.field)
        // console.log(selectOptions)
        return (
          <CustomSelect
            options={filter.options}
            onChange={event => {
              handleFilterInput(event[0], filter);
              setinput(event[0]);
              // let updatedFilters = [...selectedFilters]
              // updatedFilters.find(fil => fil.name == filter.name).value = event[0]
              // setSelectedFilters(updatedFilters)
            }}
            value={input}
            label={`Filter by ${filter.name}`}
          />
        );
      case 'date':
        return (
          <div className="row align-items-center">
            <div className="col-9">
              <CustomSelect
                options={[
                  { id: 'lesserThen', name: 'Lesser then...' },
                  { id: 'greaterThen', name: 'Greater then...' },
                  { id: 'equals', name: 'Equals...' },
                ]}
                onChange={event => {
                  //   handleFilterInput(event[0], filter);
                  setinput(event[0]);
                  // let updatedFilters = [...selectedFilters]
                  // updatedFilters.find(fil => fil.name == filter.name).value = event[0]
                  // setSelectedFilters(updatedFilters)
                }}
                value={input}
                label={`Filter by ${filter.name}`}
              />
            </div>
            <div className="col-3">
                {input && <MDBDatePicker
                getValue={event => handleFilterInput(event, filter, input)}
                value={Date.now()}
              />}
              
            </div>
          </div>
        );

      default:
        break;
    }

  }

export default memo(FilterSectionItem)