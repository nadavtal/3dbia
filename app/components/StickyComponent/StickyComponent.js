import React, {useState} from 'react';
import Actions from '../Actions';
import TextSearch from '../TextSearch/TextSearch'
import styled from 'styled-components'
const StickyComponent = ({ 
    children,
    position,
    amount,
    className,
}) => {

  const Wrapper = styled.div`
    position: sticky;
    ${position}: ${amount}rem;
  `
    return (
      <Wrapper className={className}>
        {children}
      </Wrapper>
    );
}

export default StickyComponent