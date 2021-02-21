import React, {useState, memo} from 'react';
import Actions from '../Actions';
import TextSearch from '../../components/TextSearch/TextSearch'

const PageHeader = ({ 
    text,
    className,
    actions,
    iconColor,
    handleAction,
    hideSearch
}) => {

    return (
      // <div className={`d-flex justify-content-between align-items-center ${className}`}>
      //   <div className="">
      //     <TextSearch
      //       className="ml-3 mt-0"
      //       value=""
      //       onChange={val => handleAction('search', val)}
      //     />
      //   </div>
      //   <div className=" bold">
      //     <h5>{text.toUpperCase()}</h5>
      //   </div>
      //   <div className="">
      //     <div className="float-right">
      //       {actions && (
      //         <Actions
      //           actions={actions ? actions : []}
      //           iconColor={iconColor ? iconColor : 'default'}
      //           handleAction={actionName => handleAction(actionName)}
      //         />
      //       )}
      //     </div>
      //   </div>
      // </div>
      <div className={`row ${className}`}>
        <div className="col-4">
          <TextSearch
            className={`ml-3 mt-0 transitioned ${hideSearch && 'hide-content'}`}
            value=""
            onChange={val => handleAction('search', val)}
          />
        </div>
        <div className="col-4 bold"><h5>{text && text.toUpperCase()}</h5></div>
        <div className="col-4">
          <div className="float-right">
            {actions && (
              <Actions
                actions={actions ? actions : []}
                iconColor={iconColor ? iconColor : 'default'}
                handleAction={actionName => handleAction(actionName)}
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default memo(PageHeader)