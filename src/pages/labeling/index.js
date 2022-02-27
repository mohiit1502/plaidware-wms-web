import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import Dropdown from 'components/Dropdown';
import { Grid, TableBody, TableCell, TableRow } from '@mui/material';
import BasicTable from 'components/BasicTable';
import MDButton from 'components/Button';
import Breadcrumbs from 'components/Breadcrumbs';

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

const records = [
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

const headCells = [
  {
    id: 'warehouse',
    label: 'warehouse'
  },
  {
    id: 'zone',
    label: 'Zone'
  },
  {
    id: 'area',
    label: 'Area'
  },
  {
    id: 'row',
    label: 'Row'
  },
  {
    id: 'Label',
    label: 'label'
  },
  {
    id: 'Bay',
    label: 'bay'
  }
];

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Labeling', path: '/setup/labeling' },
          { name: 'Location Label' }
        ]}
      />
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
          headCells={headCells}
          records={records}
          backgroundColor="#F4F4F4"
          color="#8D8D8D"
        >
          <TableBody>
            {records &&
              records.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.warehouse}</TableCell>
                  <TableCell>{item.zone}</TableCell>
                  <TableCell>{item.area}</TableCell>
                  <TableCell>{item.row}</TableCell>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.Bay}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </BasicTable>
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
    </DashboardLayout>
  );
}
export default LabelingScreen;
