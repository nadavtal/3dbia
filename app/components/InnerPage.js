import React from 'react';
import styled from 'styled-components';
import { theme } from '../global-styles' 

const InnerPage = styled.div`
    margin-top: ${theme.layout.topBarSize}; 
    height: calc(100vh - ${theme.layout.topBarSize} - ${theme.layout.footerHeight});
    padding-right: ${props => props.paddingRight || ""}; 
    position: relative;   
`;
export default InnerPage;