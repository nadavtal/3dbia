
import React from 'react';
import styled from 'styled-components';
import {WIDE_WIDTH} from '../reducer'
import mainViewStyles from './MainViewStyles';

const MainViewStyles = styled.div`
    width: ${WIDE_WIDTH};
    height: 94vh;
    margin-right: 4.4rem;
    transition: .3s all;
    position: relative;
    float: right;
    background-color: white;
    // border-bottom: 1px solid lightgrey;
    overflow: hidden;
    // &:active {
    //   // background: #41addd;
    //   color: #fff;
    // }
    `;
export default MainViewStyles;


