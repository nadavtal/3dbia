import React, {mome} from 'react';

const NumbersWithCommas = ({numbers}) => {

  return numbers.map((num, index) => numbers.length - 1 == index ? <span>{num}</span> : <span>{`${num}, `}</span>)
}

export default NumbersWithCommas
