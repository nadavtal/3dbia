import React , {useState, useEffect, memo} from 'react';
import { connect } from 'react-redux';

import { compose } from 'redux';
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
  MDBPageNav
} from 'mdbreact';
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip'
import Input from '../Input/Input';
import DateField from 'components/DateField/DateField';
import FilterSection from '../FilterSection/FilterSection';
import DataTableCheckBox from '../DataTableCheckBox/DataTableCheckBox'

let tables = {
  'bridgesTable': {
    columns: [
      {
        label: 'Bridge ID',
        field: 'bid',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Type',
        field: 'bridge_type',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Region',
        field: 'region',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Spans',
        field: 'spans',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Length',
        field: 'general_length',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },


    ],
    rows: [

    ]
  },
  'projectBridgesTable': {
    columns: [
      {
        label: 'Bridge ID',
        field: 'bid',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Type',
        field: 'bridge_type',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Region',
        field: 'region',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Spans',
        field: 'spans',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Length',
        field: 'general_length',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },


    ],
    rows: [

    ]
  },
  'providersTable': {
    columns: [
      // {
      //   label: 'ID',
      //   field: 'id',
      //   sort: 'asc',
      //   width: 150
      // },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Contact name',
        field: 'contact_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Phone',
        field: 'phone',
        // sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        // sort: 'asc',
        width: 150
      },


    ],
    rows: [

    ]
  },
  'processTemplatesTasks': {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Bridges',
        field: 'projectBridges',
        sort: 'asc',
        width: 150
      },


    ],
    rows: [

    ]
  },
  'projectProcessesTable': {
    columns: [
      {
        label: 'Bridge ID',
        field: 'bid',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Bridge name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Process name',
        field: 'process_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Process description',
        field: 'process_description',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Provider',
        field: 'provider_name',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'statusTable': {
    columns: [
      {
        label: 'Bridge name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Process name',
        field: 'process_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Provider',
        field: 'provider_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'process_status',
        sort: 'asc',
        width: 150
      },


    ],
    rows: [

    ]
  },
  'projectsTable': {
    columns: [
      {
        label: 'Project name',
        field: 'name',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Date created',
        field: 'date_created',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Project manager',
        field: 'project_mananer',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Due date',
        field: 'due_date',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },


    ],
    rows: [

    ]
  }
}

const ExtendedTable = (props) => {
  // let table;
  // table = tables[props.dataType]
  console.log('EXTENDED INITIALIZED')
  // console.log('EXTENDED INITIALIZED TABLE', table)
  // useEffect(() => {
  //   console.log('EXTENDED INITIALIZED', props)
  //   if (props.data.length > 0) setDisplayedData(props.data)

  // }, [props]);

  // useEffect(() => {

  //   console.log('filters', filters)
  // }, [filters]);


  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [table, setTable] = useState({});

  useEffect(() => {
    console.log('Use Effect initial run', props.data)
    if (props.data.length > 0) setDisplayedData(props.data)
    setTable(tables[props.dataType])
    }, [props]);

  useEffect(() => {
    console.log('Use Effect displayedData', displayedData);
    console.log('Use Effect table', table);
    // table.rows = displayedData
    }, [displayedData, table]);
  const createRows = (dataType) => {
    data = tables[dataType];

    let rowItem = {}

    for (let item of props.data) {
      // console.log(item);
      data.columns.map(column => rowItem[column.field] = item[column.field]);
      // console.log(rowItem)
      // data.rows.push(rowItem)

    }
    console.log(data);
  }
  // createRows(props.dataType);


  const handleResultsFromFilter = (results) => {
    console.log(results);
    if (results.length > 0) setDisplayedData(results)
    // setDisplayedData(results)
  }

  const toggleSelectAll = () => {
    // for (let row of )
  }
  return (
    <div id='profile-v1'>


        <MDBCard narrow className='pb-3'>
          <MDBView
            cascade
            className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 transitioned'
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className='text-left'>
                <IconButtonToolTip iconName="filter"
                  toolTipType="info"
                  toolTipPosition="bottom"
                  toolTipEffect="float"
                  toolTipText='Show filters'
                  onClickFunction={() => setShowFilter(!showFilter)}
                  />

              </div>
              <a href='#!' className='white-text mx-3'>
                {props.tableName}
              </a>
              <div className='text-right'>
                <MDBBtn outline color='white' rounded size='sm' className='px-2'>
                  <MDBIcon icon='pencil-alt' className='mt-0' />
                </MDBBtn>
                <MDBBtn outline color='white' rounded size='sm' className='px-2'>
                  <MDBIcon icon='times' className='mt-0' />
                </MDBBtn>
                <MDBBtn outline color='white' rounded size='sm' className='px-2'>
                  <MDBIcon icon='info-circle' className='mt-0' />
                </MDBBtn>
              </div>

            </div>
            {showFilter && (
              <FilterSection
                data={props.data}
                className="d-block"
                dataType={props.dataType}
                handleResults={(results) => handleResultsFromFilter(results)}
                />

            )}
          </MDBView>
          <MDBCardBody>
            <DataTableCheckBox
              table={table}
              data={displayedData}
              dataType={props.dataType}
              onRowClick={(id) => props.onRowClick(id)}
              isChecked={(item => props.isChecked(item))}
              />
            <MDBSelect className="colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down">
              <MDBSelectInput selected="Rows number" />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>Rows number</MDBSelectOption>
                  <MDBSelectOption value="1">5 rows</MDBSelectOption>
                  <MDBSelectOption value="2">25 rows</MDBSelectOption>
                  <MDBSelectOption value="3">50 rows</MDBSelectOption>
                  <MDBSelectOption value="4">100 rows</MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect>

            <MDBPagination circle className='my-4 float-right'>
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
            </MDBPagination>
          </MDBCardBody>
        </MDBCard>

    </div>
  );
};

export default compose(

  memo,
)(ExtendedTable);

