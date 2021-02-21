import { createGlobalStyle } from 'styled-components';
import './animations.css';
const fadeFactor1 = 0.1
const fadeFactor2 = 0.2
const fadeFactor3 = 0.3
const fadeFactor4 = 0.4
const fadeFactor5 = 0.5


// const createTheme = (colors, opacities) => {
//   colors.map(color => {
//     color.classes = {}
//     color.classes.opacities
//   })
//   let pallete = {
//     colors: colors,
//     borders: [],
//     backGround: []
//   }

// }

// const colors = [
//   {default: 'rgba(142, 168, 131, 1)'},
//   {primary: 'rgba(28, 50, 69, 1)'},
//   {secondary: 'rgba(142, 168, 131, 1)'},
// ]
// const opacities = [1, 1.5, 2, 5]
// const theme1 = createTheme(colors, opacities)

export const theme = {
  green: '#79BC1E',
  greenLight: '#A2D868',
  yellow: '#FFFF81',
  orange: '#FF892F',
  orange_2: '#FFA159',
  orange_3: '#FFB882',
  orange_white: '#FED0AC',
  cream: '#FFE6D5',
  turkize: '#66BDC7',
  turkizeLight: '#B9E0E4',
  offWhite: '#F1F1F1',
  darkBlue: 'hsla(208, 43%, 17%, 1)',
  default: 'rgba(142, 168, 131, 1)',
  primary: 'rgba(28, 50, 69, 1)',
  primaryLight: '#404B57',
  primaryFaded1: 'rgba(28, 50, 69, 0.05)',
  primaryFaded2: 'rgba(28, 50, 69, 0.07)',
  primaryFaded3: 'rgba(28, 50, 69, 0.15)',
  primaryFaded5: 'rgba(28, 50, 69, 0.5)',
  secondary: 'rgba(142, 168, 131, 1)',
  success: '#79BC1E',
  error: 'red',
  warning: '#FFE6D5',
  layout:  {
    topBarSize: '58px',
    footerHeight: '58px',
    rightChatWidth: '4.4rem'
  }
}

// .green-light {
//   color: #A2D868;
// }
// .green {
//   color: #79BC1E;
// }
// .yellow {
//   color: #FFFF81;
// }

// .orange {
//   color: #FF892F;
// }
// .orange-faded {
//   color: #FFB882;
// }
// .orange-faded-plus {
//   color: #FED0AC;
// }

