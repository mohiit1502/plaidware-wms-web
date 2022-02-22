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
import { API } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  iconSize: {
    width: '2%',
    height: '2%',
    marginBottom: '10px',
    color: theme.palette.primary.light,
    marginRight: '8px'
  },
  margin: {
    marginBottom: '20px'
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
  tabs: {
    '& .MuiButtonBase-root.MuiTab-root': {
      padding: '12px 0px',
      borderRadius: '0px'
    },
    '& .Mui-selected': {
      backgroundColor: '#017AFF',
      color: 'white'
    }
  }
}));
const userHeadCells = [
  { id: 'fullName', label: 'Name' },
  { id: 'role_name', label: 'Roles' },
  { id: 'updated_at', label: 'Updated at' },
  { id: 'created_at', label: 'Created by and at' }
];

const rolesHeadCells = [
  { id: 'role', label: 'Role' },
  { id: 'permissions', label: 'Permissions' },
  { id: 'status', label: 'Status' }
];

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
  const [userRecords, setUserRecords] = useState([]);
  const [rolesRecords, setRoleRecords] = useState([]);
  const navigate = useNavigate();

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
        item.permissions = item.permissions.map((permission) => permission.name).join(',');
        if (!item.permissions) {
          item.permissions = 'NA';
        }
        item.status = 'INACTIVE';
        if (item.status) {
          item.status = 'ACTIVE';
        }
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} py={3}>
        <Grid container spacing={2} className={classes.margin}>
          <Grid item xs={12} sm={4} md={4}>
            <Tabs value={value} className={classes.tabs} onChange={handleTabs}>
              <Tab label="Roles" onClick={() => rolesHandler()} />
              <Tab label="Users" onClick={() => usersHandler()} />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <SearchBar />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <MDButton
              color="primary"
              size="medium"
              onClick={() => navigate('/setup/users-access/create-role')}
            >
              {'+ CREATE USER'}
            </MDButton>
          </Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          <BasicTable
            headCells={rolesHeadCells}
            records={rolesRecords}
            backgroundColor="#007AFF"
            color="#fff"
          >
            <TableBody>
              {rolesRecords &&
                rolesRecords.map((item) => (
                  <StyledTableRow key={item.id}>
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
        <TabPanel value={value} index={1}>
          <BasicTable
            headCells={userHeadCells}
            records={userRecords}
            backgroundColor="#007AFF"
            color="#fff"
          >
            <TableBody>
              {userRecords &&
                userRecords.map((item) => (
                  <StyledTableRow key={item.id}>
                    <TableCell>
                      <div className={classes.iconwrap}>
                        <EditIcon className={classes.iconSize} />
                        {item.fullName}
                      </div>
                    </TableCell>
                    <TableCell>{item.role_name}</TableCell>
                    <TableCell>{moment(item.updatedAt).format('D/M/YYYY h:m:s A')}</TableCell>
                    <TableCell>
                      {item.createdBy ? item.createdBy?.fullName + ' | ' : null}
                      {moment(item.createdAt).format('D/M/YYYY h:m:s A')}
                    </TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </BasicTable>
        </TabPanel>
      </MDBox>
    </DashboardLayout>
  );
}
export default UserAccessScreen;
