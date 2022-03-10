import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, MenuItem, OutlinedInput, Chip, Select } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import ImageUploadSingle from 'components/ImageUploadSingle';
import MDButton from 'components/Button';
import { useFormik } from 'formik';
// import schema from 'services/ValidationServices';
import MDInput from 'components/MDInput';
import WarehouseActions from 'redux/WarehouseRedux';
import { API } from 'constant';
import Breadcrumbs from 'components/Breadcrumbs';

import { useNavigate } from 'react-router-dom';
import { InventorySelectors } from 'redux/InventoryRedux';
import InventoryActions from 'redux/InventoryRedux';
import schema from 'services/ValidationServices';

function NewWarehouseDetails() {
  const dispatch = useDispatch();
  const inventoryTypes = useSelector(InventorySelectors.getInventoryDetail);

  React.useEffect(() => {
    dispatch(
      InventoryActions.getInventoryAction({
        loader: 'loading-request',
        slug: API.GET_INVENTORY,
        method: 'get'
      })
    );
  }, []);

  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/setup/warehouse/edit-warehouse/${id}`);
  };

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
  const formik = useFormik({
    initialValues: {
      warehousename: '',
      address: '',
      preferredInventories: [],
      specs: '',
      image: []
    },
    validationSchema: schema.warehouseForm,
    onSubmit: (values) => {
      dispatch(
        WarehouseActions.createWarehouseAction({
          loader: 'loading-request',
          slug: API.CREATE_WAREHOUSE,
          method: 'post',
          navigateTo: navigateTo,
          data: {
            name: values.warehousename,
            address: values.address,
            preferredInventories: values.preferredInventories,
            specs: values.specs,
            image: values.image,
            company_id: '61cea5fd028432700a7f8601'
          }
        })
      );
    }
  });

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Breadcrumbs
          title="Create A Warehouse"
          route={[
            { name: 'Home', path: '/home' },
            { name: 'Setup', path: '/setup' },
            { name: 'Warehouse', path: '/setup/warehouse' },
            { name: 'Add Warehouse' }
          ]}
        />
        <Box mx={3} my={3}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ backgroundColor: '#fff', padding: '30px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box component="div" sx={{ marginBottom: '15px' }}>
                    <Box
                      component="div"
                      sx={{
                        fontSize: '16px',
                        letterSpacing: '0.01em',
                        color: '#000',
                        marginBottom: '4px'
                      }}
                    >
                      Warehouse name
                    </Box>
                    <MDInput
                      fullWidth
                      type="text"
                      variant="outlined"
                      name="warehousename"
                      value={formik.values.warehousename}
                      error={formik.touched.warehousename && Boolean(formik.errors.warehousename)}
                      helperText={
                        formik.touched.warehousename &&
                        formik.errors.warehousename && (
                          <div style={{ color: 'red' }}>{formik.errors.warehousename}</div>
                        )
                      }
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '15px' }}>
                    <Box
                      component="div"
                      sx={{
                        fontSize: '16px',
                        letterSpacing: '0.01em',
                        color: '#000',
                        marginBottom: '4px'
                      }}
                    >
                      Address
                    </Box>
                    <MDInput
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="address"
                      value={formik.values.address}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={
                        formik.touched.address &&
                        formik.errors.address && (
                          <div style={{ color: 'red' }}>{formik.errors.address}</div>
                        )
                      }
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '15px' }}>
                    <Box
                      component="div"
                      sx={{
                        fontSize: '16px',
                        letterSpacing: '0.01em',
                        color: '#000',
                        marginBottom: '4px'
                      }}
                    >
                      Inventories hosted
                    </Box>
                    <Select
                      multiple
                      select
                      fullWidth
                      variant="outlined"
                      name="preferredInventories"
                      input={<OutlinedInput />}
                      value={formik.values.preferredInventories}
                      error={
                        formik.touched.preferredInventories &&
                        Boolean(formik.errors.preferredInventories)
                      }
                      helperText={
                        formik.touched.preferredInventories && formik.errors.preferredInventories
                      }
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={inventoryTypes.find((x) => x._id === value)?.name || 'unknown'}
                            />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                      onChange={(e) => {
                        const value = e.target.value;
                        formik.setFieldValue(
                          'preferredInventories',
                          // On autofill we get a stringified value.
                          typeof value === 'string' ? value.split(',') : value
                        );
                      }}
                    >
                      <MenuItem disabled key={'none'} value={''}>
                        None Selected
                      </MenuItem>
                      {inventoryTypes &&
                        inventoryTypes.map((inventory) => (
                          <MenuItem key={inventory._id} value={inventory._id}>
                            {inventory.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '15px' }}>
                    <Box
                      component="div"
                      sx={{
                        fontSize: '16px',
                        letterSpacing: '0.01em',
                        color: '#000',
                        marginBottom: '4px'
                      }}
                    >
                      Other attributes
                    </Box>
                    <MDInput
                      fullWidth
                      type="text"
                      variant="outlined"
                      name="specs"
                      value={formik.values.specs}
                      error={formik.touched.specs && Boolean(formik.errors.specs)}
                      helperText={formik.touched.specs && formik.errors.specs}
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box sx={{ marginTop: '30px' }}>
                    <ImageUploadSingle
                      multiple
                      heading="Upload Warehouse Image"
                      accept="image/*"
                      images={formik.values.image}
                      setImages={(image) => {
                        formik.setFieldValue('image', image);
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
                <MDButton
                  size="medium"
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    navigate('/setup/warehouse');
                  }}
                >
                  CANCEL
                </MDButton>
                <MDButton size="medium" color="primary" variant="outlined" type="submit">
                  SAVE
                </MDButton>
                {/* <MDButton size="medium" color="primary" variant="contained">
                  NEXT
                </MDButton> */}
              </Box>
            </Box>
          </form>
        </Box>
      </DashboardLayout>
    </>
  );
}

export default NewWarehouseDetails;
