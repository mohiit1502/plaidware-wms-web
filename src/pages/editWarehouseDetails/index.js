import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  MenuItem,
  OutlinedInput,
  Chip,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import ImageUpload from 'components/ImageUpload';
import MDButton from 'components/Button';
import { useFormik } from 'formik';
import schema from 'services/ValidationServices';
import MDInput from 'components/MDInput';
import WarehouseActions from 'redux/WarehouseRedux';
import SnackBar from 'components/SnackBar';
import { getChildLocationType } from 'utils/nestedTableTools';
import { getPropertiesOfLocationType } from 'utils/nestedTableTools';
import { getInitialvaluesFromParentData } from 'utils/nestedTableTools';
import LOGGER from 'services/Logger';
import WarehouseLocationsActions from 'redux/WarehouseLocationsRedux';
import { getAPIslugOfLocationType } from 'utils/nestedTableTools';
import { toTitleCase } from 'utils/nestedTableTools';
import { useParams } from 'react-router-dom';
import { WarehouseLocationsSelectors } from 'redux/WarehouseLocationsRedux';
import { API } from 'constant';
import NestedDataTable from 'components/NestedTable';
import Breadcrumbs from 'components/Breadcrumbs';
import { WarehouseSelectors } from 'redux/WarehouseRedux';

const bottomButtonStyling = {
  width: '100%',
  textTransform: 'uppercase',
  borderRadius: '100px',
  padding: '13px 30px'
};

