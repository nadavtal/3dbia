import React from 'react'
import {MDBSpinner} from 'mdbreact'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
const SubTask = ({
  task,
  index,
  handleSubTaskClick,
  prepareUpdateSubTask,
  currentSubTask,
  isUpdating
}) => {
  // console.log(task)
  return (
    <div className="row">
      <div className="col-10 cursor-pointer">
        <div
          onClick={() => handleSubTaskClick(task)}
          className={
            currentSubTask && currentSubTask.name == task.name ? 'bold' : 'faded'
          }
        >
          {`${index + 1}) ${task.name}`}
        </div>
      </div>
      <div className="col-2 text-center">
        {isUpdating
        ? <MDBSpinner small className="" />
        : <IconButtonToolTip
        iconName={task.completed.length ? 'check-square' : 'square'}
        // far={task.completed.length ? false : true}
        toolTipType={task.completed.length ? 'success' : 'info'}
        toolTipPosition="left"
        toolTipEffect="float"
        toolTipText={task.completed.length ? task.completed : 'Mark as completed'}
        className={`${task.completed.length ? 'colorPrimary' : 'colorPrimaryFaded5'} ${task.completed.length ? 'colorPrimary' : 'colorPrimaryFaded5'}`}
        onClickFunction={() =>
          prepareUpdateSubTask(task, index)
        }
      />}
        
      </div>
    </div>
  );
}

  export default SubTask