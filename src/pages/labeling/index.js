import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import Dropdown from 'components/Dropdown';
import { Grid } from '@mui/material';
import BasicTable from 'components/BasicTable';
import MDButton from 'components/Button';

const useStyles = makeStyles({
  iconSize: {
    width: '50%',
    height: '50%',
    marginBottom: '10px'
  },
  margin: {
    margin: '20px'
  },
  buttondiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px'
  }
});

function LabelingScreen() {
  const classes = useStyles();

  const dropdownData = [
    {
      ID: '1',
      displayname: 'Regular, full time'
    },
    {
      ID: '2',
      displayname: 'Regular, part time'
    },
    {
      ID: '3',
      displayname: 'Contractor- Arise Max'
    }
  ];
  const data = [
    {
      placeholder: 'Lorem Ipsum',
      label: 'Select Warehouse'
    },
    {
      placeholder: 'Lorem Ipsum',
      label: 'Select Zone'
    },
    {
      placeholder: 'Lorem Ipsum',
      label: 'Select Area'
    },
    {
      placeholder: 'Warehouse 1',
      label: 'Select Row'
    }
  ];
  const data2 = [
    {
      placeholder: 'Z01-A02-R001-B001',
      label: 'Bay TOTEM Labels'
    },
    {
      placeholder: 'Z01-A02-R001-B001',
      label: 'BIN Location Labels'
    }
  ];

  const tableData = [
    {
      warehouse: 'Ipsum',
      zone: 'Vivera',
      area: 'Nisi',
      row: 'Nulla',
      label: 'Mauris',
      bay: ''
    },
    {
      warehouse: 'Ipsum',
      zone: 'Vivera',
      area: 'Nisi',
      row: 'Nulla',
      label: 'Mauris',
      bay: ''
    },
    {
      warehouse: 'Ipsum',
      zone: 'Vivera',
      area: 'Nisi',
      row: 'Nulla',
      label: 'Mauris',
      bay: ''
    }
  ];

  const header = [
    {
      name: 'Warehouse',
      prop: 'warehouse'
    },
    {
      name: 'Zone',
      prop: 'zone'
    },
    {
      name: 'Area',
      prop: 'area'
    },
    {
      name: 'Row',
      prop: 'row'
    },
    {
      name: 'Label',
      prop: 'label'
    },
    {
      name: 'Bay',
      prop: 'bay'
    }
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={5} py={5}>
        <Grid container spacing={2}>
          {data &&
            data.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Dropdown items={item} dropdownData={dropdownData} />
              </Grid>
            ))}
        </Grid>
        <br />
        <BasicTable
          className={classes.margin}
          data={tableData}
          header={header}
          backgroundColor="gray"
        />
        <Grid container spacing={2}>
          {data2 &&
            data2.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Dropdown items={item} dropdownData={dropdownData} />
              </Grid>
            ))}
        </Grid>
        <div className={classes.buttondiv}>
          <MDButton color="primary">{'Print Labels'}</MDButton>
        </div>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default LabelingScreen;
