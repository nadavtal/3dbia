import React, { useState, memo, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { sortBy } from 'utils/dataUtils';
import { MDBIcon, MDBInput, MDBBtn } from 'mdbreact';
import useHover from 'utils/customHooks/useHover';
import DataComponent from 'components/DataComponent/DataComponent';
import MyTabs from 'components/MyTabs/Tabs';
import Hovered from 'components/Hovered';
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { saveElements, updateBridgePrimaryModelId } from 'containers/BridgeModul/actions';
import { toggleModal } from 'containers/App/actions';
import './ElementsComparisonModul.css'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
const ElementsComparisonModul = ({
    model,
    nodes,
    elements,
    currentUser,
    onSaveElements,
    onUpdateBridgePrimaryModelId,
    onToggleModal 
}) => {

    const getDuplicatedElements = () => {
      let names = []
      let duplicated = {}
      nodes.forEach(node => {
        if (!names.includes(node.name)) names.push(node.name)
        else {
          if (!duplicated[node.name]) {
            duplicated[node.name] = 2
          } else {
            duplicated[node.name] = duplicated[node.name] + 1
          }

        }
      })
      return duplicated
    }
    const elementObjectIds = useMemo(() => elements.map(el => el.object_id), [elements]) 
    const nodesNames = useMemo(() => nodes.map(node => node.name), [nodes]) 
    const undefinedElements = useMemo(() => nodes.map(node => node.name == 'undefined'), [nodes])     
    const duplicatedElements = useMemo(() => getDuplicatedElements(), [nodes])     
    const newNodes = useMemo(() => nodes.filter(node => node.name && !elementObjectIds.includes(node.name)), [nodes, elementObjectIds]) 
    const existingNodes = useMemo(() => nodes.filter(node => node.name && elementObjectIds.includes(node.name)), [nodes, elementObjectIds]) 
    const missingElements = useMemo(() => elements.filter(el => !nodesNames.includes(el.object_id)), [elements, nodesNames]) 
    const hasDuplicates = Object.entries(duplicatedElements).length !== 0
    let resetElemetsIds = []
    console.log('hasDuplicates', hasDuplicates)

    // const Hovered = ({element, node, index, children}) => {
    //     const [hoverRef, isHovered] = useHover();
    //     // console.log(children)
    //     return (
    //       <div
            
    //         // onClick={() => console.log(item)}
    //         className="position-relative"
    //       >
    //         {/* <div className=" d-flex justify-content-between"> */}
    //         <div ref={hoverRef}>{children[0]}</div>
    //         <div className={`${isHovered ? 'show' : 'hide'}`}>
    //             {children[1]}
    //         </div>
    //         {/* </div>   */}
    //       </div>
    //     );
    // }

    const tabs = !hasDuplicates ? 
    [
      {
        name: `Existing elements (${existingNodes.length})`,
        icon: 'heart',
      },
      {
        name: `New elements (${newNodes.length})`,
        icon: 'heart',
      },
      {
        name: `Missing elements (${missingElements.length})`,
        icon: 'times',
      },
    ]
    : [
      {
        name: `Duplicated elements`,
        icon: 'heart',
      },
      {
        name: `Existing elements (${existingNodes.length})`,
        icon: 'heart',
      },
      {
        name: `New elements (${newNodes.length})`,
        icon: 'heart',
      },
      {
        name: `Missing elements (${missingElements.length})`,
        icon: 'times',
      },
    ];

    const handleSave = () => {
        console.log(resetElemetsIds)
        console.log(newNodes)
        const newElements = newNodes.map(node => {
          return {
            bid: model.bid,
            object_id: node.name,
            name: node.name,
            updated_by_user_id: currentUser.userInfo.id,
            last_updated: convertToMySqlDateFormat(Date.now()),
          }
        })
        console.log('newElements', newElements)
        // console.log(missingElements)
        // console.log(elements)
        // const resetElemetsIds = selectedNodes.map(node => elements.find(
        //     el => el.object_id == node.name,
        //   ).id)
        
        const deleteElementsIds = missingElements.map(el => el.id)
        console.log(deleteElementsIds)
        onSaveElements({resetElemetsIds, newElements, deleteElementsIds})
        // onSave({resetElemetsIds, newElements, deleteElementsIds})
    }


    const handleSelectedElements = (element) => {
      console.log(element)
      if (resetElemetsIds.includes(element)) {
          resetElemetsIds = resetElemetsIds.filter(el => el !== element)
      } else {
        resetElemetsIds.push(element)
      }

    }
    const scrollContainerStyle = {
      width: "100%", 
     //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
      minHeight: `48vh`, 
      maxHeight: `48vh`, 
      overFlowY: 'auto',
      overFlowX: 'hidden'
     }; 

    const ExistingElements = ({
      onSelectElement
    }) => {
      const [selectedNodes, setSelectedNodes] = useState([])
        
      const handleNodeCheckBoxAll = () => {

          if (selectedNodes.length) {
              setSelectedNodes([])
          } else {
              console.log(nodes.filter(node => elementObjectIds.includes(node.name)))
              setSelectedNodes(nodes.filter(node => elementObjectIds.includes(node.name)))
          }
      }
      const handleNodeCheckBoxClick = (node, element) => {
        console.log(node, element)
        if (selectedNodes.includes(node)) {
            setSelectedNodes(selectedNodes.filter(n => n !== node))
        } else {
            setSelectedNodes([...selectedNodes, node])
        }
        onSelectElement(element.id)
      }
      return (
        <>
          <div
            style={scrollContainerStyle}
            className="elementsList scrollbar scrollbar-primary"
          >
            {' '}
            <div className="fullWidth mt-2 mr-2">
              <MDBIcon
                icon={
                  // selectedNodes.length == existingNodes.length
                  !selectedNodes.length
                    ? 'check-square'
                    : 'square'
                }
                size="lg"
                className="cursor-pointer float-right mr-2"
                onClick={() => handleNodeCheckBoxAll()}
                far={true}
              />
            </div>
            <div className="mt-5">
              {sortBy('name', existingNodes).map((node, index) => {
                // const isNew = newNodes.includes(node);
                const isSelected = selectedNodes.includes(node);
                const matchingElement = elements.find(
                  el => el.object_id == node.name,
                );
                return (
                  <div
                    className="d-flex justify-content-between align-items-center"
                    key={node.name}
                  >
                    <Hovered>
                      <span>{`${index + 1}) ${node.name} ${
                        matchingElement &&
                        matchingElement.name !== node.name
                          ? `(${matchingElement.name})`
                          : ''
                      }`}</span>
                      <div className="hoveringElement thin">
                        {matchingElement ? (
                          <DataComponent data={matchingElement} />
                        ) : (
                          <span>New element - no data yet</span>
                        )}
                      </div>
                    </Hovered>
                    <MDBInput
                      type="checkbox"
                      labelClass={
                        matchingElement && isSelected && 'checkbox-label'
                      }
                      id={index}
                      label={` `}
                      checked={matchingElement && !isSelected}
                      // disabled={isNew}
                      onChange={() =>
                        handleNodeCheckBoxClick(node, matchingElement)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      );
    }

    const NewElements = () => {
      return <div
      style={scrollContainerStyle}
      className="scrollbar scrollbar-primary"
    >
      {newNodes.map((node, index) => (
        <div 
          className="d-flex justify-content-between"
          key={node.name}>

          <div className="d-flex">

            <div>{`${index + 1}) ${node.name}`}</div>
          </div>

          <MDBIcon className="disabled" icon="square" />
        </div>
      ))}
    </div>
    }

    const MissingElements = () => {

      return (
        <div
          style={scrollContainerStyle}
          className="scrollbar scrollbar-primary"
        >
          {missingElements.map((el, index) =>
            el.object_id == el.name ? (
              <div key={el.object_id}>{`${index + 1}) ${el.object_id}`}</div>
            ) : (
              <div key={el.object_id}>{`${index + 1}) ${el.object_id} (${el.name})`}</div>
            ),
          )}
        </div>
      );
    }
    const DuplicatedElements = () => {
      
      return (
        <div
          style={scrollContainerStyle}
          className="scrollbar scrollbar-primary"
        >
          {Object.keys(duplicatedElements).map(key => {
            // if (duplicatedElements[key] > 1) 
            return <div key={key}>{key} ({duplicatedElements[key]})</div>
          })}
        </div>
      );
    }
    
    const Layout2 = () => (
      <div className="position-relative elementsComparison">
        <div className="flex">
          <MDBInput
            type="checkbox"
            labelClass="checkbox-label-padding"
            checked
            label=" "
          />
          <span>= Checked elements will be unchanged</span>
        </div>
        <div className="flex">
          <MDBInput
            type="checkbox"
            labelClass="checkbox-label checkbox-label-padding"
            label=" "
          />
          <span>= Reset allocation</span>
        </div>
        <div className="flex">
          <MDBInput
            type="checkbox"
            labelClass="checkbox-label-padding"
            label=" "
            disabled
          />
          <span>= New elements to be added</span>
        </div>
        {hasDuplicates
        ?  <MyTabs
        tabs={tabs}
        tabContentWrapperClassName="mt-2"
        headerWrapperClassName="card z-index-1"
        tabBackgroundColor="orange"
        navWrapperClassName="bgSecondary"
      >
        <DuplicatedElements />
        <ExistingElements onSelectElement={(el) => handleSelectedElements(el)}/>
        <NewElements />
        <MissingElements />
      </MyTabs>
        :  <MyTabs
        tabs={tabs}
        tabContentWrapperClassName="mt-2"
        headerWrapperClassName="card z-index-1"
        tabBackgroundColor="orange"
        navWrapperClassName="bgSecondary"
      >

        <ExistingElements onSelectElement={(el) => handleSelectedElements(el)}/>
        <NewElements />
        <MissingElements />
      </MyTabs>
        }

        {/* <MDBInput
          type="checkbox"
          id="setPrimaryCheckBox"
          labelClass="ml-1"
          checked={primary}
          onChange={() => setPrimary(!primary)}
          label="  Set this model as primary"
        /> */}
        {/* {console.log(Object.entries(duplicatedElements).length)} */}
        <div 
          className={`p-2 color-white d-flex align-items-center justify-content-between ${hasDuplicates ? 'bgDanger' : 'bgSecondary'}`}>
          {/* {console.log(duplicatedElements.length)} */}
          <span className="fontMed">
            {hasDuplicates
              ? 'This model cant be set to primary'
              : 'Do you want to set this model as primary model?'}

          </span>
          {hasDuplicates ? (
            <div>
              <MDBBtn
                className="mb-2 mr-2 bgPrimary"
                onClick={() => onToggleModal()}
                rounded
              >
                Continue
              </MDBBtn>
            </div>
          ) : (
            <div>
              <MDBBtn
                className="bgPrimary"
                onClick={() => {
                  handleSave()
                  onUpdateBridgePrimaryModelId(model.bid, model.id);
                  onToggleModal()
                }}
                rounded
              >
                Yes
              </MDBBtn>
              <MDBBtn
                className=""
                color="danger"
                onClick={() => onToggleModal()}
                rounded
              >
                No
              </MDBBtn>
            </div>
          )}
        </div>

      </div>
    );
    return (
      // <Layout1 />
      <Layout2 />
    );
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSaveElements: (data, userId) => dispatch(saveElements(data, userId)),
    onUpdateBridgePrimaryModelId: (bid, modelId) => dispatch(updateBridgePrimaryModelId(bid, modelId)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    // save: () => console.log('save')

  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,  
)(ElementsComparisonModul);
// export default ElementsComparisonModul