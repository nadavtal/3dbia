import React, { memo, useState, useMemo, useEffect } from 'react';
import {
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem,
  MDBSwitch,
  MDBSimpleChart,
} from 'mdbreact';
import IconButtonToolTip from '../IconButtonToolTip/IconButtonToolTip';
import AccordionTable from 'containers/AccordionTable/AccordionTable';
import Form from '../../containers/Forms/Form';
import NodeRow from '../../containers/BridgeModul/NodeRow/NodeRow';
import DataComponent from '../../components/DataComponent/DataComponent';
import styled from 'styled-components';
import { getAvgOfArray, caculateCompletedPercentage } from 'utils/mathFunctions';
import { sortBy } from 'utils/dataUtils';

const TreeCustom = props => {
  
  
  const [allOpen, setAllOpen] = useState(true)
  const [selectedSpans, setselectedSpans] = useState([])
  const [selectedGroups, setselectedGroups] = useState([])
  const [selectedTypes, setselectedTypes] = useState([])
  
  useEffect(() => {
    console.log('Rendering TreeCustom', props.selectedElements);
    let spans = [], groups = [], types = []
    // setAllOpen()
    props.selectedElements.forEach(element => {
      if (element && element.span_id) {
        spans.push(element.span_id)
        groups.push(element.element_group_id)
        types.push(element.element_type_id)
      }
    })
    if (props.selectedElements[0] && props.selectedElements[0].span_id) {
      setselectedSpans(spans)
      setselectedGroups(groups)
      setselectedTypes(types)
    }
    

    return () => {
      
    }
  }, [props.selectedElements])
  // console.log(selectedSpans)
  // console.log(selectedGroups)
  // console.log(selectedTypes)


  let treeObj

  const createTreeObj = (data) => {
    console.log('createTreeObj', data)
    let treeObj = {};
    // data.level_1.sort(sortBy, 'id');
    data.level_1.map(span => {
      treeObj[span.name] = {
        span_id: span.id,
        elements: [],
        children: {},
        completed: []
      };
      if (data.level_2) data.level_2.map(group => {
       
        treeObj[span.name].children[group.name] = {
          group_id: group.id,
          elements: [],
          children: {},
          completed: [],
        };
        if (data.level_3) data.level_3.map(type => {
          // console.log(type)
          if (type.element_group_id == group.id) {
            treeObj[span.name].children[group.name].children[
              `${type.element_code}-${type.name}`
            ] = {
              type_id: type.id,
              elements: [],
              children: [],
              completed: [],
            };
          }
          // if (type.structure_type_id) {
            
          //   if (
          //     type.structure_type_id === span.structure_type_id &&
          //     type.element_group_id == group.id
          //   ) {
          //     console.log(type)
          //     treeObj[span.name].children[group.name].children[
          //       `${type.element_code}-${type.name}`
          //     ] = {
          //       elements: [],
          //       children: [],
          //       completed: [],
          //     };
          //   }
          // } else {
          //   if (type.element_group_id == group.id) {
          //     treeObj[span.name].children[group.name].children[
          //       `${type.element_code}-${type.name}`
          //     ] = {
          //       elements: [],
          //       children: [],
          //       completed: [],
          //     };
          //   }
          // }
          // if (type.element_group_id == group.id) treeObj[span.name].children[group.name].children[type.name] = [];
          if (data.level_4);
          data.level_4.map(el => {

            if (
              el.element_group_id == group.id &&
              el.element_type_id == type.id &&
              el.span_id === span.id
            ) {
             
 
              
              // console.log(`${type.element_code}-${type.name}`);
              // console.log(treeObj[span.name].children[group.name]);
              // console.log(treeObj[span.name].children[group.name].children[
              //   `${type.element_code}-${type.name}`
              // ]);
              if (
                treeObj[span.name].children[group.name].children &&
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ]
              ) {
                let completed = caculateCompletedPercentage(el)
                // console.log(el);
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ].children.push(el);
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ].elements.push(el.object_id);
                treeObj[span.name].children[group.name].children[
                  `${type.element_code}-${type.name}`
                ].completed.push(completed);

                treeObj[span.name].children[group.name].elements.push(
                  el.object_id,
                );
                treeObj[span.name].children[group.name].completed.push(completed);
                treeObj[span.name].elements.push(el.object_id);
                treeObj[span.name].completed.push(completed);

                // treeObj.completed.push(completed);
              }
            }
          });
        });
      });
    });
    // console.log(treeObj);
    return treeObj;
  };

  const addElementsSum = obj => {
    console.log(obj);
  };
  
  
  treeObj = useMemo(() => createTreeObj(props.data), 
  [props.data.level_1, props.data.level_2, props.data.level_3, props.data.level_4]);

  // console.log(treeObj)
  const TreeRowWrapper = styled.span`
    width: 100%;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
  `;
  const TreeRow = props => {

    return (
      <TreeRowWrapper>
        <span>{props.children}</span>
        <span className="d-flex align-items-center">
          <span className="mr-1">
            <MDBSimpleChart
              strokeColor={
                props.avg == 100
                  ? 'green'
                  : 'red'
              }
              strokeWidth={1}
              width={22}
              height={22}
              percent={props.avg}
              labelFontWeight="normal"
              labelFontSize="8"
              labelColor={
                props.avg !== 100
                  ? 'red'
                  : 'green'
              }
              
            />

          </span>
          {props.showEdit && (
            <IconButtonToolTip
              iconName="edit"
              toolTipType="info"
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText={'Edit span'}
              className=""
              onClickFunction={(event) => {
                event.stopPropagation();
                props.editFunction()
              }}
            />
          )}
          <IconButtonToolTip
            iconName={props.showIcon}
            toolTipType="info"
            toolTipPosition="left"
            toolTipEffect="float"
            toolTipText={'Show Elements'}
            className=""
            onClickFunction={(e) => {
              e.stopPropagation();
              props.showElements()
            }}
          />
        </span>
      </TreeRowWrapper>
    );
  };

  const handleAllOpen = (value) => {
    if (allOpen == value) {
      setAllOpen()
      setAllOpen(value)
    } else {
      setAllOpen(value)

    }
  }
  return (
    <>
      <div className="d-flex mb-1">
        <IconButtonToolTip
          className="mx-3"
          iconClassName="text-blue"
          size="lg"
          iconName="plus-circle"
          toolTipType="info"
          toolTipPosition="right"
          toolTipEffect="float"
          toolTipText={`Expand all`}
          onClickFunction={() => handleAllOpen(true)}
        />
        <IconButtonToolTip
          className=""
          iconClassName="text-blue"
          size="lg"
          iconName="minus-circle"
          toolTipType="info"
          toolTipPosition="right"
          toolTipEffect="float"
          toolTipText={`Minimize all`}
          onClickFunction={() => handleAllOpen(false)}
        />
      </div>
      <MDBTreeview
        theme="colorful"
        // header={props.header}
        className={props.className}
        // getValue={value => console.log('VALUEEEEEEE', value)}
      >
        {treeObj &&
          Object.keys(treeObj).map((key, index) => {
            const span = treeObj[key];
   
            return (
              <MDBTreeviewList
                key={index}
                className=""
                opened={allOpen !== undefined ? allOpen : selectedSpans.includes(span.span_id)}
                far
                // icon='envelope-allOpen'
                title={
                  <TreeRow
                    showEdit={true}
                    showIcon="eye"
                    showElements={() => props.showElements(span.elements)}
                    editFunction={() =>
                      props.editElement('editSpan', span.span_id)
                    }
                    avg={getAvgOfArray(span.completed)}
                  >
                    {`${key} (${span.elements.length})`}
                  </TreeRow>
                }
                // onClick={() => showElements(span.elements)}
                
                
              >
                {Object.keys(span.children).map((key, index) => {
                  const group = span.children[key];
                  // console.log(group)
                  if (group.elements.length) {
                    return (
                      <MDBTreeviewList
                        key={index}
                        opened={allOpen !== undefined ? allOpen : selectedGroups.includes(group.group_id) && selectedSpans.includes(span.span_id)}
                        // onClick={() => showElements(group.elements)}
                        far
                        title={
                          <TreeRow
                            showEdit={false}
                            showIcon="eye"
                            showElements={() =>
                              props.showElements(group.elements)
                            }
                            avg={getAvgOfArray(group.completed)}
                          >
                            {`${key} (${group.elements.length})`}
                          </TreeRow>
                        }
                  
                      >
                        {Object.keys(group.children).map((key, index) => {
                          const type = group.children[key];
                          // console.log(type.elements)
                          
                          if (type.elements.length) {
                            return (
                              <MDBTreeviewList
                                key={index}
                                opened={allOpen !== undefined ? allOpen : selectedTypes.includes(type.type_id) && selectedGroups.includes(group.group_id) && selectedSpans.includes(span.span_id)}
                                far
                                title={
                                  <TreeRow
                                    showEdit={false}
                                    showIcon="list-alt"
                                    avg={getAvgOfArray(
                                      type.children.map(el =>
                                        caculateCompletedPercentage(el),
                                      ),
                                    )}
                                    showElements={() =>
                                      props.showElements(type.elements, true)
                                    } 
                                  >
                                    {`${key} (${type.elements.length})`}
                                  </TreeRow>
                                }
                         
                              >
                                {/* {console.log(type.children)} */}
                                <AccordionTable
                                  data={sortBy('element_order', type.children)}
                                  rows={sortBy('element_order', type.children)}
                                  dataType="nodes"
                                  onTitleClick={(id) =>
                                    props.onClick(id)
                                  }
                                  onRowClick={(id) =>
                                    props.onClick(id)
                                  }
                                  checkBox={true}
                                  selectedObjectIds={props.selectedObjectIds}
                                  selectNodesMode={props.selectNodesMode}
                                  // updateResiumMode={(mode) => props.updateResiumMode(mode)}
                                  editElement={objectId =>
                                    props.editElement('editElement', objectId)
                                  }
                                  zoomToElement={objectId =>
                                    props.zoomToElement(objectId)
                                  }
                                  className="" 
                                  textColor="black"
                                />
                              </MDBTreeviewList>
                            );
                          }
                        })}
                      </MDBTreeviewList>
                    );
                  }
                })}
                {/* {console.log(spanElementsNum)} */}
              </MDBTreeviewList>
            );
          })}
      </MDBTreeview>
    </>
  );
};

export default memo(TreeCustom);
