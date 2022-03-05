import moment from 'moment';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid, TableBody, TableCell, TableRow, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MDBox from 'components/MDBox';
import EditIcon from '@mui/icons-material/Edit';

import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import BasicTable from 'components/BasicTable';
import SearchBar from 'components/SearchBar';
import MDButton from 'components/Button';
import TabPanel from 'components/Tabs';
import Breadcrumbs from 'components/Breadcrumbs';

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
  const [value, setValue] = useState(1);
  const usersData = useSelector(UsersSelectors.getUsersDetail);
  const rolesData = useSelector(RolesSelectors.getRolesDetail);
  const warehouses = useSelector(WarehouseSelectors.getWarehouseDetail);
  const inventories = useSelector(InventorySelectors.getInventoryDetail);
  const actions = useSelector(PermissionsSelectors.getActionsDetail);
  const permissions = useSelector(PermissionsSelectors.getPermissionsDetail);
  const [userRecords, setUserRecords] = useState([]);
  const [rolesRecords, setRoleRecords] = useState([]);
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
    { id: 'warehouse', label: 'Warehouse', limitWidth: true, value: record => warehouses && record.permissions?.warehouseScopes && record.permissions?.warehouseScopes?.length === warehouses?.length ? 'All' : record.permissions?.warehouseScopes ? record.permissions?.warehouseScopes.map(sc => sc.name).join(', ') : ''},
    { id: 'inventory', label: 'Inventories', limitWidth: true, value: record => inventories && record.permissions?.inventoryScopes && record.permissions?.inventoryScopes?.length === inventories?.length ? 'All' : record.permissions?.inventoryScopes ? record.permissions?.inventoryScopes.map(sc => sc.name).join(', ') : ''},
    { id: 'actions', label: 'Actions', limitWidth: true, value: record => actions && record.permissions?.actions && record.permissions?.actions?.length === actions?.length ? 'All' : record.permissions?.actions ? record.permissions?.actions.join(', ') : ''},
    { id: 'visibilities', label: 'App Modules', limitWidth: true, value: record => permissions && record.permissions?.allowedUIModules && record.permissions?.allowedUIModules?.length === permissions?.length ? 'All' : record.permissions?.allowedUIModules ? record.permissions?.allowedUIModules.join(', ') : ''},
    { id: 'status', label: 'Status', value: record => record.status === 'ACTIVE' ? <span className={classes.statusActive}>Active</span>
      : <span className={classes.statusInactive}>Inactive</span> }
  ];

  const usersHandler = () => {
    dispatch(
      UsersActions.getUsersAction({
        loader: 'loading-request',
        slug: API.GET_USERS_DATA,
        method: 'get'
      })
    );
  };

  const rolesHandler = () => {
    dispatch(
      RolesActions.getRolesAction({
        loader: 'loading-request',
        slug: API.GET_ROLES_DATA,
        method: 'get'
      })
    );
  };

  useMemo(() => rolesHandler(), []);

  useEffect(() => {
    if (usersData.length) {
      let users = JSON.parse(JSON.stringify(usersData));
      users = users.map((item) => {
        item.role_name = item.roles.map((role) => role.name).join(',');
        return item;
      });
      setUserRecords(users);
    }

    if (rolesData.length) {
      let roles = JSON.parse(JSON.stringify(rolesData));
      roles = roles.map((item) => {
        item.name = item.name.split('-').join(' ').toUpperCase();
        item.permissions = item.permissions?.allowedUIModules?.join(',');
        if (!item.permissions) {
          item.permissions = 'NA';
        }
        item.status = item.status ? 'ACTIVE' : 'INACTIVE';
        return item;
      });
      setRoleRecords(roles);
    }
  }, [rolesData, usersData]);

  const handleTabs = (e, val) => {
    setValue(val);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  }));

  const rowRenders = ({records, headers, navUrl, table}) => {
    return records && records.map((record, keyouter) => {
      return <StyledTableRow key={record.id + '-' + keyouter}>
        {headers.map((columnConfig, key) => {
          const canEdit = columnConfig.isEditAnchor;
          const isAfter = columnConfig.placement && columnConfig.placement === 'after';
          const limitWidth = columnConfig.limitWidth;
          return <TableCell key={key} className={`${isAfter ? 'position-relative pe-5' : ''}${limitWidth ? ' overflow-auto ' + classes.limitWidth : ''}`}
            onClick={() => canEdit && navigate(navUrl, {state: {[table]: record}})}>
            {canEdit
              ? isAfter
                ? <span className={classes.iconwrap}>
                  <EditIcon className={classes.iconSize + ' ' + classes.rightPlaced}/>
                  {columnConfig.value(record)}
                </span>
                : <span className={classes.iconwrap}>
                  {columnConfig.value(record)}
                  <EditIcon className={classes.iconSize}/>
                </span>
              : <span>{columnConfig.value(record)}</span>}
          </TableCell>;
        }
        )}
      </StyledTableRow>;
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        title="Access Details"
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Users Access' }
        ]}
      />
      <MDBox px={5} py={3}>
        <Grid container spacing={1} className={classes.margin}>
          <Grid item xs={12} sm={4} md={4} className="ps-2 pt-0">
            <Tabs value={value} className={`p-0 h-100 ${classes.tabs}`} onChange={handleTabs}>
              <Tab label="Roles" onClick={() => rolesHandler()} />
              <Tab label="Users" onClick={() => usersHandler()} />
            </Tabs>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            className="py-2"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <SearchBar />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={2}
            className="py-2"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <MDButton
              color="primary"
              size="medium"
              onClick={() =>
                navigate(`/setup/users-access/${value === 0 ? 'create-role' : 'create-user'}`)
              }
            >
              {value === 0 ? '+ CREATE ROLE' : '+ CREATE USER'}
            </MDButton>
          </Grid>
        </Grid>
        <Grid>
          <TabPanel value={value} index={0} className={classes.radialBorder}>
            <BasicTable
              headCells={rolesHeadCells}
              records={rolesRecords}
              backgroundColor="#007AFF"
              color="#fff"
            >
              {rolesRecords && rolesRecords.length > 0
                ? <TableBody>
                  {rowRenders({records: rolesRecords, headers: rolesHeadCells, navUrl: '/setup/users-access/edit-role', table: 'role'})}
                </TableBody> : <p>No Records to Display</p>}
            </BasicTable>
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.radialBorder}>
            <BasicTable
              id="user-list"
              headCells={userHeadCells}
              records={userRecords}
              backgroundColor="#007AFF"
              color="#fff"
            >
              {userRecords && userRecords.length > 0
                ? <TableBody>
                  {rowRenders({records: userRecords, headers: userHeadCells, navUrl: '/setup/users-access/edit-user', table: 'user'})}
                </TableBody> : <p>No Records to Display</p>}
            </BasicTable>
          </TabPanel>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default UserAccessScreen;
