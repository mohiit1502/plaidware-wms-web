import React from 'react';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';
import MDButton from 'components/Button';
import TransferList from 'components/MDTransferList';
import DateTimeInput from 'components/DateTimePicker';
import Switch from 'components/Switch';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import Typography from '@mui/material/Typography';
import UserIcon from 'assets/images/userIcon.png';
import EditIcon from 'assets/images/edit-icon.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const useStyles = makeStyles(() => ({
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px'
  },
  boxWrap: {
    backgroundColor: '#fff',
    border: '1px solid #c2c2c2',
    borderTop: '3px solid #007aff',
    display: 'inline-block',
    padding: '12px',
    borderRadius: '4px'
  },
  noLegend: {
    display: 'none'
  },
  fullWidth: {
    width: '100%',
    borderColor: '#d2d6da',
    borderRadius: '0.375rem'
  },
  switchSpacer: {
    margin: '0',
    '& .MuiFormControlLabel-root': {
      margin: '0'
    },
    '& .MuiSwitch-root': {
      margin: '0'
    }
  }
}));
function CreateUserRole() {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} sx={{ backgroundColor: '#fff' }}>
        <MDBox mx={2} sx={{ border: '1px solid #C4C4C4', borderRadius: '4px', padding: '30px' }}>
          <MDBox sx={{ width: '50%', margin: 'auto' }}>
            <MDBox sx={{ width: '120px', margin: 'auto', position: 'relative' }}>
              <img src={UserIcon} alt="img" />
              <MDBox sx={{ position: 'absolute', bottom: '0', right: '0', cursor: 'pointer' }}>
                <img src={EditIcon} alt="img" />
              </MDBox>
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                User Name
              </Box>
              <MDInput fullWidth name="warehousename" type="text" variant="outlined" />
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                Phone Number
              </Box>
              <MDInput fullWidth name="warehousename" type="text" variant="outlined" />
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                Role
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                <Box sx={{ width: '70%' }}>
                  <Select
                    multiple
                    displayEmpty
                    value={personName}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return 'Placeholder';
                      }

                      return selected.join(', ');
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      width: '100%'
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem disabled value="">
                      Placeholder
                    </MenuItem>
                    <MenuItem>Lorem Ipsum</MenuItem>
                  </Select>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '30%',
                    border: '1px solid #C4C4C4',
                    borderRadius: '4px'
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '0.01em',
                      textTransform: 'capitalize',
                      color: '#000',
                      marginLeft: '10px'
                    }}
                  >
                    Access
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      left: '20px'
                    }}
                  >
                    <Switch checked />
                  </Box>
                </Box>
              </Box>
            </MDBox>
            <Grid container spacing={2} className={classes.margin}>
              <Grid item xs={12}>
                <Grid container spacing={2} className={classes.margin}>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Created By
                    </Box>
                    <MDInput fullWidth name="warehousename" type="text" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Date &amp; Time
                    </Box>
                    <DateTimeInput />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Last Updated by
                    </Box>
                    <MDInput fullWidth name="warehousename" type="text" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Date &amp; Time
                    </Box>
                    <DateTimeInput />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>

        <Grid container spacing={4} sx={{ marginTop: '-6px' }}>
          <Grid item xs={12} md={6}>
            <MDBox
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #c2c2c2',
                borderTop: '7px solid #007aff',
                padding: '12px',
                borderRadius: '4px'
              }}
            >
              <Typography gutterBottom variant="h6" component="div">
                Warehouse
              </Typography>
              <TransferList />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #c2c2c2',
                borderTop: '7px solid #007aff',
                padding: '12px',
                borderRadius: '4px'
              }}
            >
              <Typography gutterBottom variant="h6" component="div">
                Warehouse
              </Typography>
              <TransferList />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '12px' }}>
          <Grid item xs={12} md={3}>
            <MDBox
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #c2c2c2',
                borderTop: '7px solid #007aff',
                borderRadius: '4px'
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  borderBottom: '1px solid #c2c2c2',
                  padding: '10px 20px',
                  marginBottom: '20px'
                }}
              >
                Process
              </Typography>
              <Box sx={{ padding: ' 0px 20px' }}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  lineHeight={1}
                  className={classes.switchSpacer}
                  sx={{ marginBottom: '20px  !important' }}
                >
                  <MDTypography variant="body2">Stock Tracking</MDTypography>
                  <Switch checked />
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  lineHeight={1}
                  className={classes.switchSpacer}
                  sx={{ marginBottom: '20px !important' }}
                >
                  <MDTypography variant="body2">Replenishment</MDTypography>
                  <Switch checked />
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  lineHeight={1}
                  className={classes.switchSpacer}
                  sx={{ marginBottom: '20px  !important' }}
                >
                  <MDTypography variant="body2">Alerting</MDTypography>
                  <Switch checked />
                </MDBox>
              </Box>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #c2c2c2',
                borderTop: '7px solid #007aff',
                borderRadius: '4px'
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  borderBottom: '1px solid #c2c2c2',
                  padding: '10px 20px',
                  marginBottom: '20px'
                }}
              >
                Application
              </Typography>
              <Box sx={{ padding: ' 0px 20px' }}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  lineHeight={1}
                  className={classes.switchSpacer}
                  sx={{ marginBottom: '20px  !important' }}
                >
                  <MDTypography variant="body2">Home</MDTypography>
                  <Switch checked />
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  lineHeight={1}
                  className={classes.switchSpacer}
                  sx={{ marginBottom: '20px !important' }}
                >
                  <MDTypography variant="body2">Setup</MDTypography>
                  <Switch checked />
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  lineHeight={1}
                  className={classes.switchSpacer}
                  sx={{ marginBottom: '20px  !important' }}
                >
                  <MDTypography variant="body2">Reports</MDTypography>
                  <Switch checked />
                </MDBox>
              </Box>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          lineHeight={1}
          sx={{ marginBottom: '15px', marginTop: '45px', paddingBottom: '30px' }}
        >
          <MDButton
            size="medium"
            color="error"
            variant="outlined"
            type="submit"
            sx={{ marginRight: '15px' }}
          >
            Cancel
          </MDButton>
          <MDButton size="medium" color="primary" variant="contained">
            Save
          </MDButton>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default CreateUserRole;
