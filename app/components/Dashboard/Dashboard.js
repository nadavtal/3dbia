import React, { useState, useEffect } from 'react'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBSelect,
    MDBSelectInput,
    MDBSelectOptions,
    MDBSelectOption,
    MDBDatePicker,
    MDBTooltip,
    MDBSimpleChart,
    MDBBadge,
    MDBView,
    MDBBtn,
    MDBPagination,
    MDBPageItem,
    MDBPageNav,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
    MDBProgress,
    MDBTable,
    MDBBtnFixed,
    MDBBtnFixedItem
  } from 'mdbreact';
import { Line, Bar, Doughnut, Pie, Radar, Polar } from 'react-chartjs-2';
import * as chartsData from './chartSettings'
const Dashboard = ({}) => {
    return <>

<MDBRow className='mb-4'>
          <MDBCol md='12' lg='3' className='mb-4'>
            <MDBCard narrow>
              <MDBView cascade className='gradient-card-header blue'>
                <h5 className='mb-0'>Polar chart</h5>
              </MDBView>
              <MDBCardBody>
                <Polar data={chartsData.polarChartData} height={200} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md='12' lg='3' className='mb-4'>
            <MDBCard narrow>
              <MDBView cascade className='gradient-card-header blue'>
                <h5 className='mb-0'>Pie chart</h5>
              </MDBView>
              <MDBCardBody>
                <Pie data={chartsData.polarChartData} height={200} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md='12' lg='3' className='mb-4'>
            <MDBCard narrow>
              <MDBView cascade className='gradient-card-header blue'>
                <h5 className='mb-0'>Doughnut chart</h5>
              </MDBView>
              <MDBCardBody>
                <Doughnut data={chartsData.polarChartData} height={200} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md='12' lg='3' className='mb-4'>
            <MDBCard narrow>
              <MDBView cascade className='gradient-card-header blue'>
                <h5 className='mb-0'>Radar chart</h5>
              </MDBView>
              <MDBCardBody>
                <Radar data={chartsData.radarChartData} height={200} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md='12' lg='12' className='mb-4'>
            <MDBCard narrow>
 
              <MDBCardBody>
                 <Line data={chartsData.lineChartData} options={{ responsive: true }} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
    </>
}

export default Dashboard