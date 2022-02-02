import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import BasicTable from 'components/BasicTable';
import { Grid } from '@mui/material';
import SearchBar from 'components/SearchBar';
import MDButton from 'components/Button';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Tabs, Tab } from '@mui/material';
import TabPanel from 'components/Tabs';

const useStyles = makeStyles({
  iconSize: {
    width: '50%',
    height: '50%',
    marginBottom: '10px'
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
  tabs: {
    '& .MuiButtonBase-root.MuiTab-root': {
      padding: '12px 0px',
      borderRadius: '0px'
    },
    '& .Mui-selected': {
      textDecoration: 'underline',
      backgroundColor: '#017AFF'
    }
  }
});

function UserAccessScreen() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleTabs = (e, val) => {
    setValue(val);
  };

  const header = [
    {
      name: '',
      prop: 'icon'
    },
    {
      name: 'User Name',
      prop: 'username'
    },
    {
      name: 'Phone Number',
      prop: 'phonenumber'
    },
    {
      name: 'Roles',
      prop: 'roles'
    },
    {
      name: 'Last Updated by & Date',
      prop: 'lastupdated'
    },
    {
      name: 'Created by & Date',
      prop: 'Createdby'
    },
    {
      name: 'Last Login',
      prop: 'lastlogin'
    },
    {
      name: 'Access',
      prop: 'access'
    }
  ];
  const data = [
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    },
    {
      icon: <EditIcon />,
      username: 'Floyd Miles',
      phonenumber: '(704)555-0127',
      roles: 'Administrator',
      lastupdated: 'System| 1/1/2022 11:23:00 AM',
      Createdby: 'System| 1/1/2022 11:23:00 AM',
      lastlogin: 'System| 1/1/2022 11:23:00 AM',
      access: 'Active'
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} py={3}>
        <Grid container spacing={2} className={classes.margin}>
          <Grid item xs={12} sm={4} md={4}>
            <Tabs value={value} className={classes.tabs} onChange={handleTabs}>
              <Tab label="Roles" />
              <Tab label="Users" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <div className={classes.marginTable}>
                <BasicTable data={data} header={header} backgroundColor="#017AFF" />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item2 Detail
            </TabPanel>
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
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default UserAccessScreen;
