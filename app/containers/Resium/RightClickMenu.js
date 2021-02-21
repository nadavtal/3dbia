import React, { useRef, useState, memo } from 'react';
import styled from 'styled-components';



const RightClickMenu = (props) => {
  // console.log(props)
  const [selectedSpan, setSelectedSpan] = useState()
  const [selectedGroup, setSelectedGroup] = useState()
  // console.log(selectedSpan, selectedGroup)
  // console.log(props.position.left)
  // console.log(props.position.bottom)
  const showRight = props.position.left < 320
  // if (viewer.container.offsetWidth - m.position.x < 100) console.log('VIEW LEFT')
  // if (props.position.left < 320) console.log('VIEW RIGHT')
  // else console.log('VIEW LEFT')
  const rightClickMenu = useRef(null)
  // console.log(props)
  const Wrapper = styled.div`
    position: absolute;
    bottom: ${props.position ? props.position.bottom + 'px' : '100%'};
    left: ${props.position ? props.position.left + 'px' : '100%'};
    min-width: 200px;
    font-size: .7rem;
    z-index: 10000000;
  `;
  const Header = styled.div`    
   padding: .4rem;
   font-size: .9rem;
  `;
  const Body = styled.div`    
  //  padding: .6rem;
  `;

  const OptionWrapper = styled.div`
  position: relative;
  padding: .4rem;
  // &:hover{
  //   color: black !important;
  // }
  `

  const SubOptionsWrapper = styled.div`
    position: absolute;
    width: 160px;
    left: ${showRight ? '100px' : '-160px'};
    height: auto;
    top: 0;
    padding: .4rem;
    font-size: .7rem;
    z-index: 10000000;
    height: 220px;
  `;
  const SubSubOptionsWrapper = styled.div`
    position: absolute;
    width: 160px;
    left: ${showRight ? '260px' : '-320px'};
    height: auto;
    top: 0;
    padding: .4rem;
    font-size: .7rem;
    z-index: 10000000;
    min-height: 220px;
  `;

  const SubOptionWrapper = styled.div`
    height: auto;
    lineHeight: .8rem;
    padding: .3rem;
    border-bottom: 1px solid white;
    // &:hover{
    //   background-color: lightgray !important;
    //   color: black !important;
    // }
  `;

  const SubOptions = () => {
    // console.log(props)
    return  props.menuSubOptions.map(option => <SubOptionWrapper
                                          key={option.id}
                                          className="rightClickMenuSubOption"
                                          // onClick={() => props.onOptionClick(option.id, selectedSpan)}
                                          onMouseEnter={() =>  setSelectedGroup(option)}
                                          >{option.name}</SubOptionWrapper>)
  }
  const SubSubOptions = () => {
    // console.log(props)
    return  props.menuSubSubOptions.map(option => {
      
      if (option.structure_type_id) {
        if (option.structure_type_id === selectedSpan.structure_type_id && option.element_group_id === selectedGroup.id) {
        return <SubOptionWrapper
        key={option.id}
        className="rightClickMenuSubOption"
        onClick={() => {
          setSelectedSpan(null);
          setSelectedGroup(null)
          props.onOptionClick(option, selectedGroup.id, selectedSpan.id )}
        }
        >{option.element_code + ' - ' + option.name + ' - ' + option.importance}</SubOptionWrapper>
        }
      } else {
        if (option.element_group_id === selectedGroup.id) {

          return <SubOptionWrapper
          key={option.id}
          className="rightClickMenuSubOption"
          onClick={() => {
            setSelectedSpan(null);
            setSelectedGroup(null)
            props.onOptionClick(option, selectedGroup.id, selectedSpan.id )}
          }
          >{option.element_code + ' - ' + option.name + ' - ' + option.importance}</SubOptionWrapper>
        }

      }
    })

  }

  const handleOnMouseLeave = () => {
    setSelectedSpan(null);
    setSelectedGroup(null)
    // console.log(props)
    props.onLeave()
  }
  // console.log(selectedSpan)
  // const actions = [ 
  //   {name: 'Set current view'},
  //   {name: 'Add Annotation'},
  //   {name: 'Show Selected elements'},
  //   {name: 'Show this element'},
  // ]

  return (
    <Wrapper
      className={`${props.show? 'd-block' : 'd-none'}`}
      ref={rightClickMenu}
      onMouseLeave={() => handleOnMouseLeave()}
      >
      <Header className="border-bottom border-light bgPrimary color-white">
        <div> {props.element.name}</div>
        {props.element.object_id !== props.element.name && <span className="fontSmall">{`(${props.element.object_id})`}</span>} 
      </Header>
      <Body className="background-white">
        {props.actions && props.actions.map(action => {
          return <div className="p-2 border-bottom cursor-pointer hoverBgPrimaryFaded1"
          key={action.name}
          onClick={() => props.handleAction(action.name)}>
          {action.name}
        </div>
        })}
        
        {/* <div className="mb-1 border-bottom border-light">
          <OptionWrapper>Allocate to span </OptionWrapper>
        </div> */}
        {/* {props.menuOptions.map((option, index) => {
          return <OptionWrapper key={index}>
            <div className="rightClickMenuOption"
              // onClick={() => setSelectedSpan(option.name)}
              onMouseEnter={() =>  setSelectedSpan(option)}
              // onMouseLeave={() =>  setSelectedSpan(null)}
              >{option.name}
              </div>
          </OptionWrapper>
          })
        } */}

      </Body>
      {selectedSpan && <SubOptionsWrapper >
        <SubOptions />
      </SubOptionsWrapper>
      }
      {selectedGroup && <SubSubOptionsWrapper >
        <SubSubOptions/>
      </SubSubOptionsWrapper>
      }
    </Wrapper>
  )
}

export default memo(RightClickMenu)
