import Icon from '@mui/material/Icon';
import InventoryScreen from 'pages/inventory';
import WarehouseScreen from 'pages/warehouse';
import HomepageScreen from 'pages/homepage';
import DashboardScreen from 'pages/dashboard';
import LoginScreen from 'pages/authentication';
import LocationLabelingScreen from 'pages/labeling';
import UserAccessScreen from 'pages/useraccess';

import SetupHome from 'pages/setup';
import NewWarehouseDetails from 'pages/newWarehouseDetails';
import EditWarehouseDetails from 'pages/editWarehouseDetails';
import LabelingHome from 'pages/labellingHome';
import SetupInventory from 'pages/setupInventory';
import CreateEditUserRole from 'pages/createEditUserRole';
import CreateEditUser from 'pages/createEditUser';
import WidgetLabel from 'pages/widgetLabel';
import ItemListing from 'pages/itemListing';
import HomeIcon from 'assets/images/HomeIcon';
import SetupIcon from 'assets/images/SetupIcon';
import AddNewItem from '../pages/addNewProduct';

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
    name: 'Home',
    key: 'home',
    icon: <HomeIcon width={24} height={24} color="white" />,
    route: '/home',
    type: 'single',
    component: <HomepageScreen />
  },
  {
    type: 'collapse',
    name: 'Test',
    key: 'Test',
    hide: true,
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: 'Dashboard',
        key: 'dashboard',
        route: '/dashboard',
        hide: true,
        component: <DashboardScreen />
      }
    ]
  },
  {
    type: 'collapse',
    name: 'Configuration',
    key: 'Configuration',
    icon: <SetupIcon width={24} height={24} color="white" />,
    collapse: [
      {
        name: 'Setup',
        key: 'setup',
        route: '/setup',
        component: <SetupHome />
      },
      {
        name: 'Inventory',
        key: 'inventory',
        route: '/setup/inventory',
        component: <SetupInventory />
      },
      {
        name: 'Warehouse',
        key: 'warehouse',
        route: '/setup/warehouse',
        component: <WarehouseScreen />
      },
      {
        name: 'Inventory Definition',
        key: 'inventory-new',
        hide: true,
        route: '/setup/inventory/new',
        component: <InventoryScreen />
      },
      {
        name: 'Inventory Definition',
        key: 'inventory-update',
        hide: true,
        route: '/setup/inventory/update/:inventoryId',
        component: <InventoryScreen />
      },
      {
        name: 'Add New Item',
        key: 'add-new-item',
        hide: true,
        route: '/setup/inventory/new-item/:inventoryName/:widgetName/:inventoryId',
        component: <AddNewItem />
      },
      {
        name: 'Update Item',
        key: 'udpate-item',
        hide: true,
        route: '/setup/inventory/browse/:inventoryName/:widgetName/:inventoryId/edit/:itemId',
        component: <AddNewItem />
      },
      {
        name: 'View Items',
        key: 'view-items',
        hide: true,
        route: '/setup/inventory/browse/:inventoryName/:widgetName/:inventoryId',
        component: <ItemListing />
      },
      {
        name: 'Location Labeling',
        key: 'location-labeling',
        hide: true,
        route: '/setup/labeling/location-labeling',
        component: <LocationLabelingScreen />
      },
      {
        name: 'Users & Access',
        key: 'users-access',
        route: '/setup/users-access',
        component: <UserAccessScreen />
      },
      {
        name: 'Labeling',
        key: 'labeling',
        route: '/setup/labeling',
        component: <LabelingHome />
      },
      {
        name: 'Add Warehouse',
        key: 'add-warehouse',
        hide: true,
        route: '/setup/warehouse/add-warehouse',
        component: <NewWarehouseDetails />
      },
      {
        name: 'Edit Warehouse',
        key: 'edit-warehouse',
        route: '/setup/warehouse/edit-warehouse/:warehouseId',
        hide: true,
        component: <EditWarehouseDetails />
      },
      {
        name: 'Widget Label',
        key: 'widget-label',
        route: '/setup/labeling/widget-label',
        hide: true,
        component: <WidgetLabel />
      },
      {
        name: 'Create Role',
        key: 'create-role',
        route: '/setup/users-access/create-role',
        hide: true,
        component: <CreateEditUserRole />
      },
      {
        name: 'Create User',
        key: 'create-user',
        route: '/setup/users-access/create-user',
        hide: true,
        component: <CreateEditUser context="new" />
      },
      {
        name: 'Edit User',
        key: 'edit-user',
        route: '/setup/users-access/edit-user',
        hide: true,
        component: <CreateEditUser context='edit' />
      },
      {
        name: 'Edit Role',
        key: 'edit-role',
        route: '/setup/users-access/edit-role',
        hide: true,
        component: <CreateEditUserRole context='edit' />
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
