import React, { useState, useEffect, memo, useMemo} from 'react';
import { useHistory} from 'react-router-dom';
import Layout from 'containers/Management/Layout';
import Filters from 'components/Filters/Filters'
import {  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBCol ,
  MDBIcon,
  MDBCardGroup,
  MDBCard,
  MDBView,
  MDBCardFooter,
  MDBAnimation,
  MDBPagination,
  MDBBtn,
  MDBMask,
  MDBCardBody,
  MDBPageItem,
  MDBPageNav,
  MDBSwitch
  } from "mdbreact";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import {newBridgeCreated} from 'containers/Organizations/Organization/actions'
import { makeSelectCurrentUser, makeSelectCurrentUserRole } from 'containers/App/selectors';
import { ExportService } from 'containers/Wijmo/export';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import TextSearch from 'components/TextSearch/TextSearch';
import DataTable from '../../components/DataTable/DataTable';
import MyWijmoDetailedTable from 'containers/MyTables/MyWijmoDetailedTable'; 
// import DetailedTable from 'containers/MyTables/DetailedTable'; 
import * as actions from './actions'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
const key = 'projectsPage';
import saga from './saga';
import './Projects.css';
import { searchAll } from 'utils/dataUtils';
import { MenuItem } from 'react-bootstrap';


export function Projects(props) {

  useInjectSaga({ key, saga });
  const [tableMode, setTableMode] = useState(false);
  const [selection, setSelection] = useState([]);
  const [searchResults, setSearchResults] = useState(props.items);
  useEffect(() => {
    // console.log('[ProjectwPage.js] useEffect', props.projects);

  }, [tableMode]);

  const history = useHistory()
  const projectsCards = searchResults.map((item, index) => {
    const scrollContainerStyle = {
      width: "100%", 
    //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
      height: `3rem`, 
      maxHeight: `3rem`, 
      overFlowY: 'auto',
      overFlowX: 'hidden'
    };
    return (
      <MDBCol md="4" key={index}>
        <MDBCard className="mb-5" narrow>
          <MDBView cascade hover>
            <img
              onClick={() =>
                props.onProjectClick(
                  item.bid ? item.bid : item.id,
                  item.organization_id,
                )
              }
              src={
                item.image_url && item.image_url.length
                  ? item.image_url
                  : require('../../images/LOGIN.jpg')
              }
              className="img-fluid projectImage"
              alt={item.name}
            />
          </MDBView>
          <MDBCardBody
            onClick={() =>
              props.onProjectClick(
                item.bid ? item.bid : item.id,
                item.organization_id,
              )
            }
          >
            <h4 className="card-title">{item.name}</h4>
            <div
              style={scrollContainerStyle}
              className="scrollbar scrollbar-primary"
            >
              <p className="card-text">{item.description}</p>
            </div>
          </MDBCardBody>
          <MDBCardFooter className="links-light">
            <span className="pull-left pt-2">
              <a href="#!">
                <MDBIcon icon="share-alt" className="mr-2" />
              </a>
            </span>
            <span className="float-right">
              <div
                className="waves-effect p-2"
                onClick={() =>
                  props.onProjectClick(
                    item.bid ? item.bid : item.id,
                    item.organization_id,
                  )
                }
              >
                View item <MDBIcon icon="image" className="ml-1" />
              </div>
            </span>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    );
  })
  const handleSearch = (val, data) => {
    if (val == '') {
      setSearchResults(props.items)
    } else {
      setSearchResults(searchAll(val, props.items))
    }
  }


  console.log('searchResults', searchResults)
  const bridgesLength = searchResults.length
  // console.log(bridgesLength)
  const Header = ({length}) => (
    
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex"> 
          <MDBSwitch
            className="mt-2 color-white"
            checked={tableMode}
            onChange={() => setTableMode(!tableMode)}
            labelLeft=""
            labelRight={`${tableMode ? 'Card view' : 'Table view'}`}
          />
        <MDBAnimation type="fadeIn" className="d-flex">
          {useMemo(() => <TextSearch
            className={`ml-3 mt-0 color-white ${tableMode && 'hide-content'}`}
            // value=""
            onChange={val => handleSearch(val)}
          />, [])}
        </MDBAnimation>
      </div>
      <div className="bold color-white">
        <h5>{`Bridges (${length})`}</h5>
        {/* <h5>{`Bridges`}</h5> */}
      </div>
      <div className={!props.enableCreateBridge && 'hide-content'}>
        <MDBBtn
          size="sm"
          rounded
          className="createBridgeButton bgSecondary"
          onClick={() => props.createNewBridge()}
        >
          Create new bridge <MDBIcon icon="image" className="ml-1" />
        </MDBBtn>

      </div>
    </div>
  );

  const scrollContainerStyle = {
    width: "100%", 
   //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
    maxHeight: `75vh`, 
    overFlowY: 'auto',
    overFlowX: 'hidden'
   };

  const Component = () => {
     return (
       <div 
        style={scrollContainerStyle}
        className="scrollbar scrollbar-primary">
         {tableMode ? (
           <MDBAnimation type="fadeIn" className="">
             <MyWijmoDetailedTable
               className="bridgeDetailedTable"
               data={props.items}
               subData={props.surveys}
               exportService={new ExportService()}
               onRowClick={bridge => props.onProjectClick(bridge.bid)}
               tableConfig={{
                 exludesFields: [
                   'id',
                   'user_id',
                   'survey_id',
                   'provider_id',
                   'organization_id',
                   'role_type_id',
                 ],

                 editableFields: [],
                 longFields: [],
                 dateFields: [],
                 fixedColumns: [],
                 wholeNumberFields: [],
                 decimelNumberFields: [],
               }}
               connectingParentField="bid"
               connectingChildField="bid"
               detailedHeader="Surveys history"
               selectionMode="CellRange"
             />
           </MDBAnimation>
         ) : (
           <>
             <MDBAnimation type="fadeIn" className="">
               <MDBCardGroup deck>
                 <MDBRow>{projectsCards}</MDBRow>
               </MDBCardGroup>
             </MDBAnimation>
           </>
         )}
       </div>
     );
  }

  return (
    <MDBCard narrow>
      <MDBView
        cascade
        className="mdb-color color-white card-header bgPrimary"
      >
        {/* <MDBAnimation type="bounceInRight" className=""> */}
        {useMemo(() => <Header length={bridgesLength}/>, [tableMode])}
        {/* <Header length={bridgesLength}/> */}
        {/* </MDBAnimation> */}
      </MDBView>
      <MDBAnimation type="fadeIn" className="">
        <MDBCardBody className=""><Component /></MDBCardBody>
      </MDBAnimation>
    </MDBCard>
    // <Layout
    //   bodyTitle={'All surveys'}
    //   menuTitle="Filters"
    //   // menu={<Filters filters={filters} handleChange={handleFiletrChange} />}
    //   headerComponent={<Header />}
    //   component={<Component />}
    // />
  );


}

const mapStateToProps = createStructuredSelector({
  // currentUser: makeSelectCurrentUser(),
  // currentUserRole: makeSelectCurrentUserRole(),

});

export function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Projects);

