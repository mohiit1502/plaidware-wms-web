import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { Grid, InputLabel, TableBody, TableCell, TableRow } from '@mui/material';
import MDInput from 'components/MDInput';
import ImageUpload from 'components/ImageUpload';
import Switch from 'components/Switch';
import MDTypography from 'components/MDTypography';
import { makeStyles } from '@mui/styles';
import MDBox from 'components/MDBox';
import Dropdown from 'components/Dropdown';
import MDButton from 'components/Button';
import BasicTable from 'components/BasicTable';

const useStyles = makeStyles({
  textWrap: {
    whiteSpace: 'nowrap',
    fontSize: '16px',
    fontWeight: '800'
  },
  gridWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSize: {
    fontSize: '16px',
    color: 'gray',
    textAlign: 'justify'
  },
  btnWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  marginTop: {
    marginTop: '54px'
  }
});

const stockBox = [
  {
    text: 'Stock Tracking'
  },
  {
    text: 'Replenishment'
  },
  {
    text: 'Alerting'
  },
  {
    text: 'Check In/Out'
  },
  {
    text: 'Maintenance'
  },
  {
    text: 'Location'
  }
];

const records = [
  {
    level1: 'Ipsum',
    level2: 'Vivera'
  },
  {
    level1: 'Ipsum',
    level2: 'Vivera'
  }
];

const headCells = [
  {
    id: 'level1',
    label: 'Level 1'
  },
  {
    id: 'level2',
    label: 'Level 2'
  }
];

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

const dataInventory = [
  {
    placeholder: 'Lorem Ipsum',
    label: 'Inventory Type'
  }
];
const dataLevel = [
  {
    placeholder: 'Lorem Ipsum',
    label: 'Level 1'
  },
  {
    placeholder: 'Lorem Ipsum',
    label: 'Level 2'
  }
];

function InventoryScreen() {
  const previewImg = [1, 2, 3];
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={5} py={5}>
        <MDBox
          px={5}
          py={5}
          sx={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <InputLabel sx={{ pb: 2 }} id="demo-simple-select-label">
                    Inventory Name
                  </InputLabel>
                  <MDInput sx={{ width: '100%' }} />
                </Grid>
                {dataInventory &&
                  dataInventory.map((item, index) => (
                    <Grid item xs={12} sm={12} md={12} key={index}>
                      <Dropdown items={item} dropdownData={dropdownData} />
                    </Grid>
                  ))}
                <Grid item xs={12} sm={12} md={12}>
                  <InputLabel sx={{ pb: 2 }} id="demo-simple-select-label">
                    Widget Name
                  </InputLabel>
                  <MDInput sx={{ width: '100%' }} />
                </Grid>
              </Grid>
              <MDBox sx={{ my: 4 }}>
                <MDTypography variant="h5">Policies</MDTypography>
                <MDTypography className={classes.textSize}>
                  Egestas pulvinar ornare vulputate porttitor consectetur condimentum at tellus
                  quis. Leo pellentesque ipsum, a purus dignissim aliquam, orci. Elementum
                  ullamcorper a sit eleifend ante ullamcorper ornare mi pharetra.
                </MDTypography>
              </MDBox>
              <MDBox
                mr={{ xs: 0, xl: 8 }}
                sx={{
                  width: '40%',
                  padding: '12.5px 10px',
                  backgroundColor: '#fff',
                  border: 'solid 0.5px #c4c4c4',
                  borderRadius: '4px',
                  my: 5
                }}
              >
                <div className={classes.wrap}>
                  {stockBox.map((item) => (
                    <>
                      <div className={classes.gridWrap}>
                        <MDTypography className={classes.textWrap}>{item.text}</MDTypography>
                        <Switch />
                      </div>
                    </>
                  ))}
                </div>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <ImageUpload heading="Upload Inventory Images" previewImg={previewImg} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={1}>
                {dataLevel &&
                  dataLevel.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Dropdown items={item} dropdownData={dropdownData} />
                    </Grid>
                  ))}
                <Grid item xs={12} sm={6} md={4}>
                  <MDButton color="primary" circular="true" className={classes.marginTop}>
                    {'add hierarchy level'}
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <MDBox
                sx={{
                  // backgroundColor: '#E5E5E5',
                  width: '100%',
                  padding: '9px'
                }}
              >
                <MDTypography
                  sx={{
                    backgroundColor: '#E5E5E5',
                    width: '100%',
                    padding: '9px'
                  }}
                >
                  Widget hierarchy
                </MDTypography>
                <BasicTable
                  headCells={headCells}
                  records={records}
                  backgroundColor="#E5E5E5"
                  color="#343434"
                >
                  <TableBody>
                    {records &&
                      records.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.level1}</TableCell>
                          <TableCell>{item.level2}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </BasicTable>
              </MDBox>
            </Grid>
            <MDBox sx={{ ml: 'auto', mr: 'auto', mt: 3 }}>
              <MDButton sx={{ ml: 3 }} color="error" variant="outlined">
                {'CANCEL'}
              </MDButton>
              <MDButton sx={{ ml: 3 }} color="primary" variant="outlined">
                {'SAVE'}
              </MDButton>
              <MDButton sx={{ ml: 3 }} color="primary">
                {'ADD ITEMS'}
              </MDButton>
            </MDBox>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}
export default InventoryScreen;
