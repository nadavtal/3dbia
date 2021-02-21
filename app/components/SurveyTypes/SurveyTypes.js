import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ExportService } from 'containers/Wijmo/export';
import { sortBy } from 'utils/dataUtils'
import { makeSelectCurrentUser, makeSelectCurrentUserRole } from 'containers/App/selectors';
import SimpleTable from 'containers/MyTables/SimpleTable';
import MyWijmoDetailedTable from 'containers/MyTables/MyWijmoDetailedTable';
import { reArrangeObject } from 'utils/dataUtils'
import Menu from 'containers/Management/Menu'
import Layout from 'containers/Management/Layout';


const SurveyTypes = ({
  currentUser,
  currentUserRole,
  processesTemplates,
  processesTasks
  // type = 'organization'
}) => {
        const [selectedSurveyType, setSelectedSurveyType] = useState(
          processesTemplates[0].name,
        );
        
        console.log(processesTemplates);
        console.log(processesTasks);
        const menu = processesTemplates.map(type => {
          return { name: type.name, icon: 'briefcase' };
        });

        const onSetSelectedSurveyType = type => {
          console.log(type);
          setSelectedSurveyType(type);
        };

        const reArrangeTasks = () => {
          return processesTasks.map(task => reArrangeObject(task, ['name', 'task_name']))
        }
        const arrangedTasks = useMemo(() => reArrangeTasks(), [processesTasks])
        const createSubTasksTable = task => {
          const subTasks =
            task.sub_tasks_names && task.sub_tasks_names.split(',');
          const fileTypes =
            task.sub_tasks_file_types &&
            task.sub_tasks_file_types.split(',');
          const subTaskTable = [];
          for (let index = 0; index < subTasks.length; index++) {
            subTaskTable.push({
              name: subTasks[index],
              file_types: fileTypes && fileTypes[index],
            });
          }

          return subTaskTable;
        };
        const detailedTable = useMemo(
          () => (
            <MyWijmoDetailedTable
              data={sortBy(
                'id',
                arrangedTasks.filter(
                  task => task.name == selectedSurveyType,
                ),
              )}
              subData={sortBy(
                'id',
                arrangedTasks.filter(
                  task => task.name == selectedSurveyType,
                ),
              )}
              tableConfig={{
                exludesFields: [
                  'bid',
                  'organization_id',
                  'id',
                  'provider_id',
                  'sub_tasks_names',
                  'sub_tasks_remarks',
                  'sub_tasks_file_types',
                ],
                editableFields: [],
                longFields: [
                  'name',
                  'process_description',
                  'task_name',
                  'task_description',
                  'role_type_name',
                ],
                dateFields: [],
                fixedColumns: 2,
                wholeNumberFields: [],
                decimelNumberFields: [],
              }}
              exportService={new ExportService()}
              onRowClick={survey => console.log(survey)}
              onDetailedRowClick={task => console.log(task)}
              // connectingParentField="id"
              // connectingChildField="survey_id"
              detailedHeader="Sub tasks"
              selectionMode="Row"
              selectedSurvey={selectedSurveyType}
              detailedData={ctx => createSubTasksTable(ctx.item)}
            />
          ),
          [processesTasks, selectedSurveyType],
        );
        return (
          <Layout
            bodyTitle={selectedSurveyType}
            menuTitle="Menu"
            sideBarColWidth={3}
            menu={
              <Menu
                menu={menu}
                handleClick={item => onSetSelectedSurveyType(item)}
                selected={selectedSurveyType}
              />
            }
            headerComponent={
              <div>{selectedSurveyType}</div>
              //   <PageHeader
              //     text={selectedSurveyType}
              //     className="color-white"
              //     iconColor="colorPrimary"
              //     actions={actions[selectedSurveyType]}
              //     handleAction={(actionName, val) => handleAction(actionName, val)}
              //   />
            }
            component={selectedSurveyType ? detailedTable : <div />}
          />
        );
      };

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),

//   roleTypes: makeSelectRoleTypes()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewRole: (data) => dispatch(createNewRole(data)),
    onCreateNewProviderUser: (newUser, organization, org) => dispatch(registerNewProvUser(newUser, organization, org)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
    onAllocateUser: (newProviderUser) => dispatch(actions.allocateUser(newProviderUser)),
    // onCreateNewOrganizationUser: (newUser, organization) => dispatch(registerNewOrgUser(newUser, organization)),
    // onCreateNewProviderUserAndOrganizationUser: (newUser, organization, organization) => dispatch(createNewProviderUserAndThenAllocateToOrganization(newUser, organization, organization)),
    onAllocateUserToOrg: (user, org, role_id, roleName, remarks, provider_id) => dispatch(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id})),
    onFindEntity: (type, value) => dispatch(findEntityBy(type, value)),
    onToggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    onSetSelectedComponent: componentName => dispatch(setSelectedComponent(componentName)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SurveyTypes);



