function convertObjArrayToArray(array) {
    let finalArr = [];
    array.map(obj => finalArr.push(Object.values(obj)))
    return finalArr
  }
function convertToMySqlDateFormat(date){
    // console.log(props)
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth()+1;
    const year = d.getFullYear();
    const hour = d.getUTCHours();
    const min = d.getUTCMinutes();
    const sec = d.getUTCSeconds();
    const dateFormat = `${year}-${month}-${day} ${hour}:${min}:${sec}`
    // console.log(day, month, year)
    // console.log(d.getUTCHours()); // Hours
    // console.log(d.getUTCMinutes());
    // console.log(d.getUTCSeconds());
    return dateFormat
  }
module.exports = {
  convertObjArrayToArray,
  convertToMySqlDateFormat
}