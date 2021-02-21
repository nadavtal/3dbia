
export function getAvgOfArray(array) {
  // console.log(url, options);
  return Math.ceil(array.reduce((a, b) => a + b, 0)/array.length)
}

export const caculateCompletedPercentage = (el) => {
  // console.log(el)
  const keysNum = Object.keys(el).length
  let completed = 0;
  let avg
  for (const key of Object.keys(el)) {
    if(el[key]) completed++
  }
  avg = Math.ceil(completed/keysNum*100)
  return avg
}
