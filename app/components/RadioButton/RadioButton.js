import React, { Component } from "react";
import { MDBContainer, MDBInput } from "mdbreact";

class RadioInput extends Component {
state = {
  radio: 2
}

onClick = nr => () => {
  this.setState({
    radio: nr
  });
}

render() {
  return (
    <MDBContainer className="mt-5">
      <MDBInput onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false} label="Default unchecked" type="radio"
        id="radio1" />
      {/* <MDBInput onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false} label="Default checked" type="radio"
        id="radio2" />
      <MDBInput onClick={this.onClick(3)} checked={this.state.radio===3 ? true : false} label="Default unchecked disabled"
        disabled type="radio" id="radio3" />
      <MDBInput onClick={this.onClick(3)} checked={this.state.radio===2 ? true : false} label="Default checked disabled"
        disabled type="radio" id="radio3" /> */}
    </MDBContainer>
    );
  }
}

export default RadioInput;
