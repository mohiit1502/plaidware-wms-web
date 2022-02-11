import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid, MenuItem, OutlinedInput, Chip, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import ImageUpload from 'components/ImageUpload';
import MDButton from 'components/Button';
import { useFormik } from 'formik';
import schema from 'services/ValidationServices';
import MDInput from 'components/MDInput';
import { useLocation } from 'react-router-dom';
import WarehouseActions from 'redux/WarehouseRedux';
import SnackBar from 'components/SnackBar';

const useStyles = makeStyles({
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px'
  }
});

const inventoryTypes = ['Perishable', 'Material', 'Product', 'Inventory', 'Fleet'];

function EditWarehouseDetails() {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      warehousename: location.state.name,
      address: location.state.address,
      inventorytype: [],
      attributes: '',
      images: []
    },
    validationSchema: schema.warehouseForm,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        WarehouseActions.editWarehouseAction({
          loader: 'loading-request',
          slug: `/warehouse/${location.state.id}`,
          method: 'patch',
          data: {
            name: values.warehousename,
            address: values.address,
            specs: '',
            company_id: ''
          }
        })
      );
      onSubmitProps.resetForm();
      setOpen(true);
    }
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Box mx={3} my={3}>
          <form onSubmit={formik.handleSubmit}>
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
                    <MDInput
                      fullWidth
                      name="warehousename"
                      type="text"
                      variant="outlined"
                      value={formik.values.warehousename}
                      error={formik.touched.warehousename && Boolean(formik.errors.warehousename)}
                      helperText={formik.touched.warehousename && formik.errors.warehousename}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '15px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Address
                    </Box>
                    <MDInput
                      fullWidth
                      name="address"
                      type="text"
                      variant="outlined"
                      value={formik.values.address}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '15px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Types of inventories hosted
                    </Box>
                    <Select
                      multiple
                      select
                      fullWidth
                      variant="outlined"
                      name="inventorytype"
                      input={<OutlinedInput />}
                      value={formik.values.inventorytype}
                      error={formik.touched.inventorytype && Boolean(formik.errors.inventorytype)}
                      helperText={formik.touched.inventorytype && formik.errors.inventorytype}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                      onChange={(event) => {
                        const {
                          target: { value }
                        } = event;
                        formik.setFieldValue(
                          'inventorytype',
                          // On autofill we get a stringified value.
                          typeof value === 'string' ? value.split(',') : value
                        );
                      }}
                    >
                      <MenuItem key={''} value={''}>
                        None Selected
                      </MenuItem>
                      {inventoryTypes.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '15px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Other attributes
                    </Box>
                    <MDInput
                      fullWidth
                      type="text"
                      variant="outlined"
                      name="attributes"
                      value={formik.values.attributes}
                      error={formik.touched.attributes && Boolean(formik.errors.attributes)}
                      helperText={formik.touched.attributes && formik.errors.attributes}
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box sx={{ marginTop: '30px' }}>
                    <ImageUpload
                      multiple
                      heading="Upload Warehouse Image"
                      accept="image/*"
                      images={formik.values.images}
                      setImages={(images) => {
                        formik.setFieldValue('images', images);
                      }}
                    />
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
                {/* ---edit-- */}
                <MDButton size="large" color="primary" variant="outlined" type="submit">
                  EDIT DETAILS
                </MDButton>
                <MDButton size="large" color="primary" variant="contained">
                  SHOW DETAILS
                </MDButton>
              </Box>
            </Box>
          </form>
        </Box>
      </DashboardLayout>
      <SnackBar open={open} message="warehouse edit successful" handleClose={handleClose} />
    </>
  );
}
export default EditWarehouseDetails;