const AddForm = ({ addFormOpen, setAddFormOpen, selected, warehouseId }) => {
  const dispatch = useDispatch();
  const data = addFormOpen !== 'zone' ? selected : { location: 'warehouse', id: warehouseId };

  const childLocationType = getChildLocationType(data.location);
  const fields = getPropertiesOfLocationType(childLocationType);

  const formik = useFormik({
    initialValues: getInitialvaluesFromParentData(data),
    onSubmit: (values) => {
      LOGGER.log('Form values and parent info', values, data);
      const formData = { ...values };
      formData[`${data.location}_id`] = data.id;
      dispatch(
        WarehouseLocationsActions.addLocationRequest({
          loader: 'location-request',
          slug: getAPIslugOfLocationType(childLocationType),
          method: 'post',
          data: formData,
          parent: {
            id: data.id,
            type: data.location
          }
        })
      );
      setAddFormOpen(false);
    }
  });

  return (
    <Dialog
      open={addFormOpen}
      onClose={() => {
        setAddFormOpen(false);
      }}
    >
      <DialogTitle>Add new {childLocationType} details</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Some more text if needed</DialogContentText> */}
        {fields &&
          fields.map((fieldName) => (
            <TextField
              fullWidth
              key={fieldName}
              margin="dense"
              label={toTitleCase(fieldName)}
              type={fieldName === 'number' ? 'number' : 'text'}
              name={fieldName}
              variant="standard"
              value={formik.values[fieldName]}
              error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
              helperText={formik.touched[fieldName] && formik.errors[fieldName]}
              onChange={formik.handleChange}
            />
          ))}
        {childLocationType === 'sublevel' ? (
          <>
            Type:{' '}
            <Select
              label="Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <MenuItem value="POSITION">Position</MenuItem>
              <MenuItem value="BIN">Bin</MenuItem>
              <MenuItem value="PALLET">Pallet</MenuItem>
            </Select>
            Positions:{' '}
            <Select
              multiple
              name="postitions"
              value={formik.values.positions}
              input={<OutlinedInput id="select-multiple-chip" label="Positions" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250
                  }
                }
              }}
              onChange={(event) => {
                const {
                  target: { value }
                } = event;
                formik.setFieldValue(
                  'positions',
                  // On autofill we get a stringified value.
                  typeof value === 'string' ? value.split(',') : value
                );
              }}
            >
              {['LDB', 'LDF', 'LUB', 'LUF', 'RDB', 'RDF', 'RUB', 'RUF'].map((position) => (
                <MenuItem
                  key={position}
                  value={position}
                  // style={{
                  //   fontWeight: theme.typography.fontWeightMedium
                  // }}
                >
                  {position}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <MDButton
          onClick={() => {
            setAddFormOpen(false);
          }}
        >
          Cancel
        </MDButton>
        <MDButton onClick={formik.handleSubmit}>Save</MDButton>
      </DialogActions>
    </Dialog>
  );
};

AddForm.propTypes = {
  addFormOpen: PropTypes.any,
  setAddFormOpen: PropTypes.any,
  selected: PropTypes.any,
  warehouseId: PropTypes.any
};

const WarehouseNestedDetails = () => {
  const [selected, setSelected] = React.useState(null);
  const [addFormOpen, setAddFormOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { warehouseId } = useParams();
  LOGGER.log('warehouseID', warehouseId);
  const data = useSelector(WarehouseLocationsSelectors.getChildrenOfParent(warehouseId));

  const populateChildren = (id, type) => {
    LOGGER.log('populating:', id, type);
    dispatch(
      WarehouseLocationsActions.locationRequest({
        loader: 'location-request',
        slug: API.GET_CHILDREN_FROM_PARENT,
        method: 'post',
        data: { id, type }
      })
    );
  };

  React.useEffect(() => {
    populateChildren(warehouseId, 'warehouse');
  }, []);

  return (
    <>
      <Box px={3} py={3}>
        {data &&
          data.map((data) => (
            <NestedDataTable
              key={data.id}
              data={data}
              selected={selected}
              setSelected={setSelected}
              populateChildren={populateChildren}
            />
          ))}
        {/* Debugging */}
        {/* <pre>{JSON.stringify(selected, null, 4)}</pre> */}
        {/* Bottom buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '20px',
            margin: '20px'
          }}
        >
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            color="primary"
            variant="contained"
            onClick={() => {
              setAddFormOpen('zone');
            }}
          >
            Add zone
          </MDButton>
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            disabled={selected?.location !== 'zone'}
            color={selected?.location === 'zone' ? 'primary' : 'secondary'}
            variant="contained"
            onClick={() => {
              setAddFormOpen(true);
            }}
          >
            Add area
          </MDButton>
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            disabled={selected?.location !== 'area'}
            color={selected?.location === 'area' ? 'primary' : 'secondary'}
            variant="contained"
            onClick={() => {
              setAddFormOpen(true);
            }}
          >
            Add row
          </MDButton>
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            disabled={selected?.location !== 'row'}
            color={selected?.location === 'row' ? 'primary' : 'secondary'}
            variant="contained"
            onClick={() => {
              setAddFormOpen(true);
            }}
          >
            Add bay
          </MDButton>
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            disabled={selected?.location !== 'bay'}
            color={selected?.location === 'bay' ? 'primary' : 'secondary'}
            variant="contained"
            onClick={() => {
              setAddFormOpen(true);
            }}
          >
            Add Level
          </MDButton>
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            disabled={!['level', 'sublevel'].includes(selected?.location)}
            color={['level', 'sublevel'].includes(selected?.location) ? 'primary' : 'secondary'}
            variant="contained"
            onClick={() => {
              setAddFormOpen(true);
            }}
          >
            Add Sublevel
          </MDButton>
        </Box>
      </Box>
      {addFormOpen && (
        <AddForm
          addFormOpen={addFormOpen}
          setAddFormOpen={setAddFormOpen}
          selected={selected}
          warehouseId={warehouseId}
        />
      )}
    </>
  );
};

const inventoryTypes = ['Perishable', 'Material', 'Product', 'Inventory', 'Fleet'];

function EditWarehouseDetails() {
  const { warehouseId } = useParams();
  const warehouseData = useSelector(WarehouseSelectors.getWarehouseDetailById(warehouseId));

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
      warehousename: warehouseData.name,
      address: warehouseData.address,
      inventorytype: [],
      attributes: '',
      images: warehouseData.images
    },
    validationSchema: schema.warehouseForm,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        WarehouseActions.editWarehouseAction({
          loader: 'loading-request',
          slug: `/warehouse/${warehouseData._id}`,
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
        <Breadcrumbs
          route={[
            { name: 'Home', path: '/home' },
            { name: 'Setup', path: '/setup' },
            { name: 'Warehouse', path: '/setup/warehouse' },
            { name: warehouseData.name || '' }
          ]}
        />
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
                  SAVE
                </MDButton>
                {/* <MDButton
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    navigate(`/setup/warehouse/warehouse-details/${location.state.id}`);
                  }}
                >
                  SHOW DETAILS
                </MDButton> */}
              </Box>
            </Box>
          </form>
          <WarehouseNestedDetails />
        </Box>
      </DashboardLayout>
      <SnackBar open={open} message="warehouse edit successful" handleClose={handleClose} />
    </>
  );
}
export default EditWarehouseDetails;
