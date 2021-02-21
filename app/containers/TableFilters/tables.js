export const tables = {
  'bridgesTable': {
    columns: [
      {
        label: 'Bridge ID',
        field: 'bid',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Type',
        field: 'bridge_type',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Region',
        field: 'region',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Spans',
        field: 'spans',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Length',
        field: 'general_length',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },


    ],
    rows: [

    ]
  },
  'projectBridgesTable': {
    columns: [
      {
        label: 'Bridge ID',
        field: 'bid',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Type',
        field: 'bridge_type',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Region',
        field: 'region',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Spans',
        field: 'spans',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Length',
        field: 'general_length',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },


    ],
    rows: [

    ]
  },
  'providersTable': {
    columns: [
      // {
      //   label: 'ID',
      //   field: 'id',
      //   sort: 'asc',
      //   width: 150
      // },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Contact name',
        field: 'contact_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Phone',
        field: 'phone',
        // sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        // sort: 'asc',
        width: 150
      },


    ],
    rows: [

    ]
  },
  'processTemplatesTasks': {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Organization',
        field: 'organization',
        sort: 'asc',
        width: 150
      },


    ],
    rows: [

    ]
  },
  'projectProcessesTable': {
    columns: [
      {
        label: 'Bridge ID',
        field: 'bid',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Process name',
        field: 'process_name',
        sort: 'asc',
        width: 150,
        filterType: 'select'
      },

      {
        label: 'Provider',
        field: 'provider_name',
        sort: 'asc',
        width: 150,
        filterType: 'select'
      },
      {
        label: 'Created by',
        field: 'created_by',
        sort: 'asc',
        width: 150,
        filterType: 'select'
      },
      {
        label: 'Remarks',
        field: 'remarks',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Start date',
        field: 'start_date',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },

      {
        label: 'Due date',
        field: 'due_date',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },

    ],
    rows: [

    ]
  },
  'statusTable': {
    columns: [
      {
        label: 'Bridge name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Process name',
        field: 'process_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Provider',
        field: 'provider_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'process_status',
        sort: 'asc',
        width: 150
      },


    ],
    rows: [

    ]
  },
  'projectsTable': {
    columns: [
      {
        label: 'Project name',
        field: 'name',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 150,
        filterType: 'text'
      },
      {
        label: 'Date created',
        field: 'date_created',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Project manager',
        field: 'project_mananer',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },
      {
        label: 'Due date',
        field: 'due_date',
        sort: 'asc',
        width: 150,
        filterType: 'number'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150,
        filterType: 'selectMultiple'
      },


    ],
    rows: [

    ]
  },
  'usersShortTable': {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'First name',
        field: 'first_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Last name',
        field: 'last_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Role',
        field: 'role',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'surveyLongTable': {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Bridge ID',
        field: 'bid',
        sort: 'asc',
        width: 150
      },
      // {
      //   label: 'Provider',
      //   field: 'provider_id',
      //   sort: 'asc',
      //   width: 150
      // },
      {
        label: 'Process name',
        field: 'process_template_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Remarks',
        field: 'remarks',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'surveyShortTable': {
    columns: [
      {
        label: 'ID',
        field: 'surveyId',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Type',
        field: 'survey_type',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Company',
        field: 'company',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Date',
        field: 'Survey_date',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'tilesShortTable': {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'modelsShortTable': {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'providersTable': {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Phone',
        field: 'phone',
        // sort: 'asc',
        width: 150
      },
      {
        label: 'Contact name',
        field: 'contact_name',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'organizationsTable': {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Phone',
        field: 'phone',
        // sort: 'asc',
        width: 150
      },
      {
        label: 'Contact name',
        field: 'contact_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'processesTable': {
    columns: [
      // {
      //   label: 'ID',
      //   field: 'id',
      //   sort: 'asc',
      //   width: 150
      // },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150
      },

      {
        label: 'Due date',
        field: 'due_date',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [

    ]
  },
  'messagesTable': {
    columns: [

      {
        label: 'Subject',
        field: 'subject',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Content',
        field: 'content',
        sort: 'asc',
        width: 150
      },


    ],
    rows: [

    ]
  },
  'images3dTable': {
    columns: [

      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      // {
      //   label: 'Lon',
      //   field: 'lon',
      //   sort: 'asc',
      //   width: 150
      // },
      // {
      //   label: 'Lat',
      //   field: 'lat',
      //   sort: 'asc',
      //   width: 150
      // },
      // {
      //   label: 'Height',
      //   field: 'height',
      //   sort: 'asc',
      //   width: 150
      // },


    ],
    rows: [

    ]
  },
  'nodesTable': {
    columns: [
      {
        label: 'Id',
        field: 'object_id',
        sort: 'asc',
        width: 100,
        filterType: 'number'
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 200,
        filterType: 'text'
      },



    ],
    rows: [

    ]
  },
}



const projectsShortTable = {
  columns: [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Name',
      field: 'projectName',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Status',
      field: 'projectStatus',
      sort: 'asc',
      width: 150
    },

  ],
  rows: [

  ]
}

const surveyShortTable = {
  columns: [
    {
      label: 'ID',
      field: 'surveyId',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Type',
      field: 'survey_type',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Company',
      field: 'company',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Date',
      field: 'Survey_date',
      sort: 'asc',
      width: 150
    },

  ],
  rows: [

  ]
}

const usersShortTable = {
  columns: [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'First name',
      field: 'first_name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Last name',
      field: 'last_name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Role',
      field: 'role',
      sort: 'asc',
      width: 150
    },

  ],
  rows: [

  ]
}
const tilesShortTable = {
  columns: [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },

  ],
  rows: [

  ]
}
const modelsShortTable = {
  columns: [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },

  ],
  rows: [

  ]
}

const providersTable = {
  columns: [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Phone',
      field: 'phone',
      // sort: 'asc',
      width: 150
    },
    {
      label: 'Contact name',
      field: 'contact_name',
      sort: 'asc',
      width: 150
    },

  ],
  rows: [

  ]
}
const organizationsTable = {
  columns: [
    {
      label: 'ID',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Phone',
      field: 'phone',
      // sort: 'asc',
      width: 150
    },
    {
      label: 'Contact name',
      field: 'contact_name',
      sort: 'asc',
      width: 150
    },

  ],
  rows: [

  ]
}
const processTemplatesTasks = {
  columns: [
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Description',
      field: 'description',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Organization',
      field: 'organization',
      sort: 'asc',
      width: 150
    },


  ],
  rows: [

  ]
}
