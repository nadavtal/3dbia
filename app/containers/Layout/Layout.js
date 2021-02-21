import React from 'react'
import styled from 'styled-components';


const Layout = () => {

    const ViewWrapper = styled.div`
        background-color: red;
        width: 100vw;
        height: 100vh
    
        
    `;
    return <>
        <SideMenu
          menuType="providerMenu"
          onMenuClick={(name) => console.log(name)}
          onSubMenuClick={(name) => console.log(name)}
          linkToProviderPage={(provider_id) => console.log(provider_id)}
          // changeWorkSpace={(orgId) => changeWorkSpace(orgId)}
          currentUser={localStorage.getItem('currentUser')}
          onFinalItemClick={(menuItem, menuType) => {
            if (menuItem.org_id) console.log(menuItem.org_id)
            else if (menuItem.provider_id) console.log(menuItem.provider_id)
          }}

          />
          <ViewWrapper />
    </>
}

export default Layout