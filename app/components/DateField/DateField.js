import React from 'react';
const DateField = (props) => {

  const d = new Date(props.date);
  const day = d.getDate();
  const month = d.getMonth()+1;
  const year = d.getFullYear();
  const dateFormat = day+'/'+month+'/'+year
  // console.log(day, month, year)
  // console.log(d.getUTCHours()); // Hours
  // console.log(d.getUTCMinutes());
  // console.log(d.getUTCSeconds());
  return (
    <span className={props.className}>{dateFormat}</span>
  )
}

export default DateField