// .turkize {
//   color: #66BDC7
// }
const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    max-width: 100vw;
    overflow: hidden;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  .tableRow .select-dropdown {
    // min-width: 7rem;
    font-size: .7rem !important;
    margin: 0 !important;
    border-bottom: 1px solid blue !important;
  }
  .tableRow .dropdown-content {
    min-width: 7rem;

  }
  .tableRow .md-form {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
  }

  .tableRow.active {
      background-color: rgba(255, 140, 0, 0.26);
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .fullHeight{
    height: 100% !important;
  }
  .halfHeight{
    height: 50% !important;
  }
  .fullWidth{
    width: 100% !important;
  }
  .screenWidth{
    width: 100vw !important;
  }
  .scrollbar {
    overflow: scroll;
  }
  
  .scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .scrollbar::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }
  
  /* custom colors  */
  .scrollbar-primary::-webkit-scrollbar {
    background-color: #F5F5F5;
  }
  .scrollbar-primary {
    scrollbar-color: #4285f4 #f5f5f5;
  }
  .scrollbar-primary::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: ${theme.secondary};
  }
  .wj-control [type="checkbox"] {
    opacity: 1 !important;
    position: relative !important;
  }

  // .wj-flexgrid {
  //     max-height: 35rem !important;
  //     font-size: .9rem;
  // }
  .w-75 {
    width: 75%;
  }
  .w-33 {
    width: 33.3%;
  }
  .pb-40 {
    padding-bottom: 4rem;
  }

  .pt-16 {
      padding-top: 1.6rem;
  }

  .flex-col {
      flex-direction: column;
  }

  .flex {
      display: flex;
  }

  .flex-grow {
    flex-grow: 1;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.my-8 {
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}

.mx-16 {
  margin-left: 1.6rem;
  margin-right: 1.6rem;
}

.mr-chat {
  margin-right: 5rem;
}

.flex-col {
  flex-direction: column;
}
.stickyLeft {
  position: sticky;
  left: 0;
}
.stickyTop {
  position: sticky;
  top: 0;
}

  .left-0 {
    left: 0;
}
.pb-16 {
  padding-bottom: 1.6rem;
}
.px-8 {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
}
.MuiPaper-elevation1 {
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
}
  .overflow-y-auto {
    overflow-y: auto;
  }

.bottom-0 {
    bottom: 0;
}

  .right-0 {
    right: 0;
}

.absolute {
    position: absolute;
}
  .fontSmall {
    font-size: .8rem !important
  }
  .fontMed {
    font-size: 1.1rem !important
  }
  .fontLarge {
    font-size: 1.8rem !important
  }
  .pressed {
    box-shadow: none !important;
    background-color: grey !important;

  }

  .shadowed {
    box-shadow: 4px 7px 16px rgba(0,0,0,.3);
  }
  // .pressed:after {
  //   content: 'x';
  //   position: absolute;
  //   top: 0;
  //   right: .5px;
  // }
  .-headerGroups .rt-th {
    background-color: ${theme.turkizeLight} !important;
  }
  // .rt-thead -header {
  //   background-color: ${theme.turkizeLight} !important;
  // }

  .registrationProcess .Input{
    background-color: ${theme.offWhite};
    height: 3rem;
    margin-top: 3rem !important;
  }

  .registrationProcess .Input input {
    border-bottom: none !important;
    color: grey;
    margin-left: 4.5rem !important;
  }

  .registrationProcess .Input i {
    width: 3.5rem;
    margin: 6px;
    padding-right: .8rem;
    padding-left: .8rem;
    color: lightgrey;
    font-size: 1.7rem;
    border-right: 1px solid lightgrey
  }

  .shortSelect {
    z-index: 10;
    width: 2rem;
    transform: translateX(-22px);
  }

  .border-right {
    border-right: 1px solid lightgrey;
  }
  .border-right-thick {
    border-right: 2px solid ${theme.primaryFaded1};
  }
  .registrationProcess button {
    position: relative !important;
    bottom: 0;
    left: 0;
    margin-top: 3rem;
    margin-left: 1rem !important; 
    width: 97%;
    height: 3rem;
    border-radius: 0 !important;
    background-color: ${theme.secondary} !important;
  }

  .z-100 {
    z-index: 1000;
  }
  .z-50 {
    z-index: 500;
  }
  .z-10 {
    z-index: 10;
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    background-color: ${theme.primary};
    color: white;
  }


  .leftTopCorner {
    position: absolute !important;
    top: 0;
    left: 0;
  }

  .checkbox_image_checkbox {
    position: absolute !important;
    top: 8px;
    left: 8px;
    padding: 0 !important;
    z-index: 101;
  }

  .checkbox_image_checkbox label::after {
    border: 2px solid white !important;
  }
  .rightTopCorner {
    position: absolute !important;
    top: 0;
    right: 0;
  }
  .leftBottomCorner {
    position: absolute !important;
    bottom: 0;
    left: 0;
  }
  .bottom {
    position: absolute !important;
    bottom: 0;
  }
  .w-10 {
    width: 10%;
  }
  .w-90 {
    width:90%;
  }
  .bottomMiddle {
    position: absolute !important;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .topMiddle {
    position: absolute !important;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .rightBottomCorner {
    position: absolute !important;
    bottom: 0;
    right: 0;

  }
  .rightMiddle {
    position: absolute !important;
    top: 45%;
    right: 0;

  }
  .leftMiddle {
    position: absolute !important;
    top: 45%;
    left: 0;

  }

  .checkBoxTable .form-check label{
    margin-top: 0rem !important;
  }
  .tableRow .form-check {
    padding-left: 0 !important;
  }
  .absolute-right {
    position: absolute;
    right: 0;
  }

  thead[data-test="table-foot"] {
    display: none;
  }

  .tab-content {
    padding: 0rem !important;
    // padding-top: 0rem !important;
  }

  .switch label input[type="checkbox"]:checked + .lever:after {
    left: 1.5rem;
    background-color: ${theme.orange};
}

  .offScreenRight {
    transform: translateX(100vw)
  }
  .offScreenLeft {
    transform: translateX(-100vw)
  }
  .offScreenBottom {
    transform: translateY(200%) !important;
  }
  .steps-step-2 .far {
    color: orange;
    transform: scale(1.2);
  }
  .steps-step-2 i {
    transition: all .3s;
  }
  .modal-dialog {
    max-width: 50rem !important;
    margin: 4.75rem auto;
  }

  .transitioned {
    transition: .3s all;
  }


   
  .noTransform {
    transform: translateY(0);
  }
  .view {
    position: relative;
    overflow: visible;
    cursor: default;
  }

  .hoverScale {
    transition: .3s all
    :hover {
      transform: scale(1.2)
    }
  }
  .nav-link.disabled {
    opacity: .4
  }
  .nav-drop-down {
    border: none;

  }
  .classic-tabs .nav {
    height: 5rem;
    position: relative;
    overflow-x: visible;
    white-space: nowrap;
    border-radius: 0.3rem 0.3rem 0 0;
  }
  .classic-tabs .nav .logo-wrapper img{
    width: 3rem;
    height: 3rem;
  }

  .classic-tabs .nav li a {
    text-transform: none;
  }

  .tabs-orange {
    transition: all .3s;
    background-color: hsla(30, 100%, 48%, 0.562) !important;
  }
  .rounded-8 {
    border-radius: .8rem;
}
  .disabled {
    pointer-events: none !important;
    opacity: .7 !important;
    color: lightgrey;
  }
  .faded {
    opacity: 0.5;
  }

  .bold {
    font-weight: bold !important;
  }

  .background-none {

    background-color: none !important;
  }
  .bgError {

    background-color: ${theme.error} !important;
  }
  .bgDefault {

    background-color: ${theme.default} !important;
  }
  .bgDanger {

    background-color: red !important;
  }
  .bgPrimary {

    background-color: ${theme.primary} !important;
  }
  .bgPrimaryLight {

    background-color: ${theme.primaryLight} !important;
  }
  .hoverBgPrimary:hover {

    background-color: ${theme.primary} !important;
  }
  .hoverBgPrimaryFaded1:hover {

    background-color: ${theme.primaryFaded1} !important;
  }
  .hoverBgPrimaryFaded3:hover {

    background-color: ${theme.primaryFaded3} !important;
  }
  .bgSecondary {

    background-color: ${theme.secondary} !important;
  }
  .colorDefault {

    color: ${theme.default} !important;
  }
  .colorPrimary {

    color: ${theme.primary} !important;
  }
  .colorSecondary {

    color: ${theme.secondary} !important;
  }
  .colorPrimaryFaded5 {

    color: ${theme.primaryFaded5} !important;
  }

  .bgPrimaryFaded1 {

    background-color: ${theme.primaryFaded1} !important;
  }
  .bgPrimaryFaded2 {

    background-color: ${theme.primaryFaded2} !important;
  }
  .bgPrimaryFaded3 {

    background-color: ${theme.primaryFaded3} !important;
  }
  .bgPrimaryFaded5 {

    background-color: ${theme.primaryFaded5} !important;
  }
  .background-orange {

    background-color: ${theme.orange} !important;
  }
  .background-cream {

    background-color: ${theme.cream} !important;
  }
  .background-white {

    background-color: white !important;
  }
  .background-dark-blue {

    background-color: ${theme.darkBlue} !important;
  }
  .background-orange2 {

    background-color: ${theme.orange_2} !important;
  }
  .background-orange3 {

    background-color: ${theme.orange_3} !important;
  }
  .background-offWhite {

    background-color: ${theme.offWhite} !important;
  }
  .background-green {

    background-color: ${theme.green} !important;
  }

  .Ripple-parent {
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
  .background-transparent {

    background-color: transparent !important;
  }
  .background-green-light {

    background-color: ${theme.greenLight} !important;
  }
  .background-turkize {

    background-color: ${theme.turkize} !important;
  }

  .bg-primary-gradient {
    background: linear-gradient(90deg, ${theme.primaryFaded3} 0%, ${theme.primary} 50%);
  }
  .bgGradientPrimary {
    background: linear-gradient(to left, ${theme.primary} 20%, ${theme.primaryLight} 100%);
  }
  .green-gradient {
    background: linear-gradient(90deg, rgba(162,216,104,1) 0%, rgba(121,188,30,1) 50%);
  }
  .orange-gradient {
    background: linear-gradient(180deg, rgba(255,137,47,1) 0%, rgba(255,184,130,1) 50%);
  }
  .color-green {
    color: ${theme.green}
  }
  .color-black {
    color: black !important;
  }
  .color-orange {
    color: ${theme.orange}
  }
  .color-white {
    color: white !important;
  }
  .color-red {
    color: red;
  }

  .color-dark-blue {

    color: ${theme.darkBlue} !important;
  }
  .border-top-blue {
    border-top: 1px solid ${theme.darkBlue}
    
  }
  .border-y-dark-blue-1 {
    border-top: 1px solid ${theme.darkBlue}
    border-bottom: 1px solid ${theme.darkBlue}
    
  }
  .border-dark-blue-2 {
    border: 2px solid ${theme.darkBlue}
    
  }
  .borderPrimary2 {
    border: 2px solid ${theme.primary}
    
  }
  .borderPrimary3 {
    border: 3px solid ${theme.primary}
    
  }
  .border-none {
    border: none;
  }
  .border-green {
    border-color: ${theme.green}
  }
  .border-bottom-turkize {
    border-bottom: 1px solid ${theme.turkizeLight}
  }
  .hide-content *{
    visibility: hidden;
    // background-color: #f57c00 !important;
  }
  .overlapblackbgFullScreen {
    right: 0;
    width: calc(100vw);
    height: 100vh;
    min-height: 100%;
    position: fixed;
    top: 0;
    // opacity: 0;
    // visibility: hidden;
    background-color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    z-index: 10;
  }

  .fullHeight{
    height: 90%;
  }
  .fullWidth{
    width: 100%;
  }
  .absCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .screenCenter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .hover-red{
    :hover {
      color: red;
    }
  }
 
  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-none {
    cursor: default !important;
  }
  .maxHeight35vh {
    max-height: 35vh
  }
  .maxHeight50vh {
    max-height: 50vh
  }
  .maxHeight55vh {
    max-height: 55vh
  }
  .maxHeight60vh {
    max-height: 65vh
  }
  .maxHeight65vh {
    max-height: 65vh
  }
  .maxHeight75percent {
    max-height: 75%
  }
  .screenTopCenter {
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .toggled {
    transition: .3s all;
 
  }

  .moveInRight-enter {
    margin-left: -240px !important;
  }
  // .moveInRight-enter-active {
  //   margin-left: 0 !important;
  //   transition: .3s all;
  // }
  .moveInRight-enter-done {
    margin-left: 0 !important;
    transition: .3s all;
  }
  .moveInRight-exit {
    margin-left: 0 !important;
    
  }
  .moveInRight-exit-active {
    margin-left: -240px !important;
    transition: .3s all;
  }
  .moveInRight-exit-done {
    margin-left: -240px !important;
    transition: .3s all;
  }

  .toggleAnimation {
    height: auto;
    max-height: 0;
    transition: .3s all;
  }
  
  .toggleAnimation-appear{
    opacity:0;
    max-height: 0;
  }
  .toggleAnimation-enter{
    opacity:0;
    max-height: 0;
  }
  
  .toggleAnimation-enter-done{
    /* transform: rotate(720deg) scale(3); */
    opacity:1;
    max-height: 60rem;
    /* transition: transform 1000ms, opacity 1000ms; */
  }
  
  .toggleAnimation-exit{
    
    opacity: 1;
    max-height: 60rem;
  }
  
  .toggleAnimation-exit-active{
    max-height: 0;
    /* transform:rotate(0deg) scale(1); */
    opacity: 0;
    /* transition: transform 1000ms, opacity 1000ms; */
  }



  
  
`;

export default GlobalStyle;
