import React, { useEffect, useMemo } from 'react';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import BasicTable from 'components/BasicTable';
import { Grid, TableBody, TableCell, TableRow } from '@mui/material';
import SearchBar from 'components/SearchBar';
import EditIcon from '@mui/icons-material/Edit';
import MDButton from 'components/Button';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import TabPanel from 'components/Tabs';
import UsersActions, { UsersSelectors } from 'redux/UsersRedux';
import RolesActions, { RolesSelectors } from 'redux/RolesRedux';
import { AuthSelectors } from 'redux/AuthRedux';
import { API } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';

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
  const currentUser = useSelector(AuthSelectors.getUser);
  const [userRecords, setUserRecords] = useState([]);
  const [rolesRecords, setRoleRecords] = useState([]);
  const navigate = useNavigate();

  const userHeadCells = [
    { id: 'full_name', label: 'User Name', isEditAnchor: true, value: record => record.fullName },
    { id: 'phone_number', label: 'Phone Number', value: record => record.phoneNumber },
    { id: 'role_name', label: 'Roles', value: record => record.role_name },
    { id: 'updated_by_at', label: 'Last Updated By & Date', value: record => `${record.updatedBy?.fullName ? record.updatedBy.fullName + ' | ': ''}${moment(record.updatedAt).format('D/M/YYYY h:m:s A')}` },
    { id: 'created_by_at', label: 'Created By & Date', value: record => `${record.createdBy?.fullName ? record.createdBy.fullName + ' | ': ''}${moment(record.createdAt).format('D/M/YYYY h:m:s A')}` },
    { id: 'last_login', label: 'Last Login', value: record => record.lastLogin },
    {
      id: 'is_active', label: 'Access', value: record => record.isActive ? <span className={classes.statusActive}>Active</span>
        : <span className={classes.statusInactive}>Inactive</span>
    }
  ];

  const rolesHeadCells = [
    { id: 'role', label: 'Role' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'status', label: 'Status' }
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

  const rowRenders = userRecords && userRecords.map((record, keyouter) => {
    const canEdit = columnConfig => columnConfig.isEditAnchor && currentUser.email !== record.email;
    return <StyledTableRow key={record.id + '-' + keyouter}>
      {userHeadCells.map((columnConfig, key) => <TableCell key={key} onClick={() => canEdit(columnConfig) && navigate('/setup/users-access/edit-user', {state: {user: record}})}>
        {canEdit(columnConfig) ? <span className={classes.iconwrap}>
          <EditIcon className={classes.iconSize}/>
          {columnConfig.value(record)}
        </span> : <span>{columnConfig.value(record)}</span>}
      </TableCell>)}
    </StyledTableRow>;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Users and Access', path: '/setup/users-access' }
        ]}
      />
      <MDBox px={0} py={3}>
        <Grid container spacing={1} className={classes.margin}>
          <Grid item xs={12} sm={4} md={4} className='ps-2 pt-0'>
            <Tabs value={value} className={`p-0 h-100 ${classes.tabs}`} onChange={handleTabs}>
              <Tab label="Roles" onClick={() => rolesHandler()} />
              <Tab label="Users" onClick={() => usersHandler()} />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={4} md={6} className='py-2' style={{ display: 'flex', alignItems: 'center' }}>
            <SearchBar />
          </Grid>
          <Grid item xs={12} sm={4} md={2} className='py-2' style={{ display: 'flex', alignItems: 'center' }}>
            <MDButton
              color="primary"
              size="medium"
              onClick={() => navigate(`/setup/users-access/${value === 0 ? 'create-role' : 'create-user'}`)}
            >
              {value === 0 ? '+ CREATE ROLE' : '+ CREATE USER'}
            </MDButton>
          </Grid>
        </Grid>
        <Grid px={2}>
          <TabPanel value={value} index={0} className={classes.radialBorder}>
            <BasicTable
              headCells={rolesHeadCells}
              records={rolesRecords}
              backgroundColor="#007AFF"
              color="#fff"
            >
              <TableBody>
                {rolesRecords &&
                  rolesRecords.map((item, key) => (
                    <StyledTableRow key={item.id + '-' + key}>
                      <TableCell>
                        <div className={classes.iconwrap}>
                          <EditIcon className={classes.iconSize} />
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell>{item.permissions}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
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
                  {rowRenders}
                </TableBody> : 'No Records to Display'}
            </BasicTable>
          </TabPanel>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default UserAccessScreen;
