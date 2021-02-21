
import React from 'react';
import styled from 'styled-components';
import {WIDE_WIDTH} from './reducer'
import { theme } from '../../global-styles' 
const MainViewStyles = styled.div`
    width: ${WIDE_WIDTH};
    margin-right: ${theme.layout.rightChatWidth};
    transition: .3s all;
    position: relative;
    float: right;
    overflow: hidden;
    `;
export default MainViewStyles;


