import React, { Component } from 'react';
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
import usFlag from '../../flags/us.png';
import inFlag from '../../flags/in.png';
import cnFlag from '../../flags/cn.png';
import plFlag from '../../flags/pl.png';
import itFlag from '../../flags/it.png';
import { Line, Bar, Doughnut, Pie, Radar, Polar } from 'react-chartjs-2';
import SideMenu from '../../components/SideMenu/SideMenu';
import Layout from '../Layout/Layout'
import { VectorMap } from 'react-jvectormap';
import { menus } from '../../../menu-templates';
import './Admin.css';
// localStorage.removeItem('currentUser')


class Admin extends Component {
  state = {
    buttonStyle: {
      transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
      opacity: '0'
    }
  };

  onHover = () => {
    this.setState({
      buttonStyle: {
        transform: 'scaleY(1) scaleX(1) translateY(0) translateX(0)',
        opacity: '1'
      }
    });
  };

  onMouseLeave = () => {
    this.setState({
      buttonStyle: {
        transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
        opacity: '0'
      }
    });
  };

  render() {
    const menu = menus['admin'];
    console.log(menu)
    return (
      <>
        <SideMenu 
          // currentCompany={props.organization} 
          menu={menu} 
          />
        {/* Line Chart */}
        {/* <section className='my-4'>
          <MDBCard cascade narrow>
            <section>
              <MDBRow>
                <MDBCol xl='5' lg='12' className='mr-0'>
                  <div className='view view-cascade gradient-card-header light-blue lighten-1'>
                    <h2 className='h2-responsive mb-0'>Sales</h2>
                  </div>
                  <MDBCardBody cascade className='pb-0'>
                    <MDBCardBody className='row pt-3'>
                      <MDBCol md='6'>
                        <p className='lead'>
                          <span className='badge info-color p-2'>
                            Data range
                          </span>
                        </p>
                        <MDBSelect>
                          <MDBSelectInput selected='Choose time period' />
                          <MDBSelectOptions>
                            <MDBSelectOption disabled>
                              Choose time period
                            </MDBSelectOption>
                            <MDBSelectOption value='1'>Today</MDBSelectOption>
                            <MDBSelectOption value='2'>
                              Yesterday
                            </MDBSelectOption>
                            <MDBSelectOption value='3'>
                              Last 7 days
                            </MDBSelectOption>
                            <MDBSelectOption value='3'>
                              Last 30 days
                            </MDBSelectOption>
                            <MDBSelectOption value='3'>
                              Last week
                            </MDBSelectOption>
                            <MDBSelectOption value='3'>
                              Last month
                            </MDBSelectOption>
                          </MDBSelectOptions>
                        </MDBSelect>

                        <p className='lead mt-5'>
                          <span className='badge info-color p-2'>
                            Custom date
                          </span>
                        </p>
                        <br />
                        <div className='mb-1'>
                          <MDBRow>
                            <MDBCol size='12' className='mb-2'>
                              <small className='grey-text'>from:</small>
                              <MDBDatePicker className='my-0 d-inline ml-3' />
                            </MDBCol>
                            <MDBCol size='12'>
                              <small className='grey-text'>to:</small>
                              <MDBDatePicker className='my-0 d-inline ml-3' />
                            </MDBCol>
                          </MDBRow>
                        </div>
                      </MDBCol>
                      <MDBCol md='6' className='text-center'>
                        <div style={{ marginBottom: '0.5rem' }}>
                          Total sales: <strong>$2000</strong>
                          <MDBTooltip>
                            <MDBBtn color='info' className='btn-sm p2 d-inline'>
                              <MDBIcon icon='question' />
                            </MDBBtn>
                            <div>Total sales in the given period</div>
                          </MDBTooltip>
                        </div>
                        <br />

                        <div style={{ marginBottom: '0.5rem' }}>
                          Average sales: <strong>$100</strong>
                          <MDBTooltip>
                            <MDBBtn color='info' className='btn-sm p2 d-inline'>
                              <MDBIcon icon='question' />
                            </MDBBtn>
                            <div>Average daily sales in the given period</div>
                          </MDBTooltip>
                        </div>
                        <br />
                        <div className='my-4'>
                          <MDBSimpleChart
                            strokeColor='red'
                            strokeWidth={3}
                            width={100}
                            height={100}
                            percent={76}
                            labelFontWeight='normal'
                          />
                        </div>
                        <h5>
                          <MDBBadge color='red' className='accent-2 p-2'>
                            Change{' '}
                            <MDBIcon
                              icon='arrow-circle-down'
                              className='ml-1'
                            />
                          </MDBBadge>
                          <MDBTooltip>
                            <MDBBtn color='info' className='btn-sm p2 d-inline'>
                              <MDBIcon icon='question' />
                            </MDBBtn>
                            <div>
                              Percentage change compared to the same period in
                              the past
                            </div>
                          </MDBTooltip>
                        </h5>
                      </MDBCol>
                    </MDBCardBody>
                  </MDBCardBody>
                </MDBCol>
                <MDBCol xl='7' lg='12' className='mb-4'>
                  <MDBView
                    cascade
                    className='gradient-card-header blue-gradient'
                  >
                    <Line data={lineChartData} options={lineChartOptions} />
                  </MDBView>
                </MDBCol>
              </MDBRow>
            </section>

            <section>
              <div
                className='p-2 mx-4 mb-5'
                style={{ border: '1px solid #e0e0e9' }}
              >
              </div>
            </section>
          </MDBCard>
        </section> */}
        {/* Bar Chart & Doughnut chart */}
        <section className="mb-2">
          <MDBCard narrow>
            <MDBRow>
              <MDBCol xl="5" md="12" className="mb-4">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <h4 className="h4-responsive text-center mb-3">
                      Visits by Browser
                    </h4>
                    <Doughnut
                      data={doughnutChartData}
                      options={doughnutChartOptions}
                      height={200}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol xl="7" md="12" className="mb-4">
                <MDBView
                  cascade
                  className="gradient-card-header primary-color"
                >
                  <Bar
                    data={barChartData}
                    options={barChartOptions}
                    height={300}
                    width={600}
                  />
                </MDBView>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </section>
        <section>
          <MDBRow className="mb-4">
            <MDBCol md="12" lg="3" className="mb-4">
              <MDBCard narrow>
                <MDBView cascade className="gradient-card-header blue">
                  <h5 className="mb-0">Polar chart</h5>
                </MDBView>
                <MDBCardBody>
                  <Polar data={polarChartData} height={200} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" lg="3" className="mb-4">
              <MDBCard narrow>
                <MDBView cascade className="gradient-card-header blue">
                  <h5 className="mb-0">Pie chart</h5>
                </MDBView>
                <MDBCardBody>
                  <Pie data={polarChartData} height={200} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" lg="3" className="mb-4">
              <MDBCard narrow>
                <MDBView cascade className="gradient-card-header blue">
                  <h5 className="mb-0">Doughnut chart</h5>
                </MDBView>
                <MDBCardBody>
                  <Doughnut data={polarChartData} height={200} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" lg="3" className="mb-4">
              <MDBCard narrow>
                <MDBView cascade className="gradient-card-header blue">
                  <h5 className="mb-0">Radar chart</h5>
                </MDBView>
                <MDBCardBody>
                  <Radar data={radarChartData} height={200} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </section>
        {/* Messages & User activity */}
        {/* <section className="mb-5">
         <MDBRow>
          <MDBCol lg='6' md='12'>

          <MDBCard
              color='red accent-2'
              className='text-center mb-4 py-3 text-white'
            >
              <MDBIcon icon='bell' size='3x' className='mb-3' />
              <h4 className='h4-responsive'>28 important messages</h4>
            </MDBCard>

            <section className='mt-lg-5'>
              <MDBRow>
                <MDBCol md='6' className='mb-4'>
                  <MDBCard>
                    <MDBCardHeader color='grey darken-1'>Orders</MDBCardHeader>
                    <h6 className='ml-4 pt-4 mt-1 dark-grey-text font-weight-bold'>
                      <MDBIcon
                        icon='long-arrow-alt-up'
                        className='blue-text mr-3'
                        aria-hidden='true'
                      />{' '}
                      2000
                    </h6>
                    <MDBCardBody>
                      <MDBProgress
                        value={45}
                        barClassName='bg-primary'
                        height='6px'
                      />
                      <p className='font-small grey-text'>
                        Better than last week (25%)
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md='6' className='mb-4'>
                  <MDBCard>
                    <MDBCardHeader color='warning-color'>
                      Monthly Sales
                    </MDBCardHeader>
                    <h6 className='ml-4 pt-4 mt-1 dark-grey-text font-weight-bold'>
                      <MDBIcon
                        icon='long-arrow-alt-up'
                        className='blue-text mr-3'
                        aria-hidden='true'
                      />
                      $ 2000
                    </h6>
                    <MDBCardBody>
                      <MDBProgress
                        value={65}
                        barClassName='bg-primary'
                        height='6px'
                      />
                      <p className='font-small grey-text'>
                        Better than last week (25%)
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>

          </MDBCol>
          <MDBCol lg='6' md='12'>
            <MDBCard className='mb-4'>
              <MDBCardHeader className='primary-color text-white'>
                Users activity
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow className='mb-1'>
                  <MDBCol col='4'>
                    <small className='grey-text'>Pages/Visits</small>
                    <h4>139 419</h4>
                  </MDBCol>
                  <MDBCol col='4'>
                    <small className='grey-text'>New visitors</small>
                    <h4>51.94%</h4>
                  </MDBCol>
                  <MDBCol col='4'>
                    <small className='grey-text'>Last week</small>
                    <h4>51 932</h4>
                  </MDBCol>
                </MDBRow>

                <MDBRow className='mb-1'>
                  <MDBCol col='4'>
                    <small className='grey-text'>Pages/Visits</small>
                    <h4>139 419</h4>
                  </MDBCol>
                  <MDBCol col='4'>
                    <small className='grey-text'>New visitors</small>
                    <h4>51.94%</h4>
                  </MDBCol>
                  <MDBCol col='4'>
                    <small>Last week</small>
                    <h4>51 932</h4>
                  </MDBCol>
                </MDBRow>

                <MDBRow className='mb-1'>
                  <MDBCol col='4'>
                    <small className='grey-text'>Pages/Visits</small>
                    <h4>139 419</h4>
                  </MDBCol>
                  <MDBCol col='4'>
                    <small className='grey-text'>New visitors</small>
                    <h4>51.94%</h4>
                  </MDBCol>
                  <MDBCol col='4'>
                    <small className='grey-text'>Last week</small>
                    <h4>51 932</h4>
                  </MDBCol>
                </MDBRow>
                <MDBBtn
                  flat
                  rounded
                  className='grey lighten-3 float-right font-weight-bold dark-grey-text'
                >
                  View full report
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
           </MDBCol>
          </MDBRow>
        </section>
         {/* Projects by country */}
        {/* <section className='mb-4'>
          <MDBCard narrow>
            <MDBRow className='mb-4'>
              <MDBCol xl='5' md='12'>
                <MDBView
                  cascade
                  className='gradient-card-header light-blue lighten-1'
                >
                  <h4 className='h4-responsive font-weight-bold mb-0'>
                    Projects by country
                  </h4>
                </MDBView>
                <MDBCardBody cascade className='pb-0'>
                  <MDBCardBody className='pt-2'>
                    <MDBTable className='no-header'>
                      <tbody>
                        <tr>
                          <td>
                            <img src={usFlag} className='flag mr-2' alt='flag' />{' '}
                            United States
                          </td>
                          <td>307</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={inFlag} className='flag mr-2' alt='flag' />{' '}
                            India
                          </td>
                          <td>504</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={cnFlag} className='flag mr-2' alt='flag' />{' '}
                            China
                          </td>
                          <td>613</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={plFlag} className='flag mr-2' alt='flag' />{' '}
                            Poland
                          </td>
                          <td>208</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={itFlag} className='flag mr-2' alt='flag' />{' '}
                            Italy
                          </td>
                          <td>314</td>
                        </tr>
                      </tbody>
                    </MDBTable>
                    <MDBBtn
                      flat
                      rounded
                      className='grey lighten-3 float-right font-weight-bold dark-grey-text mb-4'
                    >
                      View full report
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCardBody>
              </MDBCol>
              <MDBCol xl='7' md='12' className='mb-4'>
                <MDBView cascade className='gradient-card-header blue-gradient'>
                  <div style={{ width: '100%', height: 400 }}>
                    <VectorMap
                      map={'world_mill'}
                      backgroundColor='rgba(255,255,255,0)'
                      containerStyle={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </div>
                </MDBView>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </section> */}
        {/* Pie & Radar charts */}
        {/* <section className='mb-5'>
          <MDBRow>
            <MDBCol lg='4' md='12' className='mb-4'>
              <MDBCard narrow>
                <MDBView
                  cascade
                  className='gradient-card-header gradient-card-header deep-blue-gradient'
                >
                  <Pie data={pieChartData} options={pieChartOptions} />
                </MDBView>
                <MDBCardBody cascade className='text-center'>
                  <MDBListGroup className='list-panel'>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Cras justo odio{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Dapibus ac facilisi{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Morbi leo risus{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Porta ac consectet{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Vestibulum at eros
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg='4' md='12' className='mb-4'>
              <MDBCard narrow>
                <MDBView
                  cascade
                  className='gradient-card-header primary-color gradient-card-header blue-gradient'
                >
                  <Bar data={barChartData} options={barChartOptions} />
                </MDBView>
                <MDBCardBody cascade className='text-center'>
                  <MDBListGroup className='list-panel'>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Cras justo odio{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Dapibus ac facilisi{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Morbi leo risus{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Porta ac consectet{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Vestibulum at eros
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg='4' md='12' className='mb-4'>
              <MDBCard narrow>
                <MDBView
                  cascade
                  className='gradient-card-header gradient-card-header purple-gradient'
                >
                  <Radar data={radarChartData} options={radarChartOptions} />
                </MDBView>
                <MDBCardBody cascade className='text-center'>
                  <MDBListGroup className='list-panel'>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Cras justo odio{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Dapibus ac facilisi{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Morbi leo risus{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Porta ac consectet{' '}
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      tag='a'
                      href='#'
                      className='d-flex justify-content-between dark-grey-text'
                    >
                      Vestibulum at eros
                      <MDBIcon icon='wrench' className='ml-auto' />
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </section> */}{' '}
        */}
        {/* <section>
          <MDBRow>
            <MDBCol xl='5' md='12'>
              <MDBCard className='mb-4'>
                <MDBRow>
                  <MDBCol md='12' className='text-center'>
                    <h5 className='mt-4 mb-4 font-weight-bold'>Monthly Sales</h5>
                  </MDBCol>
                </MDBRow>
                <MDBCardBody>
                  <MDBProgress
                    className='mb-2 mt-1'
                    value={25}
                    barClassName='warning-color'
                  />
                  <p className='font-small grey-text mb-4'>January</p>
                  <MDBProgress
                    className='mb-2'
                    value={35}
                    barClassName='red accent-2'
                  />
                  <p className='font-small grey-text mb-4'>Febuary</p>
                  <MDBProgress
                    className='mb-2'
                    value={85}
                    barClassName='primary-color'
                  />
                  <p className='font-small grey-text mb-4'>Febuary</p>
                  <MDBProgress
                    className='mb-2'
                    value={70}
                    barClassName='light-blue lighten-1'
                  />
                  <p className='font-small grey-text mb-4'>Febuary</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol xl='3' md='6' className='mb-2'>
              <MDBCard>
                <MDBRow className='mt-4 mb-3'>
                  <MDBCol md='3' col='3' className='text-left pl-4'>
                    <a className='p-2 m-2 fa-lg fb-ic' href='!#'>
                      <MDBIcon
                        fab
                        icon='facebook'
                        size='2x'
                        className='blue-text'
                      />
                    </a>
                  </MDBCol>
                  <MDBCol md='9' col='9' className='text-right pr-5'>
                    <p className='font-small grey-text mb-1'>Facebook Users</p>
                    <h5 className='ml-4 mb-2 font-weight-bold'>4,567 </h5>
                  </MDBCol>
                </MDBRow>
              </MDBCard>

              <MDBCard className='mt-4'>
                <MDBRow className='mt-4 mb-3'>
                  <MDBCol md='3' col='3' className='text-left pl-4'>
                    <a className='p-2 m-2 fa-lg fb-ic' href='!#'>
                      <MDBIcon
                        fab
                        icon='google-plus'
                        size='2x'
                        className='red-text'
                      />
                    </a>
                  </MDBCol>
                  <MDBCol md='9' col='9' className='text-right pr-5'>
                    <p className='font-small grey-text mb-1'>Google+ Users</p>
                    <h5 className='ml-4 mb-2 font-weight-bold'>2,669 </h5>
                  </MDBCol>
                </MDBRow>
              </MDBCard>

              <MDBCard className='mt-4 mb-4'>
                <MDBRow className='mt-4 mb-3'>
                  <MDBCol md='3' col='3' className='text-left pl-4'>
                    <a className='p-2 m-2 fa-lg fb-ic' href='!#'>
                      <MDBIcon
                        fab
                        icon='facebook'
                        size='2x'
                        className='cyan-text'
                      />
                    </a>
                  </MDBCol>
                  <MDBCol md='9' col='9' className='text-right pr-5'>
                    <p className='font-small grey-text mb-1'>Twitter Users</p>
                    <h5 className='ml-4 mb-2 font-weight-bold'>3,562 </h5>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>

            <MDBCol xl='4' md='6' className='mb-2'>
              <MDBCard className='mb-4'>
                <MDBCardBody>
                  <MDBTable responsive>
                    <thead>
                      <tr>
                        <th className='font-weight-bold dark-grey-text'>
                          <strong>Month</strong>
                        </th>
                        <th className='font-weight-bold dark-grey-text'>
                          <strong>Visits</strong>
                        </th>
                        <th className='font-weight-bold dark-grey-text'>
                          <strong>Sales</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>January</td>
                        <td>15</td>
                        <td>307</td>
                      </tr>
                      <tr>
                        <td>Febuary</td>
                        <td>32</td>
                        <td>504</td>
                      </tr>
                      <tr>
                        <td>March</td>
                        <td>41</td>
                        <td>613</td>
                      </tr>
                    </tbody>
                  </MDBTable>
                  <MDBBtn
                    flat
                    rounded
                    className='grey lighten-3 float-right font-weight-bold dark-grey-text'
                  >
                    View full report
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </section> */}
        {/* <section className="mb-5">
          <MDBRow>
            <MDBCol xl='3' lg='6' md='12'>
              <MDBSelect style={{ margin: 0 }}>
                <MDBSelectInput selected='Bulk actions' />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>Bulk actions</MDBSelectOption>
                  <MDBSelectOption value='1'>Delete</MDBSelectOption>
                  <MDBSelectOption value='2'>Export</MDBSelectOption>
                  <MDBSelectOption value='3'>
                    Change segment
                  </MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect>
            </MDBCol>

            <MDBCol xl='3' lg='6' md='12'>
              <MDBSelect style={{ margin: 0 }}>
                <MDBSelectInput selected='Show only' />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>Show only</MDBSelectOption>
                  <MDBSelectOption value='1'>All (2000)</MDBSelectOption>
                  <MDBSelectOption value='2'>
                    Never opened (200)
                  </MDBSelectOption>
                  <MDBSelectOption value='3'>
                    Opened but unanswered (1600)
                  </MDBSelectOption>
                  <MDBSelectOption value='4'>
                    Answered (200)
                  </MDBSelectOption>
                  <MDBSelectOption value='5'>
                    Unsubscribed (50)
                  </MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect>
            </MDBCol>
            <MDBCol xl='3' lg='6' md='12'>
              <MDBSelect style={{ margin: 0 }}>
                <MDBSelectInput selected='Filter segments' />
                <MDBSelectOptions>
                  <MDBSelectOption disabled>
                    Filter segments
                  </MDBSelectOption>
                  <MDBSelectOption value='1'>
                    Contacts in no segments <span> (100)</span>
                  </MDBSelectOption>
                  <MDBSelectOption value='2'>
                    Segment 1 <span> (2000)</span>
                  </MDBSelectOption>
                  <MDBSelectOption value='3'>
                    Segment 2 <span> (1000)</span>
                  </MDBSelectOption>
                  <MDBSelectOption value='4'>
                    Segment 3 <span> (4000)</span>
                  </MDBSelectOption>
                </MDBSelectOptions>
              </MDBSelect>
            </MDBCol>
            <MDBCol xl='3' lg='6' md='12' style={{ display: 'flex' }}>
              <form className='form-inline ml-2'>
                <div className='form-group md-form py-0 mt-0'>
                  <input
                    className='form-control w-80'
                    type='text'
                    placeholder='Search'
                  />
                  <MDBBtn
                    size='sm'
                    color='primary'
                    className='d-inline ml-2 px-2'
                  >
                    <MDBIcon icon='search' />
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
          <MDBCard narrow className='z-depth-0'>
          <MDBView
            cascade
            className='gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center'
          >
            <div className='text-left'>
              <MDBBtn
                outline
                color='white'
                rounded
                size='sm'
                className='px-2'
              >
                <MDBIcon icon='th-large' className='mt-0' />
              </MDBBtn>
              <MDBBtn
                outline
                color='white'
                rounded
                size='sm'
                className='px-2'
              >
                <MDBIcon icon='columns' className='mt-0' />
              </MDBBtn>
            </div>

            <a href='#!' className='white-text mx-3'>
              Table name
            </a>

            <div className='text-right'>
              <MDBBtn
                outline
                color='white'
                rounded
                size='sm'
                className='px-2'
              >
                <MDBIcon icon='pencil-alt' className='mt-0' />
              </MDBBtn>
              <MDBBtn
                outline
                color='white'
                rounded
                size='sm'
                className='px-2'
              >
                <MDBIcon icon='times' className='mt-0' />
              </MDBBtn>
              <MDBBtn
                outline
                color='white'
                rounded
                size='sm'
                className='px-2'
              >
                <MDBIcon icon='info-circle' className='mt-0' />
              </MDBBtn>
            </div>
          </MDBView>
          <div className='px-4'>
            <MDBTable hover responsive>
              <thead>
                <tr>
                  <th>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox'
                    />
                    <label
                      htmlFor='checkbox'
                      className='form-check-label mr-2 label-table'
                    />
                  </th>
                  <th className='th-lg'>
                    First Name
                    <MDBIcon icon='sort' className='ml-1' />
                  </th>
                  <th className='th-lg'>
                    Last Name
                    <MDBIcon icon='sort' className='ml-1' />
                  </th>
                  <th className='th-lg'>
                    Username
                    <MDBIcon icon='sort' className='ml-1' />
                  </th>
                  <th className='th-lg'>
                    Email
                    <MDBIcon icon='sort' className='ml-1' />
                  </th>
                  <th className='th-lg'>
                    Country
                    <MDBIcon icon='sort' className='ml-1' />
                  </th>
                  <th className='th-lg'>
                    City
                    <MDBIcon icon='sort' className='ml-1' />
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox1'
                    />
                    <label htmlFor='checkbox1' className='label-table' />
                  </th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>markotto@gmail.com</td>
                  <td>USA</td>
                  <td>San Francisco</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox2'
                    />
                    <label htmlFor='checkbox2' className='label-table' />
                  </th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>jacobt@gmail.com</td>
                  <td>France</td>
                  <td>Paris</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox3'
                    />
                    <label htmlFor='checkbox3' className='label-table' />
                  </th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>larrybird@gmail.com</td>
                  <td>Germany</td>
                  <td>Berlin</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox4'
                    />
                    <label htmlFor='checkbox4' className='label-table' />
                  </th>
                  <td>Paul</td>
                  <td>Topolski</td>
                  <td>@P_Topolski</td>
                  <td>ptopolski@gmail.com</td>
                  <td>Poland</td>
                  <td>Warsaw</td>
                </tr>
                <tr>
                  <th scope='row'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='checkbox5'
                    />
                    <label htmlFor='checkbox5' className='label-table' />
                  </th>
                  <td>Anna</td>
                  <td>Doe</td>
                  <td>@andy</td>
                  <td>annadoe@gmail.com</td>
                  <td>Spain</td>
                  <td>Madrid</td>
                </tr>
              </tbody>
            </MDBTable>
            <hr className='my-0' />
            <MDBSelect className='colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down'>
              <MDBSelectInput selected='Rows number' />
              <MDBSelectOptions>
                <MDBSelectOption disabled>Rows number</MDBSelectOption>
                <MDBSelectOption value='1'>5 rows</MDBSelectOption>
                <MDBSelectOption value='2'>25 rows</MDBSelectOption>
                <MDBSelectOption value='3'>50 rows</MDBSelectOption>
                <MDBSelectOption value='4'>100 rows</MDBSelectOption>
              </MDBSelectOptions>
            </MDBSelect>

            <MDBPagination circle className='my-4 float-right'>
              <li className='page-item disabled clearfix d-none d-md-block'>
                <a className='page-link' href='#!'>
                  First
                </a>
              </li>
              <MDBPageItem disabled>
                <MDBPageNav className='page-link' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                  <span className='sr-only'>Previous</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active>
                <MDBPageNav className='page-link'>
                  1 <span className='sr-only'>(current)</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>2</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>3</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>4</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>5</MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link' aria-label='Next'>
                  <span aria-hidden='true'>&raquo;</span>
                  <span className='sr-only'>Next</span>
                </MDBPageNav>
              </MDBPageItem>
            </MDBPagination>
          </div>
        </MDBCard>

        </section> */}
        <MDBBtnFixed
          onMouseEnter={this.onHover}
          onMouseLeave={this.onMouseLeave}
          floating
          color="red"
          icon="pencil-alt"
          style={{ bottom: '100px', right: '24px' }}
        >
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color="red"
            icon="star"
          />
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color="yellow"
            icon="user"
          />
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color="green"
            icon="envelope"
          />
          <MDBBtnFixedItem
            buttonStyle={this.state.buttonStyle}
            color="blue"
            icon="shopping-cart"
            onClick={this.handleClick}
          />
        </MDBBtnFixed>
      </>
    );
  }
}

export default Admin;
