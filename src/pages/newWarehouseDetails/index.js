import { Box, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import ImageUpload from 'components/ImageUpload/Index';
import MDButton from 'components/Button';

const useStyles = makeStyles({
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px'
  }
});

function NewWarehouseDetails() {
  const classes = useStyles();
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Box mx={3} my={3}>
          <Box sx={{ backgroundColor: '#fff', padding: '30px' }}>
            <Box
              component="div"
              sx={{
                fontSize: '22px',
                letterSpacing: '0.01em',
                color: '#000',
                marginBottom: '30px'
              }}
            >
              Form to Input
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Box component="div" sx={{ marginBottom: '15px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Warehouse name
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '15px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Address
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '15px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Types of inventories hosted
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '15px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Other attributes
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ marginTop: '30px' }}>
                  <ImageUpload />
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                marginTop: '60px',
                display: 'flex',
                justifyContent: 'center',
                columnGap: '20px'
              }}
            >
              <MDButton size="medium" color="error" variant="outlined">
                CANCEL
              </MDButton>
              <MDButton size="medium" color="primary" variant="outlined">
                SAVE
              </MDButton>
              <MDButton size="medium" color="primary" variant="contained">
                NEXT
              </MDButton>

              {/* ---edit-- */}
              <MDButton size="large" color="primary" variant="outlined">
                EDIT DETAILS
              </MDButton>
              <MDButton size="large" color="primary" variant="contained">
                SHOW DETAILS
              </MDButton>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </>
  );
}

export default NewWarehouseDetails;
