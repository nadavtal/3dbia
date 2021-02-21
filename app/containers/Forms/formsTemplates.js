export const forms = {
  "surveyForm": {
    survey_type: {
      label: "Survey type",
      elementType: "select",
      elementConfig: {
        options: [
          {id: "type 1", name: "Type one"},
          {id: "type 2", name: "Type two"},
          {id: "type 3", name: "Type three"},
        ]
      },
      value: "",
      validation: {},
      valid: true
    },
    // Survey_date: {
    //   label: "Survey date",
    //   elementType: "input",
    //   elementConfig: {

    //     type: "datetime",
    //     placeholder: "Survey date"
    //   },
    //   value: "",
    //   validation: {
    //     required: false
    //   },
    //   valid: true,
    //   touched: false,
    //   errMsg: "Survey date is required!"
    // },

    surveyor: {
      label: "Surveyor",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Surveyor"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Surveyor is required!"
    },

    company: {
      label: "Company",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Company"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Company is required!"
    },

    entire_structure: {
      label: "Entire structure",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Entire structure"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Entire structure is required!"
    },

    immediate_attention: {
      label: "Immediate attention",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Immediate attention"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Immediate attention is required!"
    },
    survey_purpose: {
      label: "Survey purpose",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Survey_purpose"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Survey purpose is required!"
    },
    CPI_AVG: {
      label: "CPI AVG",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "CPI AVG"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "CPI AVG on is required!"
    },
    CPI_CRIT: {
      label: "CPI CRIT",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "CPI CRIT"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "CPI CRIT on is required!"
    },
    Next_survey_date: {
      label: "Next survey date",
      elementType: "date",
      elementConfig: {

        type: "date",
        placeholder: "Next survey date"
      },
      value: "",
      validation: {
        required: false
      },
      valid: false,
      touched: false,
      errMsg: "Next survey date is required!"
    },
    next_survey_type: {
      label: "Next survey type",
      elementType: "select",
      elementConfig: {
        options: [
          {id: "type 1", name: "Type one"},
          {id: "type 2", name: "Type two"},
          {id: "type 3", name: "Type three"},
        ]
      },
      value: "",
      validation: {},
      valid: true
    },
    Pre_survey: {
      label: "Pre survey date",
      elementType: "date",
      elementConfig: {

        type: "date",
        placeholder: "Pre survey date"
      },
      value: "",
      validation: {
        required: false
      },
      valid: false,
      touched: false,
      errMsg: "Pre survey date is required!"
    },

    SCS_AVG: {
      label: "SCS AVG",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "SCS AVG"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "SCS AVG on is required!"
    },
    SCS_CRIT: {
      label: "SCS CRIT",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "SCS CRIT"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "SCS CRIT on is required!"
    },
    Revision: {
      label: "Revision",
      elementType: "input",
      elementConfig: {

        type: "datetime",
        placeholder: "Revision"
      },
      value: "",
      validation: {
        required: false
      },
      valid: false,
      touched: false,
      errMsg: "Revision is required!"
    },
    Revised_By: {
      label: "Revised by",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Revised by"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Revised by on is required!"
    },
    remarks: {
      label: "remarks",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "remarks"
      },
      value: "",
      validation: {
        required: false
      },
      valid: false,
      touched: false,
      errMsg: "remarks on is required!"
    },

  },
  "projectForm": {
    name: {
      label: "Project name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Project Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Project must have a name!"
    },
    description: {
      label: "Project description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Project description"
      },
      value: "",
      validation: {
        required: false
      },
      valid: false,
      touched: false,
      errMsg: "Project must have a name!"
    },
    project_manager_id: {
      label: "Project manager",
      elementType: "select",
      elementConfig: {
        // options: props.users,\
        // optionValueAttr: "name",
        options: []
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Project must have a name!"
    },
    due_date: {
      label: "Due date",
      elementType: "date",
      elementConfig: {

        type: "date",

      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Next survey date is required!"
    },

  },
  "bridgeForm": {
    bid: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    name: {
      label: "Bridge name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Bridge Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Project must have a name!"
    },
    bridge_type: {
      label: "Bridge type",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Project must have a name!"
    },
    bridge_type_code: {
      label: "Bridge type code",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Bridge type code"
      },
      value: "",
      // validation: {
      //   required: true
      // },
      valid: true,
      touched: false,

    },
    structure_name: {
      label: "Structure name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Structure name"
      },
      value: "",
      valid: true,
      touched: false,

    },
    
    description: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Description"
      },
      value: "",
      valid: true,
      touched: false,

    },
    
    lat: {
      label: "Latitude",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Latitude"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Latitude is required!"
    },
    lon: {
      label: "Longitude",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Longitude"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Longitude is required!"
    },
    x: {
      label: "local X",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "local X"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "local X is required!"
    },
    y: {
      label: "Local Y",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "local Y"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "local Y is required!"
    },
    bridge_status: {
      label: "Status",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Status"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Foundations is required!"
    },
    main_road: {
      label: "Main Road",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Main road"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Foundations is required!"
    },
    road_station: {
      label: "Road station",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Road station"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Longitude is required!"
    },
    location: {
      label: "Location",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Location"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Foundations is required!"
    },
    spans: {
      label: "Spans",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Spans"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Longitude is required!"
    },
  },
  "userForm": {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: null,
      validation: {},
      valid: true,
      hidden: true
    },
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {
        // validate: true,
        type: "email",
        placeholder: "Email"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter email!"
    },
    first_name: {
      label: "First name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "First Name"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter first name!"
    },
    last_name: {
      label: "Last name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "last Name"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter last name!"
    },
    password: {
      label: "Password",
      elementType: "input",
      elementConfig: {

        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
        maxLength: 12
      },
      valid: false,
      touched: false,
      errMsg: "Please enter password!"
    },

    confirmPassword: {
      label: "Confirm password",
      elementType: "input",
      elementConfig: {

        type: "password",
        placeholder: "Confirm password"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please re-enter password!"
    },
    address: {
      label: "Address",
      elementType: "input",
      elementConfig: {
        // validate: true,
        type: "textarea",
        placeholder: "Address"
      },
      value: "",
      validation: {
        required: true,

      },
      valid: false,
      touched: false,
      errMsg: "Please enter address!"
    },
    phone: {
      label: "phone",
      elementType: "input",
      elementConfig: {
        pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        type: "number",
        placeholder: "enter phone"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter phone!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        type: "textarea",
        placeholder: "numberl us something about yourself"
      },
      value: "",
      // validation: {
      //   required: false,
      // },
      valid: true,
      touched: false,

    },
    // roles: {
    //   label: "Roles",
    //   elementType: "selectMultiple",
    //   elementConfig: {
    //     // options: props.roleTypes
    //     options: []
    //   },
    //   value: "",
    //   validation: {},
    //   valid: true
    // },
    // user_image: {
    //   label: "Profile image",
    //   elementType: "file",
    //   elementConfig: {

    //   },
    //   value: "",
    //   validation: {},
    //   valid: true
    // },

  },
  "loginUserForm":  {
    email: {
      label: "Email",
      
      elementType: "input",
      elementConfig: {
        icon: "at",
        type: "email",
        placeholder: "Enter email"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter user email!"
    },

    password: {
      label: "Password",
      
      elementType: "input",
      elementConfig: {
        icon: "lock",
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter password!"
    },

  },
  "registerUserForm":  {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {
        disabled: false,
        type: "email",
        placeholder: "Email"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
     
      valid: false,
      touched: false,
      onBlur: "findEntityByMail",
      errMsg: "Please enter valid email!"
    },
    first_name: {
      label: "First name",
      elementType: "input",
      elementConfig: {
        disabled: false,
        type: "text",
        placeholder: "First name"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      
      onBlur: "",
      errMsg: "Please numberl us your name!"
    },
    last_name: {
      label: "Last name",
      elementType: "input",
      elementConfig: {
        disabled: false,
        type: "text",
        placeholder: "Last name"
      },
      value: "",
      validation: {
        required: true,
      },
      
      valid: false,
      touched: false,
      onBlur: "",
      errMsg: "Please enter your last name"
    },
    // password: {
    //   label: "Password",
    //   elementType: "input",
    //   elementConfig: {

    //     type: "password",
    //     placeholder: "Password"
    //   },
    //   value: "",
    //   validation: {
    //     required: true,
    //   },
    //   valid: false,
    //   touched: false,
    //   errMsg: "Please enter password!"
    // },
    // confirmPassword: {
    //   label: "Confirm password",
    //   elementType: "input",
    //   elementConfig: {

    //     type: "password",
    //     placeholder: "Password"
    //   },
    //   value: "",
    //   validation: {
    //     required: true,
    //     confirm: "password"
    //   },
    //   valid: false,
    //   touched: false,
    //   errMsg: "Please confirm password!"
    // },
    role_id: {
      label: "Assign role",
      elementType: "select",
      elementConfig: {
        // options: props.roleTypes
        options: []
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: true,
      errMsg: "Please assign a role!"
    },

  },
  "organizationForm":  {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    user_id: {
      label: "Admin user id",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    created_by: {
      label: "Created by",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    // email: {
    //   label: "Email",
    //   elementType: "input",
    //   elementConfig: {

    //     type: "email",
    //     placeholder: "Email"
    //   },
    //   value: "",
    //   validation: {
    //     required: true,
    //     unique: true
    //   },
    //   valid: false,
    //   touched: false,
    //   errMsg: "Please enter contact email!"
    // },
    name: {
      label: "Organization name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Organization name"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter organization name!"
    },
    adminEmail: {
      label: "Administrator email",
      elementType: "input",
      elementConfig: {

        type: "email",
    
      },
      value: "",
      validation: {
        required: true,
        // unique: false
      },
      valid: false,
      touched: false,
      errMsg: "Please enter admin email!"
    },
    first_name: {
      label: "Administrator first name",
      elementType: "input",
      elementConfig: {

        type: "text",
        
      },
      value: "",
      validation: {
        required: true,
        confirm: "password"
      },
      valid: false,
      touched: false,
      errMsg: "Please confirm password!"
    },
    last_name: {
      label: "Administrator last name",
      elementType: "input",
      elementConfig: {

        type: "text",
        
      },
      value: "",
      validation: {
        required: true,
        confirm: "password"
      },
      valid: false,
      touched: false,
      errMsg: "Please confirm password!"
    },

 
    phone: {
      label: "phone",
      elementType: "input",
      elementConfig: {
        pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        type: "number",
        placeholder: "enter phone"
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      errMsg: "Please enter phone!"
    },
    address: {
      label: "Address",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Address"
      },
      value: "",

      valid: true,
      touched: false,

    },
    remarks: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Description"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter organization name!"
    },
    unit_system: {
      label: "Metric system",
      elementType: "select",
      elementConfig: {
        options: [
          {id:"cm" ,name: "cm"},
          {id:"inch" ,name: "inch"},
          {id:"deg" ,name: "deg"},

        ]
      },
      value: "",

      valid: true
    },
    engineering_schema: {
      label: "Enginnering schema",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Enginnering schema"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter organization name!"
    },
    website: {
      label: "Website",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Website"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter organization name!"
    },

    contact_name: {
      label: "Contact name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Contact name"
      },
      value: "",
      validation: {
        required: true,

      },
      valid: true,
      touched: false,
      errMsg: "Please enter contact name!"
    },


  },
  "updateOrganizationForm":  {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    created_by: {
      label: "Created by",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {

        type: "email",
        placeholder: "Email"
      },
      value: "",
      validation: {
        required: false,
        unique: true
      },
      valid: true,
      touched: false,
      hidden: true,
      errMsg: "Please enter contact email!"
    },
    name: {
      label: "Organization name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Organization name"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter organization name!"
    },
    general_status: {
      label: "Status",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true,
        
      },
      valid: false,
      hidden: true,
      touched: false,
      errMsg: "Please enter organization name!"
    },

    
    phone: {
      label: "phone",
      elementType: "input",
      elementConfig: {
        pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        type: "number",
        placeholder: "enter phone"
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      errMsg: "Please enter phone!"
    },
    remarks: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Description"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter organization name!"
    },
    unit_system: {
      label: "Metric system",
      elementType: "select",
      elementConfig: {
        options: [
          {name: "cm"},
          {name: "inch"},
          {name: "deg"},
        ]
      },
      value: "",

      valid: true
    },
    engineering_schema: {
      label: "Enginnering schema",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Enginnering schema"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter organization name!"
    },
    website: {
      label: "Website",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Website"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter organization name!"
    },

    contact_name: {
      label: "Contact name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Contact name"
      },
      value: "",
      validation: {
        required: true,

      },
      valid: true,
      touched: false,
      errMsg: "Please enter contact name!"
    },


  },
  "providerForm":  {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    user_id: {
      label: "Admin user id",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    created_by: {
      label: "Created by",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    // email: {
    //   label: "Email",
    //   elementType: "input",
    //   elementConfig: {

    //     type: "email",
    //     placeholder: "Email"
    //   },
    //   value: "",
    //   validation: {
    //     required: true,
    //     unique: true
    //   },
    //   valid: false,
    //   touched: false,
    //   onBlur: "findEntityByMail",
    //   errMsg: "Please enter contact email!"
    // },
    name: {
      label: "Provider name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Provider name"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter provider name!"
    },
    adminEmail: {
      label: "Administrator email",
      elementType: "input",
      elementConfig: {

        type: "email",
        placeholder: "Administrator email"
      },
      value: "",
      validation: {
        required: true,
        // unique: false
      },
      valid: false,
      touched: false,
      errMsg: "Please enter admin email!"
    },
    first_name: {
      label: "Administrator first name",
      elementType: "input",
      elementConfig: {

        type: "text",
        
      },
      value: "",
      validation: {
        required: true,
        confirm: "password"
      },
      valid: false,
      touched: false,
      errMsg: "Please confirm password!"
    },
    last_name: {
      label: "Administrator last name",
      elementType: "input",
      elementConfig: {

        type: "text",
        
      },
      value: "",
      validation: {
        required: true,
        confirm: "password"
      },
      valid: false,
      touched: false,
      errMsg: "Please confirm password!"
    },
    
    phone: {
      label: "phone",
      elementType: "input",
      elementConfig: {
        pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        type: "number",
        placeholder: "enter phone"
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      errMsg: "Please enter phone!"
    },
    contact_name: {
      label: "Contact name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Contact name"
      },
      value: "",
      validation: {
        required: true,

      },
      valid: true,
      touched: false,
      errMsg: "Please enter contact name!"
    },
    website: {
      label: "Website",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Website"
      },
      value: "",

      valid: true,
      touched: false,

    },

    region: {
      label: "Region",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Region"
      },
      value: "",

      valid: true,
      touched: false,

    },
    address: {
      label: "Address",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Address"
      },
      value: "",

      valid: true,
      touched: false,

    },
    remarks: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Description"
      },
      value: "",

      valid: true,
      touched: false,

    },

    about_team: {
      label: "About team",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Say something about your team"
      },
      value: "",

      valid: true,
      touched: false,

    },




  },
  "updateProviderForm":  {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    created_by: {
      label: "Created by",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {

        type: "email",
        placeholder: "Email"
      },
      value: "",
      validation: {
        required: false,
        unique: true
      },
      valid: true,
      touched: false,
      hidden: true,
      errMsg: "Please enter contact email!"
    },
    name: {
      label: "Provider name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Provider name"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter provider name!"
    },
    
    phone: {
      label: "phone",
      elementType: "input",
      elementConfig: {
        pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        type: "number",
        placeholder: "enter phone"
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      errMsg: "Please enter phone!"
    },
    contact_name: {
      label: "Contact name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Contact name"
      },
      value: "",
      validation: {
        required: true,

      },
      valid: true,
      touched: false,
      errMsg: "Please enter contact name!"
    },
    website: {
      label: "Website",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Website"
      },
      value: "",

      valid: true,
      touched: false,

    },

    region: {
      label: "Region",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Region"
      },
      value: "",

      valid: true,
      touched: false,

    },
    address: {
      label: "Address",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Address"
      },
      value: "",

      valid: true,
      touched: false,

    },
    remarks: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Description"
      },
      value: "",

      valid: true,
      touched: false,

    },

    about_team: {
      label: "About team",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Say something about your team"
      },
      value: "",

      valid: true,
      touched: false,

    },




  },
  "basicInfoForm":  {
    name: {
      label: "name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Name"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter name!"
    },
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {

        type: "email",
        placeholder: "Email"
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter contact email!"
    },
    phone: {
      label: "phone",
      elementType: "input",
      elementConfig: {
        pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        type: "number",
        placeholder: "enter phone"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter phone!"
    },
    contact_name: {
      label: "Contact name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Contact name"
      },
      value: "",
      validation: {
        required: true,

      },
      valid: true,
      touched: false,
      errMsg: "Please enter contact name!"
    },
    website: {
      label: "Website",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Website"
      },
      value: "",

      valid: true,
      touched: false,

    },

    region: {
      label: "Region",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Region"
      },
      value: "",

      valid: true,
      touched: false,

    },
    address: {
      label: "Address",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Address"
      },
      value: "",

      valid: true,
      touched: false,

    },
    termsAndConditions: {
      label: "I agreee to the terms and conditions",
      elementType: "checkbox",
      elementConfig: {

      },
      validation: {
        required: true
      },
      value: false,

      valid: false,
      touched: false,
      errMsg: "Please agree to terms & conditions!"
    },
    recieveNews: {
      label: "I want to receive newsletter",
      elementType: "checkbox",
      elementConfig: {

      },
      validation: {
        required: false
      },
      value: false,

      valid: true,
      touched: false,
      
    },
    




  },
  "processForm":  {
    process_template_id: {
      label: "Process template",
      elementType: "select",
      elementConfig: {
        options: [
          {id: "1", name: "Initial survey UAV"},
          {id: "2", name: "Bridge survey UAV"},

        ]
      },
      value: "",
      validation: {
        required: true,
        unique: true
      },
      valid: false,
      touched: false,
      errMsg: "Please enter user name!"
    },

    provider_id: {
      label: "Choose providers",
      elementType: "select",
      elementConfig: {
        // options: props.providers
        options: []
      },
      value: "",
      // validation: {
      //   required: true,
      //   unique: true
      // },
      valid: true,
      touched: false,
      errMsg: "Please enter user name!"
    },

    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "any special remarks?"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter password!"
    },

  },
  "allocateUserForm": {
    role_name: {
      label: "Role name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "remarks"
      },
      value: "",
      // validation: {
      //   required: false
      // },
      valid: true,
      touched: false,
      errMsg: "remarks on is required!"
    },
    user_id: {
      label: "Choose user",
      elementType: "select",
      elementConfig: {
        // options: props.users
        options: []
      },
      value: null,
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Please choose a user!"
    },
    role: {
      label: "Assign role",
      elementType: "select",
      elementConfig: {
        // options: props.roleTypes
        options: []
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: true,
      errMsg: "Please assign a role!"
    },
    remarks: {
      label: "remarks",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "remarks"
      },
      value: "",
      // validation: {
      //   required: false
      // },
      valid: true,
      touched: false,
      errMsg: "remarks on is required!"
    },
  },
  "createProcessTemaplateForm": {
    name: {
      label: "Process name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Process name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Please give this process a name!"
    },
    description: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Process description"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter password!"
    },
    // initial_num_tasks: {
    //   label: "Initial tasks number",
    //   elementType: "input",
    //   elementConfig: {

    //     type: "number",
    //     placeholder: "Process description"
    //   },
    //   value: "",

    //   valid: true,
    //   touched: false,

    // },
  },
  "processTemaplateTaskForm": {
    task_name: {
      label: "Task name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Task name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Please give this task a name!"
    },

    role_type_name: {
      label: "Role type",
      elementType: "select",
      elementConfig: {
        optionValueAttr: "name",
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Please assign a role!"
    },
    task_def_status: {
      label: "Task default status",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Task default status"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    task_description: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Task description"
      },
      value: "",

      valid: true,
      touched: false,
      errMsg: "Please enter password!"
    }
  },
  "modelForm": {
    model_part: {
      label: "Model part",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Model part"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    status: {
      label: "Status",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Status"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    name: {
      label: "Model name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Model name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    url: {
      label: "Model path",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Model path"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Ion Id or model path are required"
    },
    ion_id: {
      label: "ION ID",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Ion Id"
      },
      value: "",
      validation: {
        required: true,
        minLength: 3
      },
      valid: false,
      touched: false,
      errMsg: "Ion Id or model path are required"
    },
    type: {
      label: "Model type",
      elementType: "select",
      elementConfig: {
        options: [
          {id: "cad", name: "Cad"},
          {id: "model", name: "Model"}
        ],
        search: false,
      },
      
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Remarks"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
  },
  "spansForm": {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    bid: {
      label: "Bridge Id",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    name: {
      label: "Span name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Span name"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    description: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Description"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    structure_type_id: {
      label: "Select structure type",

      elementType: "select",
      elementConfig: {
        options: [],
        search: true,
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "structure type is required!"
    },
    // nodes: {
    //   label: "Select elements",

    //   elementType: "selectMultiple",
    //   elementConfig: {
    //     options: [],
    //     search: true,
    //   },
    //   value: "",
    //   validation: {},
    //   valid: true
    // },
    span_order: {
      label: "Span order",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Span order"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    // total_spans: {
    //   label: "Total spans",
    //   elementType: "input",
    //   elementConfig: {

    //     type: "number",
    //     placeholder: "Total spans"
    //   },
    //   value: "",
    //   validation: {
    //     required: false
    //   },
    //   valid: true,
    //   touched: false,
    //   errMsg: "Please give this task a name!"
    // },
    span_area: {
      label: "Span area",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Span rea"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "span area is required!"
    },
    status: {
      label: "Status",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Status"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },

  },
  "elementForm": {
    id: {
      label: "ID",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    bid: {
      label: "Bridge Id",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    object_id: {
      label: "Object Id",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    name: {
      label: "Element name",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Element name"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
    span_id: {
      label: "Span name",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: true
    },
    element_group_id: {
      label: "Element group",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },

    element_type_id: {
      label: "Element type",
      elementType: "select",
      elementConfig: {
        options:[]
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    order: {
      label: "Sub element order",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Sub element order"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },

    importance: {
      label: "Importance",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Importance"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    primary_unit: {
      label: "Primary unit",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Primary units"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    primary_quantity: {
      label: "Primary quantity",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Primary quantity"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    secondary_unit: {
      label: "Secondary unit",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Secondary unit"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    secondary_quantity: {
      label: "Secondary quantity",
      elementType: "input",
      elementConfig: {

        type: "number",
        placeholder: "Secondary quantity"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    detailed_evaluation_required: {
      label: "Detailed evaluation request",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Detailed evaluation request"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },

    view_position: {
      label: "View position",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "View position"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    description: {
      label: "Description",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Description"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Remarks"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    }
  },
  "spanAllocationForm": {

    span_id: {
      label: "Span name",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: false
    },
    element_group_id: {
      label: "Element group",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: false
      },
      valid: false,
      touched: false,
      errMsg: "Please give this task a name!"
    },

    element_type_id: {
      label: "Element type",
      elementType: "select",
      elementConfig: {
        options:[]
      },
      value: "",
      validation: {
        required: false
      },
      valid: false,
      touched: false,
      errMsg: "Please give this task a name!"
    },

  },
  "userAllocationForm": {

    target: {
      label: "Allocate to...",
      elementType: "select",
      elementConfig: {
        options: [
          {id: "organization", name: "Organization"},
          {id: "provider", name: "Provider"},
          
        ]
      },
      value: "",
      validation: {},
      valid: false
    },
    organization_id: {
      label: "Select organization",
      elementType: "select",
      elementConfig: {
        options: [],
        disabled: true
      },
      value: "",
      validation: {},
      valid: true
    },
    provider_id: {
      label: "Select provider",
      elementType: "select",
      elementConfig: {
        options: [],
        disabled: true
      },
      value: "",
      validation: {},
      valid: true
    },
    role_id: {
      label: "Select role",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        // type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
  },
  "processAllocationForm": {

    processTemplate: {
      label: "Choose process",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    name: {
      label: "Survey name",
      elementType: "input",
      elementConfig: {
        
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      // errMsg: "Must choose a role!"
    },
    survey_purpose: {
      label: "Survey purpose",
      elementType: "input",
      elementConfig: {
        
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      // errMsg: "Must choose a role!"
    },
    provider_id: {
      label: "Select provider",
      elementType: "select",
      elementConfig: {
        options: [],
        disabled: true
      },
      value: "",
      validation: {},
      valid: true
    },
    start_date: {
      label: "Start date",
      elementType: "date",
      elementConfig: {

        type: "date",
        placeholder: "Due date"
      },
      value: Date.now(),
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
    due_date: {
      label: "Due date",
      elementType: "date",
      elementConfig: {

        type: "date",
        placeholder: "Due date"
      },
      value: Date.now(),
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
    survey_year: {
      label: "Survey year",
      elementType: "number",
      elementConfig: {
        minLength: 4,
        maxLength: 4
      },
      value: new Date().getFullYear(),
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        // type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
    entire_structure: {
      label: "Entire structure",
      elementType: "checkbox",
      elementConfig: {
       
      },

      value: true,
      validation: {
        required: false
      },
      valid: true,
      touched: false,

      
    },
  },
  "taskAllocationForm": {

    user_id: {
      label: "Choose user",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a user!"
    },
    due_date: {
      label: "Due date",
      elementType: "date",
      elementConfig: {

        type: "date",

      },
      value: "",

      valid: true,
      touched: false,
      // errMsg: "Next survey date is required!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        // type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
    status: {
      label: "Status",
      elementType: "input",
      elementConfig: {
        disabled: true
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },

  },
  "taskFilterForm": {

    survey_id: {
      label: "Choose survey",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: true,
      touched: false,
      errMsg: "Must choose a survey!"
    },
    // taskName: {
    //   label: "Choose task",
    //   elementType: "select",
    //   elementConfig: {
    //     options: []
    //   },
    //   value: "",
    //   validation: {
    //     required: true
    //   },
    //   valid: false,
    //   touched: false,
    //   errMsg: "Must choose a user!"
    // },

  },
  "organizaionUserAllocationForm": {

    // user_type: {
    //   label: "Choose user type",
    //   elementType: "select",
    //   elementConfig: {
    //     options: [
    //       {id: 1, name: "Inhouse user"},
    //       {id: 2, name: "Provider user"}]
    //   },
    //   value: "",
    //   validation: {},
    //   valid: false
    // },
    provider_id: {
      label: "Choose provider",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    organization_id: {
      label: "Choose provider",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: true,
      hidden: true
    },
    role_id: {
      label: "Select role",
      elementType: "select",
      elementConfig: {
        options: [],
        multiple: false
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Must choose a role!"
    },
    user_id: {
      label: "Choose users",
      elementType: "select",
      elementConfig: {
        options: [],
        multiple: true,
        search: true,
      },
      value: [],
      validation: {},
      valid: true
    },
 
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        // type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
  },
  "providerUserAllocationForm": {


    user_id: {
      label: "Choose user",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: false
    },
    role_id: {
      label: "Select role",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        // type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
  },
  "providerOrganizationAllocationForm": {


    organization_id: {
      label: "Choose organization",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: false
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        // type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
  },
  "organizationProviderAllocationForm": {


    provider_id: {
      label: "Choose provider",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: false
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        // type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    },
  },
  "workSpaceForm": {

    workSpace: {
      label: "Choose role",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {},
      valid: false
    },
    default: {
      label: "Make this my default page",
      elementType: "input",
      elementConfig: {
        type: "checkbox",
        // placeholder: "Survey date"
      },

      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },


  },
  "roleForm": {
    role_type_id: {
      label: "Select role type",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    name: {
      label: "Role name",
      elementType: "input",
      elementConfig: {
        
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },
    description: {
      label: "Description",
      elementType: "input",
      elementConfig: {
       
      },

      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
    visibility: {
      label: "Make this role public for all providers ",
      elementType: "checkbox",
      elementConfig: {
       
      },

      value: true,
      validation: {
        required: false
      },
      valid: true,
      touched: false,

      
    },
  
    
  },
  "providerRoleForm": {
    role_type_id: {
      label: "Select role type",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    name: {
      label: "Role name",
      elementType: "input",
      elementConfig: {
        
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },
    description: {
      label: "Description",
      elementType: "input",
      elementConfig: {
       
      },

      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
  
  },
  "userRoleForm": {
    id: {
      label: "Select role",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      hidden: true,
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    role_id: {
      label: "Select role",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    connectionStatus: {
      label: "Status ",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        type: "textarea"
      },

      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
    },

  
    
  },
  "statusRemarksForm": {
    
    connectionStatus: {
      label: "Status ",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        type: "textarea"
      },

      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
    },

  
    
  },
  "generalRoleForm": {
    name: {
      label: "Role name",
      elementType: "input",
      elementConfig: {
        
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },
    description: {
      label: "Description",
      elementType: "input",
      elementConfig: {
       
      },

      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      errMsg: "Please give this task a name!"
    },
  
    
  },
  "roleTypeForm": {

    name: {
      label: "Role type name",
      elementType: "input",
      elementConfig: {
        
      },
      value: "",
      validation: {
        required: true
      },
      valid: false
    },
        
  },
  "rolesForm": {
    role_id: {
      label: "Select role ",
      elementType: "select",
      elementConfig: {
        options: []
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Must choose a role!"
    },
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        type: "textarea"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false,
      
    }     
  },
  "taskRejectionForm": {
    remarks: {
      label: "Remarks",
      elementType: "input",
      elementConfig: {
        type: "textarea"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      errMsg: "Please give a reason for rejection!"
    }   
  },
  "messageForm": {
    // sender_user_id: {
    //   label: "First name",
    //   elementType: "input",
    //   hidden: true,
    //   elementConfig: {

    //     type: "text",
    //     placeholder: "From"
    //   },
    //   value: "",
    //   validation: {
    //     required: true,
    //   },
    //   valid: false,
    //   touched: false,
      
    // },
    receiver_user_id: {
      label: "To",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "To"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter recipient!"
    },
    subject: {
      label: "Subject",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Subject"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter subject!"
    },
    message: {
      label: "Message",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Message"
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      errMsg: "Please enter message!"
    },

  },
  "annotationForm": {
    subject: {
      label: "Subject",
      elementType: "input",
      elementConfig: {

        type: "text",
        placeholder: "Subject"
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errMsg: "Please enter subject!"
    },
    message: {
      label: "Message",
      elementType: "input",
      elementConfig: {

        type: "textarea",
        placeholder: "Message"
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      errMsg: "Please enter message!"
    },

  }
}
