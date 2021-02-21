
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
// console.log(currentUser);
const userOrgRoles = () => {
  let roles = []
  currentUser.userOrganiztionRoles.map(role =>  {
    // console.log(role)
    roles.push({
      org_id: role.org_id,
      name: role.org_name,
      roleName: role.role_name
    })
  })

  return roles
}
const userProviderRoles = () => {
  let roles = []

  currentUser.userProviderRoles.map(role =>  {
    // console.log(role)
    roles.push({
      provider_id: role.provider_id,
      name: role.name,
      roleName: ''
    })

  })

  return roles
}
export const menus = {
  generic: [
    {
      name: 'Bridges',
      icon: 'building',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Surveys',
      icon: 'tasks',
      type: 'sub-menu',
      float: 'left',
    },
    {
      name: 'Messages',
      icon: 'envelope',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },
    {
      name: 'Schedule',
      icon: 'calendar-alt',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },
   
  ],
  admin: [
    {
      name: 'Bridges',
      icon: 'building',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Surveys',
      icon: 'tasks',
      type: 'sub-menu',
      float: 'left',
    },
    {
      name: 'Messages',
      icon: 'envelope',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },
    {
      name: 'Schedule',
      icon: 'calendar-alt',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },
   
  ],
  providerMenu: [
    {
      name: 'Bridges',
      icon: 'building',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Surveys',
      icon: 'tasks',
      type: 'sub-menu',
      float: 'left',
    },
    {
      name: 'Messages',
      icon: 'envelope',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },
    {
      name: 'Schedule',
      icon: 'calendar-alt',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },

    
  ],
  organizationMenu: [
    {
      name: 'Bridges',
      icon: 'building',
      type: 'sub-menu',
      float: 'left'
    },

    {
      name: 'Surveys',
      icon: 'tasks',
      type: 'sub-menu',
      float: 'left',
      children: [
        // {name: 'Active processes', counter: false},
        {name: 'Manage surveys', counter: false},
        {name: 'Allocate surveys', counter: false},
        {name: 'Surveys types', counter: false},
      ]
    },
    {
      name: 'Messages',
      icon: 'envelope',
      type: 'sub-menu',
      float: 'right',
      counter: true,
      // children: [
      //   {name: 'Notifications', counter: true},
      //   {name: 'Requests', counter: true},
      // ]
    },
    {
      name: 'Schedule',
      icon: 'calendar-alt',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },
   
  ],
  marketMenu: [
    {
      name: currentUser && currentUser.userInfo ? currentUser.userInfo.first_name : 'User',
      icon: 'user',
      type: 'sub-menu',
      float: 'left',
      children: [
          {
            name: 'Switch work space',
            children: [
                {
                  name: 'Providers',
                  children: [
                      
                  ]
                },
                {
                  name: 'Organizations',
                  children: [
                      
                  ]
                },
            ]
        }
      ]
    },
    {
      name: 'Models',
      icon: 'cubes',
      type: 'category-menu',
      float: 'left',
      categories: [
        {id: 1, icon: 'car', name: 'Vehicles', parentCategories: []},
        {id: 2, icon: 'city', name: 'Arcitecture', parentCategories: []},
        {id: 3, icon: 'utensils', name: 'Food', parentCategories: []},
        // {id: 4, icon: 'palette', name: 'Animated', parentCategories: []},
        // {id: 5, icon: 'user-astronaut', name: 'Space', parentCategories: []},
        {id: 6, icon: 'running', name: 'Sports', parentCategories: []},
        {id: 7, icon: 'horse', name: 'Animals', parentCategories: []},
        {id: 8, icon: 'leaf', name: 'Nature', parentCategories: []},
        {id: 9, icon: 'car', name: 'Cars', parentCategories: [1]},
        {id: 10, icon: 'fighter-jet', name: 'Air planes', parentCategories: [1]},
        {id: 11, icon: 'motorcycle', name: 'Motor cycles', parentCategories: [1]},
        {id: 12, icon: 'truck', name: 'Trucks', parentCategories: [1]},
        {id: 13, icon: 'flag-checkered', name: 'Race cars', parentCategories: [1]},
        {id: 14, icon: 'car', name: 'Old cars', parentCategories: [1]},
        {id: 15, icon: 'car', name: 'Buildings', parentCategories: [2]},
        {id: 16, icon: 'fighter-jet', name: 'Houses', parentCategories: [2]},
        {id: 17, icon: 'motorcycle', name: 'Street', parentCategories: [2]},
        {id: 18, icon: 'truck', name: 'Lighing', parentCategories: [2]},
        {id: 19, icon: 'flag-checkered', name: 'Doors', parentCategories: [2]},
        {id: 20, icon: 'car', name: 'Meals', parentCategories: [3]},
        {id: 21, icon: 'car', name: 'Meat', parentCategories: [3]},
        {id: 22, icon: 'fighter-jet', name: 'Vegetables', parentCategories: [3]},
        {id: 23, icon: 'motorcycle', name: 'Drinks', parentCategories: [3]},
        {id: 24, icon: 'truck', name: 'Snacks', parentCategories: [3]},
        {id: 25, icon: 'car', name: 'Forest', parentCategories: [8]},
        {id: 26, icon: 'car', name: 'Trees', parentCategories: [8]},
        {id: 27, icon: 'fighter-jet', name: 'Flowers', parentCategories: [8]},
        {id: 28, icon: 'motorcycle', name: 'Leafs', parentCategories: [8]},
        {id: 29, icon: 'truck', name: 'Grass', parentCategories: [8]},
        {id: 30, icon: 'car', name: 'Dogs', parentCategories: [7]},
        {id: 31, icon: 'car', name: 'Cats', parentCategories: [7]},
        {id: 32, icon: 'fighter-jet', name: 'Wild', parentCategories: [7]},
        {id: 33, icon: 'motorcycle', name: 'Birds', parentCategories: [7]},
        {id: 34, icon: 'truck', name: 'Insects', parentCategories: [7]},
        {id: 35, icon: 'car', name: 'Ball', parentCategories: [6]},
        {id: 36, icon: 'car', name: 'Court', parentCategories: [6]},
        {id: 37, icon: 'fighter-jet', name: 'Player', parentCategories: [6]},
        {id: 38, icon: 'motorcycle', name: 'Score board', parentCategories: [6]},
        
        
      ]
    },
    {
      name: 'Users',
      icon: 'users',
      type: 'featured-menu',
      float: 'left',
      categories: [
        {id: 1, icon: 'car', name: 'Vehicles', parentCategories: []},
        {id: 2, icon: 'city', name: 'Arcitecture', parentCategories: []},
        {id: 3, icon: 'utensils', name: 'Food', parentCategories: []},
        // {id: 4, icon: 'palette', name: 'Animated', parentCategories: []},
        // {id: 5, icon: 'user-astronaut', name: 'Space', parentCategories: []},
        {id: 6, icon: 'running', name: 'Sports', parentCategories: []},
        {id: 7, icon: 'horse', name: 'Animals', parentCategories: []},
        {id: 8, icon: 'leaf', name: 'Nature', parentCategories: []},
        {id: 9, icon: 'car', name: 'Cars', parentCategories: [1]},
        {id: 10, icon: 'fighter-jet', name: 'Air planes', parentCategories: [1]},
        {id: 11, icon: 'motorcycle', name: 'Motor cycles', parentCategories: [1]},
        {id: 12, icon: 'truck', name: 'Trucks', parentCategories: [1]},
        {id: 13, icon: 'flag-checkered', name: 'Race cars', parentCategories: [1]},
        {id: 14, icon: 'car', name: 'Old cars', parentCategories: [1]},
        {id: 15, icon: 'car', name: 'Buildings', parentCategories: [2]},
        {id: 16, icon: 'fighter-jet', name: 'Houses', parentCategories: [2]},
        {id: 17, icon: 'motorcycle', name: 'Street', parentCategories: [2]},
        {id: 18, icon: 'truck', name: 'Lighing', parentCategories: [2]},
        {id: 19, icon: 'flag-checkered', name: 'Doors', parentCategories: [2]},
        {id: 20, icon: 'car', name: 'Meals', parentCategories: [3]},
        {id: 21, icon: 'car', name: 'Meat', parentCategories: [3]},
        {id: 22, icon: 'fighter-jet', name: 'Vegetables', parentCategories: [3]},
        {id: 23, icon: 'motorcycle', name: 'Drinks', parentCategories: [3]},
        {id: 24, icon: 'truck', name: 'Snacks', parentCategories: [3]},
        {id: 25, icon: 'car', name: 'Forest', parentCategories: [8]},
        {id: 26, icon: 'car', name: 'Trees', parentCategories: [8]},
        {id: 27, icon: 'fighter-jet', name: 'Flowers', parentCategories: [8]},
        {id: 28, icon: 'motorcycle', name: 'Leafs', parentCategories: [8]},
        {id: 29, icon: 'truck', name: 'Grass', parentCategories: [8]},
        {id: 30, icon: 'car', name: 'Dogs', parentCategories: [7]},
        {id: 31, icon: 'car', name: 'Cats', parentCategories: [7]},
        {id: 32, icon: 'fighter-jet', name: 'Wild', parentCategories: [7]},
        {id: 33, icon: 'motorcycle', name: 'Birds', parentCategories: [7]},
        {id: 34, icon: 'truck', name: 'Insects', parentCategories: [7]},
        {id: 35, icon: 'car', name: 'Ball', parentCategories: [6]},
        {id: 36, icon: 'car', name: 'Court', parentCategories: [6]},
        {id: 37, icon: 'fighter-jet', name: 'Player', parentCategories: [6]},
        {id: 38, icon: 'motorcycle', name: 'Score board', parentCategories: [6]},
        
        
      ]
    },
    {
      name: 'Projects',
      icon: 'project-diagram',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Processes',
      icon: 'tasks',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Organizations',
      icon: 'address-card',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Settings',
      icon: 'cog',
      type: 'form-menu',
      float: 'right'
    },
    {
      name: 'Messages',
      icon: 'envelope',
      type: 'icon-menu',
      float: 'right',
      counter: true,
    },
    {
      name: 'Calender',
      icon: 'calendar-alt',
      type: 'icon-menu',
      float: 'right',
      counter: true,
    },
  ],
  adminMenu: [
    {
      name: currentUser && currentUser.userInfo ? currentUser.userInfo.first_name : 'User',
      icon: 'user',
      type: 'sub-menu',
      float: 'left',
      children: [
          {
            name: 'Switch work space',
            // children: [
            //     {
            //       name: 'Providers',
            //       children: userProviderRoles()
            //     },
            //     {
            //       name: 'Organizations',
            //       children: userOrgRoles()
            //     },
            // ]
          },
          {name: 'Log out'}
      ]
    },
    {
      name: 'Bridges',
      icon: 'info',
      type: 'sub-menu',
      float: 'left',
      
    },
    {
      name: 'Messages',
      icon: 'envelope',
      type: 'sub-menu',
      float: 'right',
      counter: true,
      children: [
        {name: 'Notifications', counter: true},
        {name: 'Requests', counter: true},
    ]
    },
    {
      name: 'Schedule',
      icon: 'calendar-alt',
      type: 'sub-menu',
      float: 'right',
      counter: true,
    },
    {
      name: 'Manage users & roles',
      icon: 'users',
      type: 'sub-menu',
      float: 'left',
      children: [
        {
          name: 'All users',
        },
        {
          name: 'Organizations users',
        },
        {
          name: 'Providers users',
        },
              
      ]
    },
    {
      name: 'Organizations',
      icon: 'address-card',
      type: 'sub-menu',
      float: 'left',
      children: [
        {
          name: 'Create new organization',
        },
              
      ]
    },
    {
      name: 'Providers',
      icon: 'address-card',
      type: 'sub-menu',
      float: 'left',
      children: [
        {
          name: 'Create new provider',
        },
              
      ]
    },
    {
      name: 'Manage projects',
      icon: 'project-diagram',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Manage processes',
      icon: 'tasks',
      type: 'sub-menu',
      float: 'left'
    },
    
    {
      name: 'Switch work space',
      icon: 'random',
      type: 'sub-menu',
      float: 'left'
    },
    {
      name: 'Settings',
      icon: 'cog',
      type: 'sub-menu',
      float: 'right'
    },
    {
      name: 'Sign out',
      icon: 'sign-out-alt',
      type: 'sub-menu',
      float: 'right'
    },
    
  ],
};
