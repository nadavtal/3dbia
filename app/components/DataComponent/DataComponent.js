import React from 'react';
import DateField from '../DateField/DateField';
// import LinkCard from '../LinkCard';
import './DataComponent.css'
const DataComponent = (props) => {
  // console.log(props.data)
  const keys = Object.keys(props.data)
  // console.log(keys)
  const dateFields = ['updatedAt', 'createdAt', 'due_date', 'start_date']
  return (
    <div className={`dataComponent ${props.className}`}>       
      {keys.map(key => {
        if (typeof(props.data[key]) !== 'object')
        return <div className=""
                  key={key}>
                  <span className="circle"></span>
                  <span className="key">{key}</span>:
                  <span className="value ml-1">
                    {dateFields.includes(key) ? <DateField date={props.data[key]}/> : props.data[key]}
                  </span>

                </div>
       })
      }
    </div>
    );
};

export default DataComponent;
