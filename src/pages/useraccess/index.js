import moment from 'moment';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MDBox from 'components/MDBox';

import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import SearchBar from 'components/SearchBar';
import MDButton from 'components/Button';
import Breadcrumbs from 'components/Breadcrumbs';
import { PwTablePanel } from 'components';

import WarehouseActions, { WarehouseSelectors } from 'redux/WarehouseRedux';
import InventoryActions, { InventorySelectors } from 'redux/InventoryRedux';
import PermissionsActions, { PermissionsSelectors } from 'redux/PermissionsRedux';
import UsersActions, { UsersSelectors } from 'redux/UsersRedux';
import RolesActions, { RolesSelectors } from 'redux/RolesRedux';

import { API } from 'constant';

const useStyles = makeStyles((theme) => ({
  iconSize: {
    width: '1.5rem',
    height: '1.5rem',
    color: theme.palette.primary.light,
    marginRight: '8px'
  },
  statusActive: {
    color: 'green'
  },
  statusInactive: {
    color: 'red'
  },
  limitWidth: {
    maxWidth: '20rem'
  },
  margin: {
    marginBottom: '20px',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd'
  },
  wrap: {
    display: 'flex'
  },
  marginTable: {
    marginTop: '20px'
  },
  iconwrap: {
    display: 'flex',
    alignItems: 'center'
  },
  radialBorder: {
    overflow: 'hidden',
    borderRadius: '0.5rem'
  },
  rightPlaced: {
    position: 'absolute',
    right: 0
  },
  tabs: {
    borderRadius: 0,
    '& .MuiButtonBase-root.MuiTab-root': {
      padding: '12px 0px',
      borderRadius: '0px',
      fontWeight: 'bold',
      backgroundColor: '#eee',
      border: '1px solid #ddd'
    },
    '& .MuiButtonBase-root.MuiTab-root.Mui-selected': {
      backgroundColor: '#017AFF',
      color: 'white !important'
    }
  }
}));
// const permissionsHeadCells = [
//   { id: 'permission', label: 'Permission' },
//   { id: 'warehouse', label: 'Warehouse' },
//   { id: 'inventories', label: 'Inventories' },
//   { id: 'actions', label: 'Actions' },
//   { id: 'app_modules', label: 'App Modules' },
//   { id: 'status', label: 'Status' }
// ];

function UserAccessScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const usersData = useSelector(UsersSelectors.getUsersDetail);
  const rolesData = useSelector(RolesSelectors.getRolesDetail);
  const warehouses = useSelector(WarehouseSelectors.getWarehouseDetail);
  const inventories = useSelector(InventorySelectors.getInventoryDetail);
  const actions = useSelector(PermissionsSelectors.getActionsDetail);
  const permissions = useSelector(PermissionsSelectors.getPermissionsDetail);
  const [userRecords, setUserRecords] = useState([]);
  const [rolesRecords, setRoleRecords] = useState([]);
  const [userLoader, setUserLoader] = useState(false);
  const [roleLoader, setRoleLoader] = useState(false);
  const [originalUserRecords, setOriginalUserRecords] = useState([]);
  const [originalRolesRecords, setOriginalRoleRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (!warehouses || warehouses.length === 0) && dispatch(WarehouseActions.warehouseDataAction({loader: 'loading-request', slug: API.GET_WAREHOUSE_DATA,method: 'get'}));
    (!inventories || inventories.length === 0) && dispatch(InventoryActions.getInventoryAction({loader: 'loading-request', slug: API.GET_INVENTORY,method: 'get'}));
    (!rolesData || rolesData.length === 0) && dispatch(RolesActions.getRolesAction({loader: 'loading-request', slug: API.GET_ROLES_DATA, method: 'get'}));
    (!permissions || permissions.length === 0) && dispatch(PermissionsActions.getPermissionsAction({loader: 'loading-request', slug: API.GET_PERMISSIONS_DATA, method: 'get'}));
    (!actions || actions.length === 0) && dispatch(PermissionsActions.getActionsAction({loader: 'loading-request', slug: API.GET_ACTIONS_DATA, method: 'get'}));
  }, []);

  const userHeadCells = [
    { id: 'full_name', label: 'User Name', isEditAnchor: true, value: (record) => record.fullName },
    { id: 'phone_number', label: 'Phone Number', value: (record) => record.phoneNumber },
    { id: 'role_name', label: 'Roles', value: (record) => record.role_name },
    {
      id: 'updated_by_at',
      label: 'Last Updated By & Date',
      value: (record) =>
        `${record.updatedBy?.fullName ? record.updatedBy.fullName + ' | ' : ''}${moment(
          record.updatedAt
        ).format('D/M/YYYY h:m:s A')}`
    },
    {
      id: 'created_by_at',
      label: 'Created By & Date',
      value: (record) =>
        `${record.createdBy?.fullName ? record.createdBy.fullName + ' | ' : ''}${moment(
          record.createdAt
        ).format('D/M/YYYY h:m:s A')}`
    },
    { id: 'last_login', label: 'Last Login', value: (record) => record.lastLogin },
    {
      id: 'is_active',
      label: 'Access',
      value: (record) =>
        record.isActive ? (
          <span className={classes.statusActive}>Active</span>
        ) : (
          <span className={classes.statusInactive}>Inactive</span>
        )
    }
  ];

  const rolesHeadCells = [
    { id: 'role', label: 'Role', isEditAnchor: true, placement: 'after', value: record => record.name },
    { id: 'warehouse', label: 'Warehouse', limitWidth: true, value: record => {
      const roleWh = record.permissions?.warehouseScopes;
      return warehouses && roleWh && roleWh.length === warehouses.length ? 'All' : roleWh
        ? warehouses.filter(wh => roleWh.findIndex(whCurr => whCurr.id === wh._id) > -1).map(wh => wh.name).join(', ') : '';
    }
    },
    { id: 'inventory', label: 'Inventories', limitWidth: true, value: record => {
      const roleIn = record.permissions?.inventoryScopes;
      return inventories && roleIn && roleIn.length === inventories.length ? 'All' : roleIn
        ? inventories.filter(inv => roleIn.findIndex(inCurr => inCurr.id === inv._id) > -1).map(inv => inv.name).join(', ') : '';
    }
    },
    { id: 'actions', label: 'Actions', limitWidth: true, value: record => actions && record.permissions?.actions
      && record.permissions?.actions?.length === actions?.length ? 'All' : record.permissions?.actions
        ? record.permissions?.actions.join(', ') : ''},
    { id: 'visibilities', label: 'App Modules', limitWidth: true, value: record => permissions && record.permissions?.allowedUIModules
      && record.permissions?.allowedUIModules?.length === permissions?.length ? 'All' : record.permissions?.allowedUIModules
        ? record.permissions?.allowedUIModules.join(', ') : ''},
    { id: 'status', label: 'Status', value: record => record.status === 'ACTIVE' ? <span className={classes.statusActive}>Active</span>
      : <span className={classes.statusInactive}>Inactive</span> }
  ];

  const usersHandler = () => {
    setUserLoader(true);
    dispatch(
      UsersActions.getUsersAction({
        loader: 'loading-request',
        slug: API.GET_USERS_DATA,
        method: 'get',
        callback: setUserLoader
      })
    );
  };

  const rolesHandler = () => {
    setRoleLoader(true);
    dispatch(
      RolesActions.getRolesAction({
        loader: 'loading-request',
        slug: API.GET_ROLES_DATA,
        method: 'get',
        callback: setRoleLoader
      })
    );
  };

  useMemo(() => rolesHandler(), []);
  useMemo(() => usersHandler(), []);

  useEffect(() => {
    if (usersData.length) {
      let users = JSON.parse(JSON.stringify(usersData));
      users = users.map((item) => {
        item.role_name = item.roles.map((role) => role.name).join(',');
        return item;
      });
      setOriginalUserRecords(users);
      setUserRecords(users);
    }

    if (rolesData.length) {
      let roles = JSON.parse(JSON.stringify(rolesData));
      roles = roles.map((item) => {
        item.name = item.name.split('-').join(' ').toUpperCase();
        // item.permissions = item.permissions?.allowedUIModules?.join(',');
        if (!item.permissions) {
          item.permissions = 'NA';
        }
        item.status = item.status ? 'ACTIVE' : 'INACTIVE';
        return item;
      });
      setOriginalRoleRecords(roles);
      setRoleRecords(roles);
    }
  }, [rolesData, usersData]);

  const handleTabs = (e, val) => {
    setValue(val);
  };

  const handleSearch = (e, currentTab) => {
    const value = e.target.value;
    let records = currentTab === 0 ? originalUserRecords : originalRolesRecords;
    records = JSON.parse(JSON.stringify(records));
    records.forEach(record => record.status = record.status ? 'ACTIVE' : 'INACTIVE');
    let searchList = currentTab === 0 ? ['fullName', 'phoneNumber', 'role_name', 'status'] : ['name', 'permissions', 'status'];
    const setter = currentTab === 0 ? setUserRecords : setRoleRecords;
    searchList = searchList.concat(['createdBy.fullName', 'createdAt', 'updatedBy.fullName', 'updatedAt']);
    const filteredRecords = records.filter(record => searchList.some(field => {
      let recordInner = {...record};
      if (field.indexOf('.') > -1) {
        field = field.split('.');
        recordInner = recordInner[field[0]];
        field = field[1];
      }
      return recordInner && recordInner[field] !== undefined && typeof recordInner[field] === 'string'
        && recordInner[field].toLowerCase().indexOf(value?.toLowerCase()) > -1;
    }));
    records.forEach(record => record.status = record.status === 'ACTIVE');
    setter(filteredRecords);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        title="Access Details"
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'User Access' }
        ]}
      />
      <MDBox px={5} py={3}>
        <Grid container spacing={1} className={classes.margin + ' w-100 ms-0'}>
          <Grid item xs={12} sm={4} md={4} className="ps-0 pt-0">
            <Tabs value={value} className={`p-0 h-100 ${classes.tabs}`} onChange={handleTabs}>
              <Tab label="Users" onClick={() => usersHandler()} />
              <Tab label="Roles" onClick={() => rolesHandler()} />
            </Tabs>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            className="py-2"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
          >
            <SearchBar onChange={e => handleSearch(e, value)} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={2}
            className="py-2"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
          >
            <MDButton
              color="primary"
              size="medium"
              onClick={() =>
                navigate(`/setup/users-access/${value === 0 ? 'create-user' : 'create-role'}`)
              }
            >
              {value === 0 ? '+ CREATE USER' : '+ CREATE ROLE'}
            </MDButton>
          </Grid>
        </Grid>
        <Grid>
          <PwTablePanel classes={classes} headCells={userHeadCells} id="user-list" index={0} loader={userLoader}
            records={userRecords} navUrl='/setup/users-access/edit-user' table="user" value={value} />
          <PwTablePanel classes={classes} headCells={rolesHeadCells} id="role-list" index={1} loader={roleLoader}
            records={rolesRecords} navUrl='/setup/users-access/edit-role' table="role" value={value} />
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default UserAccessScreen;
