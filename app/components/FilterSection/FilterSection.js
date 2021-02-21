import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBInput,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBBtn,
  MDBIcon
} from 'mdbreact';


export function FilterSection({
  handleResults,
  table,
  data,
  addFilter,
  filters,
  theme
}) {

  const [results, setResults] = useState([]);
  

  const handleFilterInput = (values, filter) => {
    console.log('handleFilterInput', values, filter);
    // if(values.length)
    filter.values = values

    // console.log(results);
    console.log(filters)
    // console.log(data);
    if (results.length) {
      // setResults(results)
      // handleResults(results)
    }
  }

  const applyFilters = () => {
    // console.log(filters);

    let results = [];
    for (let filter of filters) {
      for (let value of filter.values) {
        data.map(row => {
          if (row[filter.field] == value) results.push(row)
        })

      }

    }
    console.log(results, filters);
    handleResults(results, filters)
    // setFilters(filters)
  }

  const getUniqueValuesFromColumn = (field) => {
    let uniqueValues = [];
    data.map(row => {
      if(row[field] !=='' && !uniqueValues.includes(row[field])) uniqueValues.push(row[field])

    })
    // console.log(uniqueValues)
    return uniqueValues
  }

  const FilterSectionItem = (filterSectionProps) => {
    const f = filterSectionProps.filter
    // console.log(f)
    switch (f.filterType) {
      case 'text':
        return (

           <MDBInput className="" type='text' label={`Filter by ${f.label}`}
            getValue={(event) => handleFilterInput(event, f)}/>

        );
      case 'number':
        return (
          <div className="d-flex">
            <MDBSelect className='colorful-select dropdown-primary '
              getValue={(event) => handleFilterInput(event, f)}>
              <MDBSelectInput selected={`Filter by ${f.label}`} />
              <MDBSelectOptions>

                <MDBSelectOption value='1'>Lesser then...</MDBSelectOption>
                <MDBSelectOption value='2'>Greater then...</MDBSelectOption>
                <MDBSelectOption value='3'>Equals to...</MDBSelectOption>

              </MDBSelectOptions>
            </MDBSelect>
            <MDBInput type='number' label={`${f.label}`}
              getValue={(event) => handleFilterInput(event, f)}/>
          </div>

        );
      case 'selectMultiple':
        const options = getUniqueValuesFromColumn(f.field)
        return (

            <MDBSelect className='colorful-select dropdown-primary ' multiple
              getValue={(event) => handleFilterInput(event, f)}>
              <MDBSelectInput selected={`Filter by ${f.label}`} />
              <MDBSelectOptions>
                <MDBSelectOption disabled>Filter {f.label}</MDBSelectOption>
                {options.map(option =>
                  <MDBSelectOption
                    key={option}
                    value={option}
                    checked={f.values.includes(option)}
                    >{option}
                  </MDBSelectOption>)}

              </MDBSelectOptions>
            </MDBSelect>


        )
      case 'select':
        const selectOptions = getUniqueValuesFromColumn(f.field)
        return (

            <MDBSelect className='colorful-select dropdown-primary '
              getValue={(event) => handleFilterInput(event, f)}>
              <MDBSelectInput selected={`Filter by ${f.label}`} />
              <MDBSelectOptions>
                <MDBSelectOption disabled>Filter {f.label}</MDBSelectOption>
                {selectOptions.map(option =>
                  <MDBSelectOption
                    key={option}
                    value={option}
                    checked={f.values.includes(option)}
                    >{option}
                  </MDBSelectOption>)}

              </MDBSelectOptions>
            </MDBSelect>


        )
      default:
        break;
    }

  }


  return (
    <MDBCard className='p-2 mb-5'>
      <MDBRow>
        <MDBCol lg={theme && theme === 'narrow' ? '12' : '9'} md='12'>
          <MDBSelect className='colorful-select dropdown-primary mx-2'
            multiple
            getValue={(event) => addFilter(event)}
            >
            <MDBSelectInput selected={'Add filter'} />
            <MDBSelectOptions>
              {table.columns.map((column, index) =>
                <MDBSelectOption
                  value={column.label}
                  key={index}
                >{column.label}</MDBSelectOption>)}

            </MDBSelectOptions>
          </MDBSelect>
          {filters.map((column, index) => {
            if (column.filterType) {
              return <FilterSectionItem
              filter={column}
              key={index}

              />
            }
          })}
        </MDBCol>
        <MDBCol lg={theme && theme === 'narrow' ? '12' : '3'} md='12'>
          <h5></h5>
          <MDBBtn
              color='info'
              rounded
              className='ml-3'
              onClick={() => applyFilters()}
            >Find matches <MDBIcon icon='hand-point-right' className='ml-1' />
          </MDBBtn>
        </MDBCol>
        {/* <MDBCol lg='3' md='12'>
          <MDBSelect className='colorful-select dropdown-primary mx-2'
            getValue={(event) => handleFilterInput(event)}>
            <MDBSelectInput selected={`actions`} />
            <MDBSelectOptions>

              <MDBSelectOption value='1'>action...</MDBSelectOption>
              <MDBSelectOption value='2'>action...</MDBSelectOption>
              <MDBSelectOption value='3'>action...</MDBSelectOption>

            </MDBSelectOptions>
          </MDBSelect>

        </MDBCol> */}


        {/* <MDBCol lg='3' md='6'>
          <MDBInput type='text' icon='search' label='Search' />
        </MDBCol> */}
      </MDBRow>
    </MDBCard>
  );
}

const mapStateToProps = createStructuredSelector({



});

const mapDispatchToProps = (dispatch) => {
  return {



  };
}

// const withConnect = connect(
//   // mapStateToProps,
//   // mapDispatchToProps,
// );

export default compose(
  // withConnect,
  memo,
)(FilterSection);
