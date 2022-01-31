/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import DashboardScreen from 'pages/dashboard';
import LoginScreen from 'pages/authentication';

// Material Dashboard 2 PRO React components
// import MDAvatar from 'components/MDAvatar';

// @mui icons
import Icon from '@mui/material/Icon';
import WarehouseScreen from 'pages/warehouse';
import NewWarehouseDetails from 'pages/newWarehouseDetails';
import SetupHome from 'pages/setup';
import LabelingScreen from 'pages/labeling';

// Images
// import profilePicture from 'assets/images/team-3.jpg';

const routes = [
  {
    name: 'Login',
    key: 'login',
    route: '/login',
    component: <LoginScreen />
  }
];

const protectedRoutes = [
  // {
  //   type: 'collapse',
  //   name: 'Brooklyn Alice',
  //   key: 'brooklyn-alice',
  //   icon: <MDAvatar src={profilePicture} alt="Brooklyn Alice" size="sm" />,
  //   collapse: [
  //     {
  //       name: 'Logout',
  //       key: 'logout',
  //       route: '/authentication/sign-in/basic',
  //       component: <LoginScreen />
  //     }
  //   ]
  // },
  // { type: 'divider', key: 'divider-0' },
  {
    type: 'collapse',
    name: 'Home',
    key: 'Home',
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: 'Dashboard',
        key: 'dashboard',
        route: '/dashboard',
        component: <DashboardScreen />
      }
    ]
  },
  {
    type: 'collapse',
    name: 'Setup',
    key: 'Setup',
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: 'Setup Home',
        key: 'warehouse-setup',
        route: '/warehouse-setup',
        component: <SetupHome />
      },
      {
        name: 'Warehouse Design',
        key: 'warehouse',
        route: '/warehouse',
        component: <WarehouseScreen />
      },
      {
        name: 'New/Edit Warehouse Details',
        key: 'warehouse-form',
        route: '/warehouse-design-form',
        component: <NewWarehouseDetails />
      },
      {
        name: 'Labeling',
        key: 'labeling',
        route: '/labeling',
        component: <LabelingScreen />
      }
    ]
  }
  // { type: 'title', title: 'Pages', key: 'title-pages' },
  // {
  //   type: 'collapse',
  //   name: 'Change Log',
  //   key: 'changelog',
  //   href: 'https://github.com/creativetimofficial/ct-material-dashboard/-pro-material-ui/blob/main/CHANGELOG.md',
  //   icon: <Icon fontSize="medium">receipt_long</Icon>,
  //   noCollapse: true,
  //   layout: '/app'
  // }
];

export { routes, protectedRoutes };
