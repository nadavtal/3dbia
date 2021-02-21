import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import CustomSelect from 'components/CustomSelect';
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import FilterSectionItem from './FilterSectionItem'
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


export function Filter({
  data,
  handleFilterInput,
  filters,
  onAddFilter,
  // selectedFilters,
  // setSelectedFilters
  }) {

  const [results, setResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  useEffect(() => {
    console.log(filters)
    filters.forEach(filter => {
      if (filter.value) {
        setSelectedFilters([...selectedFilters, filter])
        handleFilterInput(filter.value, filter)
      }
    })
    return () => {
      setSelectedFilters()
    }
  }, [filters])
  const addFilter = (selectedFilter) => {
    // console.log(selectedFilter);
    // onAddFilter(selectedFilter)
    const filter = filters.find(filter => filter.name == selectedFilter)
    // console.log(filter)
    if (selectedFilter) setSelectedFilters([...selectedFilters, {...filter, value: ''}])

  }
  const removeFilter = (selectedFilter) => {
    console.log(selectedFilter)
    console.log(selectedFilters)
    setSelectedFilters(selectedFilters.filter(fil => fil.name !== selectedFilter.name))

  }
  // const handleFilterInput = (filter, value) => {
  //   console.log('handleFilterInput', filter, value);
  //   // if(values.length)

  // }





  return (
    <div className='p-2 mb-5'>
      <MDBRow>
        <MDBCol md='12'>
          <CustomSelect options={filters}
            onChange={(event) => addFilter(event[0])}
            label="Add filter"
            />
          {selectedFilters.map((filter) => {
            // console.log(filter)
           return (
             <div className="row" key={filter.field}>
               <div className="col-10">
                 <FilterSectionItem
                   filter={filter}
                   handleFilterInput={(val, filter) =>  handleFilterInput(val, filter)}
                 />
               </div>
               <div className="col-2 text-right">
                 <IconButtonToolTip
                   iconName='times'
                   toolTipType='error'
                   toolTipPosition="left"
                   toolTipEffect="float"
                   toolTipText='Remove filter'
                   className={`mx-2 text-black`}
                   onClickFunction={() => removeFilter(filter)}
                 />
               </div>
             </div>
           );
          })}
        </MDBCol>

      </MDBRow>
    </div>
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
)(Filter);
