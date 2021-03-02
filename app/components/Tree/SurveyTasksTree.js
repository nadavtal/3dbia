import React, { memo, useMemo, useState, useEffect } from 'react';
import {
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem,
  MDBSpinner,
  MDBSwitch, 
  MDBIcon,
  MDBSimpleChart
} from 'mdbreact';
import useHover from 'utils/customHooks/useHover'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import AccordionTable from 'containers/AccordionTable/AccordionTable';
import Accordion from 'components/Accordion/Accordion'
import Form from '../../containers/Forms/Form';
import DateField from 'components/DateField/DateField';
import styled from 'styled-components';
const SurveyTasksTree = ({
  data,
  accordionMode,
  onSurveyClick,
  onTaskClick,
  onLoadData,
  showRowData,
  selectedSurvey,
  // selectedTask,
  surveyFilesLoaded,
  wrapperClassName,
  hoverClassName
}) => {
  const [state, setstate] = useState()
  useEffect(() => {
    // console.log('USEEFFECTTTT')
    setstate(data)
    return () => {
      
    }
  }, [data])
  const surveyCompletedPercentage = (survey) => {
    let total = 0
    survey.children.forEach(task => total += task.completed)
    return Math.floor(total/survey.children.length)
  }

  const Parent = ({survey}) => {
    const [hoverRef, isHovered] = useHover();
    const completePercentage = useMemo(() => surveyCompletedPercentage(survey), survey);
    // console.log(completePercentage)
    return (
      <>
        <div
          className="d-flex justify-content-between position-relative p-2"
          ref={hoverRef}
          onClick={() => onSurveyClick(survey)}
        >
          <div className="d-flex align-items-center">
            <span>{`${survey.name} (${survey.survey_year})`}</span>
            <IconButtonToolTip
              className="ml-1 fontSmall"
              iconClassName=""
              size="sm"
              iconName="info-circle"
              toolTipType="info"
              toolTipPosition="top"
              toolTipEffect="float"
              toolTipText="Show Survey info"
              onClickFunction={() => showRowData(survey)}
            />
          </div>
          <span className="d-flex align-items-center mr-1">
            <MDBSimpleChart
              className="mr-1"
              strokeColor={
                surveyCompletedPercentage(survey) == 100 ? 'green' : 'red'
              }
              strokeWidth={2}
              width={25}
              height={25}
              percent={surveyCompletedPercentage(survey)}
              labelFontWeight="normal"
              labelFontSize="9"
              labelColor={
                surveyCompletedPercentage(survey) !== 100 ? 'red' : 'green'
              }

              // railColor={'blue'}
            />
            {surveyFilesLoaded ? <IconButtonToolTip
              className={`ml-1`}
              iconClassName={surveyFilesLoaded && selectedSurvey && selectedSurvey.id === survey.id ? 'colorSecondary' : ''}
              size="sm"
              iconName={surveyFilesLoaded && selectedSurvey && selectedSurvey.id === survey.id ? "sync" : "file-import"}
              toolTipType={surveyFilesLoaded && selectedSurvey && selectedSurvey.id === survey.id ? 'success' : 'info'}
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText={surveyFilesLoaded && selectedSurvey && selectedSurvey.id === survey.id ? 'Loaded' : 'Load data'}
              // onClickFunction={() => selectedSurvey.id !== survey.id && onLoadData(survey)}
              onClickFunction={() => onLoadData(survey)}
            /> :
            selectedSurvey && selectedSurvey.id === survey.id 
            ? <MDBSpinner  small className="" /> 
            : <IconButtonToolTip
              className={`ml-1`}
              iconClassName={"faded"}
              size="sm"
              iconName={"file-import"}
              toolTipType={'info'}
              toolTipPosition="left"
              toolTipEffect="float"
              toolTipText={""}
              onClickFunction={() => null}
            />
            }
          </span>
        </div>
      </>
    );

  
  }
  const HoveredWrapper = styled.div`
  position: absolute;
  left: 0;
  top: -.3rem;
  display: flex;
  z-index: 1000;
  font-size: .7rem;
  `;
  const HoveredTask = ({task}) => {
    return <HoveredWrapper>
      <span className="ml-2">{task.user}</span>
      <span className="ml-2">{task.status}</span>
      <DateField className="ml-2" date={task.due_date}/>
      <DateField className="ml-2" date={task.updatedAt}/>
    </HoveredWrapper>
  }

  const Child = ({task}) => {
    const [hoverRef, isHovered] = useHover();
    return (
      <>
        <div
          ref={hoverRef}
          className={`d-flex justify-content-between position-relative ${selectedSurvey.id !== task.survey_id && 'disabled color-black'}`}
          onClick={() => onTaskClick(task)}
        >
          <div className="d-flex align-items-center">
            {task.name}
            <IconButtonToolTip
              className="ml-1 fontSmall"
              iconClassName=""
              size="sm"
              iconName="info-circle"
              toolTipType="info"
              toolTipPosition="top"
              toolTipEffect="float"
              toolTipText="Show task info"
              onClickFunction={() => showRowData(task)}
            />
          </div>
          <MDBSimpleChart
            strokeColor={task.completed == 100 ? 'green' : 'red'}
            strokeWidth={2}
            width={25}
            height={25}
            percent={task.completed}
            labelFontWeight="normal"
            labelFontSize="9"
            labelColor={task.completed !== 100 ? 'red' : 'colorSecondary'}

            // railColor={'blue'}
          />
        </div>
        {/* <HoveredTask task={task}/> */}
        {/* {isHovered && <HoveredTask task={task}/>} */}
      </>
    );
  }

  const tree = useMemo(() => function createTree() {
    console.log('TREEEEEEE')
    console.log(selectedSurvey)
    // console.log(selectedTask)
    return (
      <MDBTreeview
        theme='colorful'
        // header={props.header}
        className={`fullWidth ${wrapperClassName}`}
        // getValue={value => handleClick(value)}
      >
        {selectedSurvey && data.map(parent => {
          // console.log(selectedSurvey)
          // console.log(parent)
          return (
            <MDBTreeviewList
              key={parent.name}
              // className="bgPrimaryFaded2"
              // icon='envelope-open'
              title={<Parent survey={parent}/>}
              far
              // opened={parent.id == selectedSurvey.id} 
              >
  
              {parent.children && parent.children.length && parent.children.map(child => {
                if (child.children) {
                  return (
                    <MDBTreeviewList
                      key={child.name}
                      title={child.name}
                      // className="bgPrimaryFaded3"
                      // icon='plus'
                      far
                    >
                      {child.children &&
                        child.children.length &&
                        child.children.map(child2 => {
                          return (
                            <MDBTreeviewItem
                              key={child2.name}
                              className={child2.name == selectedItem ? 'opened' : ''}
                              icon="folder"
                              title={child2.name}
                              // opened={child2.name == selectedItem}
                            />
                          );
                        })}
                    </MDBTreeviewList>
                  );
  
                } else {
                  
                  return !accordionMode ? 
                  <MDBTreeviewItem
                      key={child.name}
                      // className={`${selectedTask && child.id == selectedTask.id ? 'opened' : ''}`}
                      icon="tasks"
                      title={<Child task={child}/>}                 
                    
                    />
                    :
                    <Accordion 
                      header={child.name}
                      data={[]}
                      />
                  // return (
                  //   // <MDBTreeviewItem
                  //   //   key={child}
                  //   //   icon="folder"
                  //   //   title={child}
                  //   //   onClick={() =>
                  //   //     handleClick(child)
                  //   //   }
                  //   // />
                  //   <Accordion 
                  //     header={child}
                  //     data={[]}
                  //     />
                  // );
                }
  
                })
              }
            </MDBTreeviewList>
  
          )
        })}
      </MDBTreeview>
    )
  }, [state])

  // return <>
  //   {tree()}
  // </>
  return (
    <MDBTreeview
      theme='colorful'
      // header={props.header}
      className={`fullWidth ${wrapperClassName}`}
      // getValue={value => handleClick(value)}
    >
      {selectedSurvey && data.map(parent => {
        // console.log(selectedSurvey)
        // console.log(parent)
        return (
          <MDBTreeviewList
            key={parent.name}
            // className="bgPrimaryFaded2"
            // icon='envelope-open'
            title={<Parent survey={parent}/>}
            far
            // opened={parent.id == selectedSurvey.id} 
            >

            {parent.children && parent.children.length && parent.children.map(child => {
              if (child.children) {
                return (
                  <MDBTreeviewList
                    key={child.name}
                    title={child.name}
                    // className="bgPrimaryFaded3"
                    // icon='plus'
                    far
                  >
                    {child.children &&
                      child.children.length &&
                      child.children.map(child2 => {
                        return (
                          <MDBTreeviewItem
                            key={child2.name}
                            className={child2.name == selectedItem ? 'opened' : ''}
                            icon="folder"
                            title={child2.name}
                            // opened={child2.name == selectedItem}
                          />
                        );
                      })}
                  </MDBTreeviewList>
                );

              } else {
                
                return !accordionMode ? 
                <MDBTreeviewItem
                    key={child.name}
                    // className={`${selectedTask && child.id == selectedTask.id ? 'opened' : ''}`}
                    icon="tasks"
                    title={<Child task={child}/>}                 
                  
                  />
                  :
                  <Accordion 
                    header={child.name}
                    data={[]}
                    />
                // return (
                //   // <MDBTreeviewItem
                //   //   key={child}
                //   //   icon="folder"
                //   //   title={child}
                //   //   onClick={() =>
                //   //     handleClick(child)
                //   //   }
                //   // />
                //   <Accordion 
                //     header={child}
                //     data={[]}
                //     />
                // );
              }

              })
            }
          </MDBTreeviewList>

        )
      })}
    </MDBTreeview>
  )
}

export default memo(SurveyTasksTree)

