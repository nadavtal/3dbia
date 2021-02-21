import { MDBInput } from 'mdbreact';
import React from 'react'

export default function IconsInstructions() {

    return (
      <div className="iconsInstructions">
        <div className="flex">
          <MDBInput
            type="checkbox"
            labelClass="checkbox-label-padding cursor-none"
            checked
            label=" "
          />
          <span>= Checked elements will be unchanged</span>
        </div>
        <div className="flex">
          <MDBInput
            type="checkbox"
            labelClass="checkbox-label checkbox-label-padding cursor-none"
            label=" "
          />
          <span>= Reset allocation</span>
        </div>
        <div className="flex">
          <MDBInput
            type="checkbox"
            labelClass="checkbox-label-padding cursor-none"
            label=" "
            disabled
          />
          <span>= New elements to be added</span>
        </div>
      </div>
    );
    
}