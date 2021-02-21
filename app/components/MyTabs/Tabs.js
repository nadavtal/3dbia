import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBAnimation,
  MDBIcon,
} from "mdbreact";

const Tabs = ({
    tabs,
    header,
    children,
    tabContentWrapperStyle,
    headerWrapperClassName,
    navWrapperClassName,
    navItemClassName,
    style,
    selectedTab,
    onTabClick
})  => {
  // console.log('selectedTab', selectedTab)
  const [activeItemOuterTab, setActiveItemOuterTab] = useState(selectedTab ? selectedTab : tabs[0].name);
  // useEffect(() => {
  //   setActiveItemOuterTab(selectedTab)

  // }, [selectedTab])
  const toggleOuterTabs = tabName => {
      
    if (activeItemOuterTab !== tabName) {
        setActiveItemOuterTab(tabName)
    }
  };
    
    return (
      <div className="classic-tabs">
        {/* <MDBNav tabs className="nav-justified " > */}
        <MDBNav classicTabs
          className={navWrapperClassName}
          style={style}>
          {tabs.map(tab => (
            <MDBNavItem 
              
              key={tab.name}
              onClick={() => onTabClick ? onTabClick(tab.name) : setActiveItemOuterTab(tab.name) }
              className={navItemClassName}
              >
              {/* <div
                className={`tab Ripple-parent ${activeItemOuterTab ===
                  tab.name && 'active'}`}
                onClick={toggleOuterTabs(tab.name)}
                role="tab"
              >
                {tab.name}
              </div> */}
              <MDBNavLink
                className=""
                link
                to="#"
                active={selectedTab ? selectedTab === tab.name : activeItemOuterTab === tab.name}
                onClick={e => {
                  e.preventDefault();
                }}
                role="tab"
              >
                <div
                  className={`tab fullWidth fullHeight ${selectedTab 
                    ? selectedTab === tab.name && 'active'
                    : activeItemOuterTab === tab.name && 'active'}`}
                  //   onClick={() => toggleOuterTabs(tab.name)}
                  role="tab"
                >
                  {tab.name}
                </div>
              </MDBNavLink>
            </MDBNavItem>
          ))}
        </MDBNav>
        <MDBTabContent
          style={tabContentWrapperStyle}
          // className="scrollbar scrollbar-primary"
          activeItem={selectedTab ? selectedTab : activeItemOuterTab}
        >
          {header && <div className={headerWrapperClassName}>{header}</div>}
          {tabs.map((tab, index) => (
            <MDBTabPane key={tab.name} tabId={tab.name} role="tabpanel" className="">
              {children && (
                <MDBAnimation type="fadeIn">{children[index]}</MDBAnimation>
              )}
            </MDBTabPane>
          ))}
          {/* <MDBTabPane tabId="1" role="tabpanel" />
          <MDBTabPane tabId="2" role="tabpanel" /> */}
        </MDBTabContent>
      </div>
    );
  
}
export default Tabs