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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';

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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} py={3}>
        <Grid container spacing={2} className={classes.margin}>
          <Grid item xs={8} md={8}>
            <Grid container spacing={2} className={classes.margin}>
              <Grid item xs={12}>
                <Box component="div" sx={{}} className={classes.labelSize}>
                  Warehouse name
                </Box>
                <MDInput fullWidth name="warehousename" type="text" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Box component="div" className={classes.labelSize}>
                  Description
                </Box>
                <TextareaAutosize className={classes.fullWidth} minRows={5} />
              </Grid>
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
          </Grid>
          <Grid item xs={4}>
            <Box component="div" className={classes.labelSize}>
              Choose avatar component here
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: '-6px' }}>
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
                padding: '12px',
                borderRadius: '4px'
              }}
            >
              <Typography gutterBottom variant="h6" component="div">
                Process
              </Typography>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                lineHeight={1}
                className={classes.switchSpacer}
              >
                <MDTypography variant="body2">Sidenav Mini</MDTypography>
                <Switch checked />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
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
                Application
              </Typography>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                lineHeight={1}
                className={classes.switchSpacer}
              >
                <MDTypography variant="body2">Sidenav Mini</MDTypography>
                <Switch checked />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          lineHeight={1}
          sx={{ marginBottom: '15px', marginTop: '24px' }}
        >
          <MDButton
            size="medium"
            color="primary"
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
