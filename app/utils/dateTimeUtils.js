export const convertToDate = (date) => {
  // console.log(props)
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth()+1;
  const year = d.getFullYear();
  const dateFormat = day+'/'+month+'/'+year
  // console.log(day, month, year)
  // console.log(d.getUTCHours()); // Hours
  // console.log(d.getUTCMinutes());
  // console.log(d.getUTCSeconds());
  return dateFormat
}
export const convertToMySqlDateFormat = (date) => {
  // console.log(props)
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth()+1;
  const year = d.getFullYear();
  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const dateFormat = year +'-'+ month+ '-'+ day 
  const hourFormat = hours +' : '+ minutes 
  // console.log(day, month, year)
  // console.log(d.getUTCHours()); // Hours
  // console.log(d.getUTCMinutes());
  // console.log(d.getUTCSeconds());
  // return dateFormat + ' - ' + hourFormat
  return dateFormat
}

export const isDueDatePassed = (date) => {
  let isPassed = false;
  // console.log(new Date(date));
  // console.log(new Date);
  isPassed = new Date(date) < new Date
  return isPassed
}
