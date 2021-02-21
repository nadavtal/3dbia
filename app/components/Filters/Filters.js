import React from 'react'
import Select from "components/Select/Select";
import { MDBInput, MDBListGroup, MDBListGroupItem } from 'mdbreact'
import SelectMultiple from '../SelectMultiple';
const Filters = ({
    filters,
    handleChange
}) => {
        const Filter = ({ filter }) => {
          switch (filter.type) {
            case 'select':
              return (
                // <Select
                //   value={filter.value}
                //   label={filter.label}
                //   className="fullWidth"
                //   options={filter.options}
                //   onChange={val => handleChange(filter, val)}
                // />
                <SelectMultiple
                  options={filter.options}
                  value={filter.value}
                  label={filter.label}
                  disabled={false}
                  onChange={val => handleChange(filter, val)}
                />
              );
            case 'fromTo':
              return (
                <>
                  <div className="fontSmall">{filter.label}</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <MDBInput 
                        label="From" 
                        type="number"/>
                    <span className="mx-3">-</span>
                    <MDBInput 
                        label="To" 
                        type="number"/>
                  </div>
                </>
              );

            default:
              break;
          }
        };
        return (
          <MDBListGroup>
            {filters.map(filter => (
              <MDBListGroupItem key={filter.label}>
                <Filter filter={filter} />
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        );
      }

export default Filters

