import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { makeSelectCustomFieldTemplate, makeSelectBridge } from '../selectors' 
import { makeSelectSelectedTab } from '../Project/InfoTab/selectors' 
import * as selectors from './selectors';
import * as actions from './actions';
import Input from 'components/Input/Input';
import { MDBAnimation, MDBBtn, MDBIcon } from 'mdbreact';
import { Card } from 'react-bootstrap';
import reducer from './reducer';
import saga from './saga';
const key = "bridgeForm";

const BridgeForm = ({bridge, bridgeTemplate, selectedTab, saveBridgeFormElement}) => {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    console.log(bridgeTemplate)
    const handleOnBlur = (formElement) => {
        // console.log(formElement)
        saveBridgeFormElement(formElement, bridge.bid)
    }


    const Fields = () => {
      const [form, setForm] = useState(bridgeTemplate)
      const inputChangedHandler = (e, formElement) => {
        // console.log(e.target.value)
        // console.log(formElement)
        const updatedForm = [...form]        
        let elementToUpdate = updatedForm.find(field => field.id == formElement.id);
        // console.log(elementToUpdated)
        if (formElement.field_type == 'select') {

            elementToUpdate.value = e[0]
            setForm(updatedForm);
            saveBridgeFormElement(elementToUpdate, bridge.bid)
        } else {

            elementToUpdate.value = e.target.value;
            // console.log(elementToUpdate)
            setForm(updatedForm)
        }
    }
      return <Card
        className="p-4">
        <MDBAnimation type="fadeIn">
          <div className="row">
          {form.map(formElement => {
            const value = formElement.value
              ? formElement.value
              : formElement.defult_value
              ? formElement.defult_value
              : '';
            if (formElement.tab_name == selectedTab)
              return (
                <div className="col-6"
                  key={formElement.field_name}>
                  <Input
                    
                    label={formElement.field_name}
                    elementtype={formElement.field_type}
                    elementconfig={{
                      required: formElement.required == 'Y' ? true : false,
                      options: formElement.field_select_options
                        ? formElement.field_select_options.split(',')
                        : [],
                    }}
                    value={value}
                    changed={event => inputChangedHandler(event, formElement)}
                    invalid={formElement.required == 'Y' ? true : false}
                    shouldValidate={
                      formElement.required == 'Y' ? true : false
                    }
                    touched={false}
                    errMsg={''}
                    onBlur={e =>
                      handleOnBlur(formElement, e.currentTarget.value)
                    }
                  />
                </div>
              );
          })}

    </div>
        </MDBAnimation>

      </Card>
    };
   
   
    return (
      <MDBAnimation type="fadeIn">
      <div className="p-2">
        <div className="text-center">
          <h3>{selectedTab}</h3>
        </div>
        
           <Fields />
      </div>
      </MDBAnimation>
    );
}
const mapStateToProps = createStructuredSelector({
  bridge: makeSelectBridge(),
  bridgeTemplate: makeSelectCustomFieldTemplate(),
  selectedTab: makeSelectSelectedTab(),
  updating: selectors.makeSelectBridgeFormUpdating(),

});


const mapDispatchToProps = (dispatch) => {
  return {
    saveBridgeFormElement: (element, bridgeId) => dispatch(actions.saveBridgeFormElement(element, bridgeId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BridgeForm);
