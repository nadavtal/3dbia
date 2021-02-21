import React from 'react';
import { MDBDataTable } from 'mdbreact';
import DateField from '../DateField/DateField';
// import './Datatable.css';
import {

  MDBIcon,
  MDBBtn,
  MDBTable,

} from 'mdbreact';
import HoverTools from '../HoverTools/HoverTools'

const DataTableCheckBox = (props) => {
  // console.log(props)

  const TableHeaders = () => {
    if(props.table && props.table.columns) {
      return props.table.columns.map(key => {
      // console.log(key)
        return (
          <th className='th-sm' key={key.field}>
            {key.label}
            <MDBIcon icon='sort' className='ml-1' />
          </th>
        )
      })
    } else {
      return <th>No Table</th>
    }
  }

  const toggleSelectAll = () => {
    console.log(props.data)
    props.data.map(item => props.checkBoxFunction(item))
  }



  const TableRows = () => {
    if(props.data.length) {
      return (
        props.data.map((item, index) => {
          // console.log(item)
          switch (props.dataType) {
            case 'projectsTable':
              return (
                <tr key={index} className="position-relative">
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      // onChange={() => props.checkBoxFunction(item)}
                      // checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.name}</td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.description}</td>
                  <td onClick={()=>props.onRowClick(item.id)}><DateField date={item.date_created}/></td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.project_mananer}</td>
                  <td onClick={()=>props.onRowClick(item.id)}><DateField date={item.due_date}/></td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.status}</td>

                </tr>

              )
            case 'bridgesTable':
              return (
                <tr key={index}>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      onChange={() => props.checkBoxFunction(item)}
                      checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td>{item.bid}</td>
                  <td>{item.name}</td>
                  <td>{item.bridge_type}</td>
                  <td>{item.region}</td>
                  <td>{item.spans}</td>
                  <td>{item.general_length}</td>
                </tr>

              )
            case 'projectBridgesTable':
              return (
                <tr key={index}>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      onChange={() => props.checkBoxFunction(item)}
                      checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td>{item.bid}</td>
                  <td>{item.name}</td>
                  <td>{item.bridge_type}</td>
                  <td>{item.region}</td>
                  <td>{item.spans}</td>
                  <td>{item.general_length}</td>
                </tr>

              )
            case 'processTemplatesTasks':
              return (
                <tr key={index}>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      onChange={() => props.checkBoxFunction(item)}
                      checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    {item.projectBridges? item.projectBridges.map(bridge => <div key={bridge.bid}>{bridge.name}</div>): ''}
                  </td>
                  <td>
                    <Input
                      label="Select provider"
                      elementtype="select"
                      elementconfig={{options: props.providers}}
                      // value={formElement.config.value}
                      changed={(event) => console.log(event)}

                    />
                    <Input
                      label="Upload files"
                      elementtype="file"
                      // elementconfig={{options: props.providers}}
                      // value={formElement.config.value}
                      changed={(event) => console.log(event)}

                    />
                    </td>
                </tr>

              )
            case 'providersTable':
              return (
                <tr key={index}>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      // onChange={() => props.checkBoxFunction(item)}
                      // checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td>{item.name}</td>
                  <td>{item.contact_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>

                </tr>

              )
            case 'statusTable':
              return item.projectBridges.map((bridge, index) => {
                console.log(bridge)
                return (
                  <tr key={index}>
                    <th scope='row'>

                    </th>
                    <td>{bridge.name}</td>
                    <td>{item.name}</td>
                    <td>{item.provider}</td>
                    <td>{item.status}</td>

                  </tr>

                )
              })
            case 'projectProcessesTable':
              // console.log(item);
              return (
                <tr key={index}>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      onChange={() => props.checkBoxFunction(item)}
                      checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td>{item.bid}</td>
                  <td>{item.name}</td>
                  <td>{item.provider_name}</td>
                  <td>{item.created_by}</td>
                  <td>{item.remarks}</td>
                  <td>{item.start_date ? <DateField date={item.start_date}/> : ''}</td>
                  <td>{item.due_date ? <DateField date={item.due_date}/> : ''}</td>


                </tr>

                )
            case 'organizationsTable':
              // console.log(item);
              return (
                <tr key={index}>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      onChange={() => props.checkBoxFunction(item)}
                      checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.id}</td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.name}</td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.email}</td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.phone}</td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.contact_name}</td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.address}</td>
                  {/* <td>{item.website}</td> */}


                </tr>

                )
            case 'nodesTable':
              // console.log(item);
              return (
                <tr key={index}>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={index}
                      onChange={() => props.checkBoxFunction(item)}
                      checked={props.isChecked(item)}
                    />
                    <label htmlFor={index} className='label-table' />
                  </th>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.object_id}</td>
                  <td onClick={()=>props.onRowClick(item.id)}>{item.name}</td>

                  {/* <td>{item.website}</td> */}


                </tr>

                )



            default:
              break;
          }

        })
      )

    } else return <tr>NO DATA</tr>
  }
  return (
    <MDBTable responsive hover>
      <thead>
        <tr>
          <th>
            <input
              className='form-check-input'
              type='checkbox'
              id='checkbox'
              onChange={() => props.toggleSelectAll()}
            />
            <label
              htmlFor='checkbox'
              className='form-check-label mr-2 label-table'
            />
          </th>
          <TableHeaders />

        </tr>
      </thead>

      <tbody>
        <TableRows />
      </tbody>
    </MDBTable>

    // <MDBDataTable
    //   striped
    //   bordered
    //   small
    //   data={data}
    // />
  );
}

export default DataTableCheckBox;
