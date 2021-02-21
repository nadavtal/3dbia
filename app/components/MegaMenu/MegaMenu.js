import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
// import './webslidemenu.css';
// import './color-skins/grd-orange.css';
// import './color-skins/white-orange.css';
// import './dropdown-effects/fade-down.css';
import { MDBIcon, MDBBtn, MDBInput, MDBSwitch } from 'mdbreact';
import { menus } from '../../menu-templates';
import RolesDropDown from '../RolesDropDown/RolesDropDown';

const MegaMenu = ({
  menuType,
  onMenuClick,
  onSubMenuClick,
  categories,
  linkToProviderPage,
  changeWorkSpace,
  currentUser,
  history = useHistory(),
  onFinalItemClick
}) => {
  const menu = menus[menuType];
  // console.log(menu)

  const MenuItem = ({ item }) => {
    // console.log(item)
    return (
      <span onClick={() => onMenuClick(item.name)}>
        <MDBIcon icon={item.icon} size="2x" className="" />
        {item.name}
        {item.children && <span className="wsarrow" />}
      </span>
    );
  };

  const SubMenuItem = ({ parent, item }) => {
    return (
      <span onClick={() => onSubMenuClick(item.name)}>
        {item.children && <i
          className={`fas fa-angle-${
            parent.float === 'right' ? 'left' : 'right'
          }`}
        />}
        {item.name}{' '}
      </span>
    );
  };
  return (
    
    <nav className="wsmenu clearfix">
      <ul className="wsmenu-list">
        {menu.map(item => {
         
          switch (item.type) {
            case 'icon-menu':
              return (
                <li
                  key={item.name}
                  aria-haspopup="false"
                  className={`float-${item.float} iconMenu`}
                >
                  <span onClick={() => onMenuClick(item.name)}>
                    {item.counter && <span className="counter mt-4">2</span>}
                    <MDBIcon icon={item.icon} size="2x" className="" />
                  </span>
                </li>
              );
            case 'sub-menu':
              return (
                <li 
                  key={item.name}
                  aria-haspopup="true" 
                  className={`float-${item.float}`}>
                  <MenuItem item={item} 
                  />

                  {item.children && (
                    <ul className="sub-menu">
                      {item.children.map(child => (
                        <li aria-haspopup="true" key={child.name}>
                          <SubMenuItem parent={item} item={child} />

                          {child.children && child.children.length && (
                            <ul className="sub-menu">
                              {child.children.map(subChild => (
                                <li aria-haspopup="true" key={subChild.name}>
                                  <SubMenuItem parent={item} item={subChild} />
                                  {subChild.children && subChild.children.length && (
                                    <ul className="sub-menu"> 
                                      {subChild.children.map(finalItem => {
                                        
                                        return <li onClick={() =>  onFinalItemClick(finalItem, menuType)}>
                                          <span>
                                          {/* <i
                                            className={`fas fa-angle-${
                                              parent.float === 'right' ? 'left' : 'right'
                                            }`}
                                          /> */}
                                          {finalItem.name}{' '}
                                        </span>
                                        </li>
                                      })}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            case 'featured-menu':
              return (
                <li aria-haspopup="true" className={`float-${item.float}`}>
                  <MenuItem item={item} />
                  <div className="wsmegamenu clearfix ">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-4 col-md-12 col-xs-12">
                          <h3 className="title">Product Features</h3>
                          <div className="fluid-width-video-wrapper">
                            <img
                              src={require('../../images/LOGIN.jpg')}
                              alt=""
                            />{' '}
                          </div>
                          <p className="wsmwnutxt">
                            Lorem Ipsum is dummy text of the printing specimen
                            book. It has survived not only five centuries, but
                            also typesetting in the the contantly with
                            desktoncluding.
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12">
                          <h3 className="title">Blog Article </h3>
                          <div className="fluid-width-video-wrapper">
                            <img
                              src={require('../../images/LOGIN.jpg')}
                              alt=""
                            />{' '}
                          </div>
                          <p className="wsmwnutxt">
                            Lorem Ipsum is dummy text of the printing specimen
                            book. It has survived not only five centuries, but
                            also typesetting in the the contantly with
                            desktoncluding.
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12">
                          <h3 className="title">Highlight Your Services</h3>
                          <div className="fluid-width-video-wrapper">
                            <span>
                              <img
                                src={require('../../images/LOGIN.jpg')}
                                alt=""
                              />
                            </span>{' '}
                          </div>
                          <p className="wsmwnutxt">
                            Lorem Ipsum is dummy text of the printing specimen
                            book. It has survived not only five centuries, but
                            also typesetting in the the contantly with
                            desktoncluding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            case 'form-menu':
              return (
                <li aria-haspopup="true" className={`float-${item.float}`}>
                  <span onClick={() => onMenuClick(item.name)}>
                    <MDBIcon icon="cog" size="2x" className={``} />
                    {item.name}

                    <span className="wsarrow" />
                  </span>
                  <div className="wsmegamenu halfdiv">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-12">
                          {/* <RolesDropDown
                      userData={currentUser}
                      onProviderClick={(provider_id) => linkToProviderPage(provider_id)}
                      onOrganizationClick={(orgId) => changeWorkSpace(orgId)}
                      /> */}

                          <h3 className="title">Contact Form</h3>
                          <form name="contact_name" className="menu_form">
                            <input type="text" placeholder="Name" />
                            <input type="text" placeholder="Email" />
                            <textarea placeholder="Your message..." />
                            <input type="button" value="Reset" />
                            <input type="submit" value="Send" />
                          </form>
                          <div className="cl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            case 'category-menu':
              return <li aria-haspopup="true" className="float-left">
              <MenuItem item={item} />
              <div className="wsmegamenu clearfix">
                <div className="container-fluid">
                  <div className="row">
                      {item.categories.map(category => {
                          const children = item.categories.filter(subCategory => subCategory.parentCategories.includes(category.id))
                        //   console.log(children)
                          if (!category.parentCategories.length) {
                              return <ul className="col-lg-2 col-md-12 col-xs-12 link-list" key={category.id}>
                              <li className="title" key={category.name}>{category.name}</li>
                              {children.length && children.map(child => <li key={child.id}>
                                <span onClick={() => history.push(`./categories/${child.name}`)}>
                                 
                                  <MDBIcon icon={child.icon}
                                    size={'sm'}
                                    className={''}
                                    // border={props.border}
                                    // rotate={props.rotate}
                                    // pulse={props.pulse}
                                    // spin={props.spin}
                                    // far={'arrow-circle-right'}
                                    />
                                  {child.name}
                                </span>
                              </li>)}
                            </ul>
              
                          }
                      })}
                   
                  </div>
                </div>
              </div>
              </li>
            default:
              break;
          }
        })}

      </ul>
    </nav>
  );
};

export default memo(MegaMenu);

/* <li aria-haspopup="true" className="float-left">
<span  className="wshomeico active">
  <i className="fas fa-home" />
  <span className="hometext">&nbsp;&nbsp;Home</span>
</span>
</li>
<li aria-haspopup="true" className="float-left">
<span >
  <i className="fas fa-align-justify" />Projects<span className="wsarrow" />
</span>
<ul className="sub-menu">
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />My projects{' '}
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Create news project
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Browse projects
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Publish project
    </span>
  </li>
  <li aria-haspopup="true">
    <span >
      <i className="fas fa-angle-right" />Open Source Development
    </span>
    <ul className="sub-menu">
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 1
        </span>
      </li>
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 2
        </span>
      </li>
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 3
        </span>
      </li>
      <li aria-haspopup="true">
        <span >
          <i className="fas fa-angle-right" />Submenu item 4
        </span>
        <ul className="sub-menu">
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 1 Sub
            </span>
          </li>
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 2 Sub
            </span>
          </li>
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 3 Sub
            </span>
          </li>
          <li aria-haspopup="true">
            <span >
              <i className="fas fa-angle-right" />Submenu item 4 Sub
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</li>
<li aria-haspopup="true" className="float-left">
<span onClick={() => history.push('market/categories')}>
  <i className="fas fa-list-ul" />Categories <span className="wsarrow" />
</span>
<div className="wsmegamenu clearfix">
  <div className="container-fluid">
    <div className="row">
        {categories.map(category => {
            const children = categories.filter(subCategory => subCategory.parentCategories.includes(category.id))
          //   console.log(children)
            if (!category.parentCategories.length) {
                return <ul className="col-lg-2 col-md-12 col-xs-12 link-list" key={category.id}>
                <li className="title">{category.name}</li>
                {children.length && children.map(child => <li key={child.id}>
                  <span onClick={() => history.push(`./categories/${child.name}`)}>
                   
                    <MDBIcon icon={child.icon}
                      size={'sm'}
                      className={''}
                      // border={props.border}
                      // rotate={props.rotate}
                      // pulse={props.pulse}
                      // spin={props.spin}
                      // far={'arrow-circle-right'}
                      />
                    {child.name}
                  </span>
                </li>)}
              </ul>

            }
        })}
     
    </div>
  </div>
</div>
</li>
<li aria-haspopup="true" className="float-left">
<span >
  <i className="fas fa-th-large" />Featured <span className="wsarrow" />
</span>
<div className="wsmegamenu clearfix ">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 col-md-12 col-xs-12">
        <h3 className="title">Product Features</h3>
        <div className="fluid-width-video-wrapper">
          <img src={require('../../images/LOGIN.jpg')} alt="" />{' '}
        </div>
        <p className="wsmwnutxt">
          Lorem Ipsum is dummy text of the printing specimen book. It
          has survived not only five centuries, but also typesetting
          in the the contantly with desktoncluding.
        </p>
      </div>
      <div className="col-lg-4 col-md-12 col-xs-12">
        <h3 className="title">Blog Article </h3>
        <div className="fluid-width-video-wrapper">
          <img src={require('../../images/LOGIN.jpg')} alt="" />{' '}
        </div>
        <p className="wsmwnutxt">
          Lorem Ipsum is dummy text of the printing specimen book. It
          has survived not only five centuries, but also typesetting
          in the the contantly with desktoncluding.
        </p>
      </div>
      <div className="col-lg-4 col-md-12 col-xs-12">
        <h3 className="title">Highlight Your Services</h3>
        <div className="fluid-width-video-wrapper">
          <span >
            <img src={require('../../images/LOGIN.jpg')} alt="" />
          </span>{' '}
        </div>
        <p className="wsmwnutxt">
          Lorem Ipsum is dummy text of the printing specimen book. It
          has survived not only five centuries, but also typesetting
          in the the contantly with desktoncluding.
        </p>
      </div>
    </div>
  </div>
</div>
</li>
<li aria-haspopup="true" className="float-left">
<span >
  <i className="fas fa-paragraph" />Services <span className="wsarrow" />
</span>
<div className="wsmegamenu clearfix">
  <div className="typography-text clearfix">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <h3 className="title">3D Development</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took span galley of type and scrambled it to make span
            type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the
            1960s Ipsum more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Intergrations</h3>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply
            random text. It has roots in span piece of classical Latin
            literature from 45 BC, making it over 2000 years old.
            Richard McClintock, span Latin professor at Hampden-Sydney
            College in Virginia.
          </p>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Storage</h3>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply
            random text. It has roots in span piece of classical Latin
            literature from 45 BC, making it over 2000 years old.
            Richard McClintock, span Latin professor at Hampden-Sydney
            College in Virginia.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="cl" />

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Other Services</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-wordpress" />Wordpress Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-drupal" />Drupal Development
              </span>
            </li>
            <li>
              <span >
                <i className="fas fa-shopping-cart" />Shoping Cart
                Development
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">More Services</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-android" /> Android App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-apple" />iPhone App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-windows" />Windows App Development
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">Other Products</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-wordpress" />Wordpress Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-drupal" />Drupal Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-joomla" />Joomla Development
              </span>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-sm-12">
          <h3 className="title">More Services</h3>
          <ul>
            <li>
              <span >
                <i className="fab fa-android" /> Android App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-html5" />HTML5 App Development
              </span>
            </li>
            <li>
              <span >
                <i className="fab fa-paypal" />Paypal Store Integration
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</li>

<li aria-haspopup="true" className="float-right">
<MDBIcon icon="settings" size="2x" className='float-right' />
<span >
  <i className="fas fa-paper-plane" />Contact Us <span className="wsarrow" />
</span>
<div className="wsmegamenu halfdiv">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <h3 className="title">Contact Form</h3>
        <form name="contact_name" className="menu_form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <textarea placeholder="Your message..." />
          <input type="button" value="Reset" />
          <input type="submit" value="Send" />
        </form>
        <div className="cl" />
      </div>
    </div>
  </div>
</div>
</li>
<li aria-haspopup="false" className="float-right">
<span >
  <i className="fas fa-paper-plane" />Search <span className="wsarrow" />
</span>
<input type="text" placeholder="Search models" className="white p-1 mt-2"/>
{/* <i className="fas fa-search float-left" /> 
</li>
<li aria-haspopup="false" className="float-right iconMenu">
<span >
<span className='counter mt-4' >6</span>
<MDBIcon icon="envelope" size="2x" className='float-right' />
</span>
</li>
<li aria-haspopup="false" className="float-right iconMenu">
<span >
<span className='counter mt-4' >2</span>
<MDBIcon icon="shopping-cart" size="2x" className='float-right' />
</span>
</li>
<li aria-haspopup="false" className="float-right iconMenu">
<span >
<span className='counter mt-4' >2</span>
<MDBIcon icon="bell" size="2x" className='float-right' />
</span>
</li> */
