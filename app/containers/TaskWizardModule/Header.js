import { MDBAnimation } from 'mdbreact'
import React from 'react'
import Status from 'components/Status'
const Header = ({task, statuses}) => {
    // console.log(task)
    return (
      <div className="bgPrimaryFaded5 color-white header taskWizardHeader">
        <MDBAnimation type="bounceInRight" className="row">
          <div className="col-4 text-center">
            <h5 className="bold mr-2 mb-1">{task.name}</h5>

            <div className="">
              <Status statusName={task.status} />
            </div>
          </div>
          <div className="col-8 taskWizardDescription color-white">
            {task.description}
          </div>
        </MDBAnimation>
      </div>
    );

}

export default Header