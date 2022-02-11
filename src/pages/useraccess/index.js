import React, { useEffect } from 'react';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
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
import UsersActions from 'redux/UsersRedux';
import { API } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import { UsersSelectors } from 'redux/UsersRedux';

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
const headCells = [
  { id: 'fullName', label: 'Name' },
  { id: 'role_name', label: 'Roles' }
];

function UserAccessScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const usersData = useSelector(UsersSelectors.getUsersDetail);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (usersData.length) {
      let users = JSON.parse(JSON.stringify(usersData));
      users = users.map((item) => {
        item.role_name = item.roles.map((role) => role.name).join(',');
        return item;
      });
      setRecords(users);
    }
  }, [usersData]);

  const handleTabs = (e, val) => {
    setValue(val);
  };

  const usersHandler = () => {
    dispatch(
      UsersActions.getUsersAction({
        loader: 'loading-request',
        slug: API.GET_USERS_DATA,
        method: 'get'
      })
    );
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
              <Tab label="Roles" />
              <Tab label="Users" onClick={() => usersHandler()} />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <SearchBar />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <MDButton color="primary" size="medium">
              {'+ CREATE USER'}
            </MDButton>
          </Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          <div className={classes.marginTable}>Item2 Detail</div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BasicTable
            headCells={headCells}
            records={records}
            backgroundColor="#007AFF"
            color="#fff"
          >
            <TableBody>
              {records &&
                records.map((item) => (
                  <StyledTableRow key={item.id}>
                    <TableCell>
                      <div className={classes.iconwrap}>
                        <EditIcon className={classes.iconSize} />
                        {item.fullName}
                      </div>
                    </TableCell>
                    <TableCell>{item.role_name}</TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </BasicTable>
        </TabPanel>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default UserAccessScreen;
