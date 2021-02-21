
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../global-styles' 
// console.log(theme)
const TopBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  height: ${theme.layout.topBarSize};
  text-align: center;
  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -ms-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
`;
export default TopBar;


