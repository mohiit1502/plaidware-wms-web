/* eslint-disable complexity */
import * as React from 'react';
import { Grid, TextField, Box, FormHelperText, TextareaAutosize } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ImageUpload from 'components/ImageUpload';
import MDButton from 'components/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CrossIcon from 'assets/images/CrossIcon';
import { useFormik } from 'formik';
import schema from 'services/ValidationServices';
import MDInput from 'components/MDInput';
import { useDispatch } from 'react-redux';
import ProductActions from 'redux/ProductsRedux';
import { API } from 'constant';
import LOGGER from 'services/Logger';
import Breadcrumbs from 'components/Breadcrumbs';

const useStyles = makeStyles({
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px',
    lineHeight: '20px'
  },
  textAreaSize: {
    width: '100% !important',
    resize: 'none',
    height: '203px !important',
    boxSizing: 'border-box',
    border: '1px solid #C4C4C4',
    borderRadius: '4px',
    padding: '10px'
  },
  cursorPointer: {
    cursor: 'pointer'
  }
});

const inventoryTypes = ['Perishable', 'Material', 'Product', 'Inventory', 'Fleet'];

function AddNewProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Manufacturer, setManufacturer] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setManufacturer(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      warehousename: '',
      description: '',
      manufacturer: '',
      type: '',
      unitofmaterial: '',
      packagecount: '',
      formalname: '',
      size: '',
      color: '',
      unitcost: '',
      countperpallet: '',
      countperpalletpackage: '',
      productfamilyassociation: '',
      under: '',
      over: '',
      alert: '',
      images: []
    },
    validationSchema: schema.addNewProduct,
    onSubmit: (values, onSubmitProps) => {
      LOGGER.log('values', values);
      dispatch(
        ProductActions.addProductAction({
          loader: 'loading-request',
          slug: API.ADD_PRODUCT,
          method: 'post',
          data: {
            commonName: values.warehousename,
            formalName: values.formalname,
            description: values.description,
            manufacturer: values.manufacturer,
            size: values.size,
            color: values.color,
            type: values.type,
            unitOfMaterial: values.unitofmaterial,
            unitCost: values.unitcost,
            packageCount: values.packagecount,
            countPerPallet: values.countperpallet,
            countPerPalletPackage: values.countperpalletpackage,
            customAttributes: [
              { fieldName: 'someName', fieldType: 'String', fieldValue: 'someValue' }
            ],
            widgetFamilyId: '61dcdd10699e8f55b44c606d'
          }
        })
      );
      onSubmitProps.resetForm();
    }
  });

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Breadcrumbs
          route={[
            { name: 'Home', path: '/home' },
            { name: 'Setup', path: '/setup' },
            { name: 'Inventory', path: '/setup/inventory' },
            { name: 'Products' },
            { name: 'Add New Product' }
          ]}
        />
        <Box mx={3} my={3}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ backgroundColor: '#fff', padding: '30px' }}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
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
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Description
                    </Box>
                    <TextareaAutosize
                      variant="outlined"
                      name="description"
                      className={classes.textAreaSize}
                      value={formik.values.description}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      onChange={formik.handleChange}
                    />
                    <FormHelperText>
                      {formik.errors.description &&
                        formik.touched.description &&
                        formik.errors.description}
                    </FormHelperText>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Manufacturer
                    </Box>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="manufacturer"
                        value={formik.values.manufacturer}
                        error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer)}
                        onChange={formik.handleChange}
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
                      <FormHelperText>
                        {formik.errors.manufacturer &&
                          formik.touched.manufacturer &&
                          formik.errors.manufacturer}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Type
                    </Box>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="type"
                        value={formik.values.type}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        onChange={formik.handleChange}
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
                      <FormHelperText>
                        {formik.errors.type && formik.touched.type && formik.errors.type}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Unit of Material
                    </Box>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="unitofmaterial"
                        value={formik.values.unitofmaterial}
                        error={
                          formik.touched.unitofmaterial && Boolean(formik.errors.unitofmaterial)
                        }
                        onChange={formik.handleChange}
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
                      <FormHelperText>
                        {formik.errors.unitofmaterial &&
                          formik.touched.unitofmaterial &&
                          formik.errors.unitofmaterial}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Package Count
                    </Box>
                    <MDInput
                      fullWidth
                      name="packagecount"
                      type="text"
                      variant="outlined"
                      value={formik.values.packagecount}
                      error={formik.touched.packagecount && Boolean(formik.errors.packagecount)}
                      helperText={formik.touched.packagecount && formik.errors.packagecount}
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Formal Name
                    </Box>
                    <MDInput
                      fullWidth
                      name="formalname"
                      type="text"
                      variant="outlined"
                      value={formik.values.formalname}
                      error={formik.touched.formalname && Boolean(formik.errors.formalname)}
                      helperText={formik.touched.formalname && formik.errors.formalname}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Size
                    </Box>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="size"
                        value={formik.values.size}
                        error={formik.touched.size && Boolean(formik.errors.size)}
                        onChange={formik.handleChange}
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
                      <FormHelperText>
                        {formik.errors.size && formik.touched.size && formik.errors.size}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Color
                    </Box>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="color"
                        value={formik.values.color}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        onChange={formik.handleChange}
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
                      <FormHelperText>
                        {formik.errors.color && formik.touched.color && formik.errors.color}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Unit Cost
                    </Box>
                    <MDInput
                      fullWidth
                      name="unitcost"
                      type="text"
                      variant="outlined"
                      value={formik.values.unitcost}
                      error={formik.touched.unitcost && Boolean(formik.errors.unitcost)}
                      helperText={formik.touched.unitcost && formik.errors.unitcost}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Count per Pallet
                    </Box>
                    <MDInput
                      fullWidth
                      name="countperpallet"
                      type="text"
                      variant="outlined"
                      value={formik.values.countperpallet}
                      error={formik.touched.countperpallet && Boolean(formik.errors.countperpallet)}
                      helperText={formik.touched.countperpallet && formik.errors.countperpallet}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Count per Pallet Package
                    </Box>
                    <MDInput
                      fullWidth
                      name="countperpalletpackage"
                      type="text"
                      variant="outlined"
                      value={formik.values.countperpalletpackage}
                      error={
                        formik.touched.countperpalletpackage &&
                        Boolean(formik.errors.countperpalletpackage)
                      }
                      helperText={
                        formik.touched.countperpalletpackage && formik.errors.countperpalletpackage
                      }
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Product Family Association
                    </Box>
                    <FormControl fullWidth sx={{ marginBottom: '32px' }}>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="productfamilyassociation"
                        value={formik.values.productfamilyassociation}
                        error={
                          formik.touched.productfamilyassociation &&
                          Boolean(formik.errors.productfamilyassociation)
                        }
                        onChange={formik.handleChange}
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
                      <FormHelperText>
                        {formik.errors.productfamilyassociation &&
                          formik.touched.productfamilyassociation &&
                          formik.errors.productfamilyassociation}
                      </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="productfamilyassociation"
                        value={formik.values.productfamilyassociation}
                        error={
                          formik.touched.productfamilyassociation &&
                          Boolean(formik.errors.productfamilyassociation)
                        }
                        onChange={formik.handleChange}
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
                      <FormHelperText>
                        {formik.errors.productfamilyassociation &&
                          formik.touched.productfamilyassociation &&
                          formik.errors.productfamilyassociation}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Box>
                <ImageUpload
                  multiple
                  heading="Upload Product Image"
                  accept="image/*"
                  images={formik.values.images}
                  setImages={(images) => {
                    formik.setFieldValue('images', images);
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: '20px',
                  marginTop: '30px',
                  marginBottom: '30px'
                }}
              >
                <MDButton
                  disabled
                  size="large"
                  color="primary"
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  add custom fields
                </MDButton>
                <MDButton disabled size="large" color="primary" variant="outlined">
                  import
                </MDButton>
              </Box>
              <Box
                component="div"
                sx={{
                  marginBottom: '30px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid #C2C2C2',
                  color: '#000'
                }}
              >
                Stock Level Triggers
              </Box>
              <Box sx={{ display: 'flex', width: '50%', columnGap: '24px', marginBottom: '30px' }}>
                <Box>
                  <Box component="div" className={classes.labelSize}>
                    Under
                  </Box>
                  <MDInput
                    fullWidth
                    name="under"
                    type="number"
                    variant="outlined"
                    value={formik.values.under}
                    error={formik.touched.under && Boolean(formik.errors.under)}
                    helperText={formik.touched.under && formik.errors.under}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box>
                  <Box component="div" className={classes.labelSize}>
                    Over
                  </Box>
                  <MDInput
                    fullWidth
                    name="over"
                    type="number"
                    variant="outlined"
                    value={formik.values.over}
                    error={formik.touched.over && Boolean(formik.errors.over)}
                    helperText={formik.touched.over && formik.errors.over}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box>
                  <Box component="div" className={classes.labelSize}>
                    Alert
                  </Box>
                  <MDInput
                    fullWidth
                    name="alert"
                    type="number"
                    variant="outlined"
                    value={formik.values.alert}
                    error={formik.touched.alert && Boolean(formik.errors.alert)}
                    helperText={formik.touched.alert && formik.errors.alert}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: '20px',
                  marginTop: '72px',
                  marginBottom: '30px'
                }}
              >
                <MDButton size="medium" color="error" variant="outlined">
                  cancel
                </MDButton>
                <MDButton size="medium" color="primary" variant="contained" type="submit">
                  add ITem
                </MDButton>
              </Box>
            </Box>
          </form>
        </Box>
      </DashboardLayout>

      <Dialog
        keepMounted
        open={open}
        fullWidth={'lg'}
        maxWidth={'lg'}
        sx={{
          backgroundColor: 'rgb(0 0 0 / 5%)'
        }}
      >
        <Box
          sx={{
            textAlign: 'right',
            padding: '10px 20px'
          }}
        >
          <MDButton sx={{ padding: '0px', minWidth: '14px' }} onClick={handleClose}>
            <CrossIcon className={classes.cursorPointer} />
          </MDButton>
        </Box>
        <DialogContent>
          <Box
            sx={{
              paddingLeft: '48px',
              paddingRight: '48px',
              paddingBottom: '50px',
              marginTop: '-20px'
            }}
          >
            <Box
              component="label"
              sx={{
                color: '#000',
                fontSize: '18px',
                marginBottom: '32px',
                fontWeight: '500',
                display: 'block'
              }}
            >
              Add Custom Field
            </Box>
            <Box sx={{ width: '420px' }}>
              <Box component="div" sx={{ marginBottom: '24px' }}>
                <Box component="div" className={classes.labelSize}>
                  Field Name
                </Box>
                <TextField fullWidth variant="outlined" />
              </Box>
              <Box component="div" sx={{ marginBottom: '24px' }}>
                <Box component="div" className={classes.labelSize}>
                  Field Type
                </Box>
                <FormControl fullWidth>
                  <Select
                    value={Manufacturer}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Placeholder</em>;
                      }
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box component="div" sx={{ marginBottom: '24px' }}>
                <Box component="div" className={classes.labelSize}>
                  Add Enumerable List (if applicable)
                </Box>
                <FormControl fullWidth>
                  <Select
                    value={Manufacturer}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Placeholder</em>;
                      }
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                columnGap: '20px',
                marginTop: '40px',
                marginBottom: '60px'
              }}
            >
              <MDButton size="medium" color="error" variant="outlined">
                cancel
              </MDButton>
              <MDButton size="medium" color="primary" variant="outlined">
                Save
              </MDButton>
              <MDButton size="medium" color="primary" variant="contained">
                add field
              </MDButton>
            </Box>
            <Box
              component="div"
              sx={{
                background: '#E5E5E5',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
                fontSize: '16px',
                borderBottom: '1px solid #d9d9d9',
                padding: '8px 16px',
                color: '#000'
              }}
            >
              Custom Fields
            </Box>
            <Box sx={{ border: '3px solid #e5e5e5' }}>
              <Grid container>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '16px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      backgroundColor: '#E5E5E5',
                      textTransform: 'uppercase'
                    }}
                  >
                    Field name
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '16px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      backgroundColor: '#E5E5E5',
                      textTransform: 'uppercase'
                    }}
                  >
                    field type
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '16px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      backgroundColor: '#E5E5E5',
                      textTransform: 'uppercase'
                    }}
                  >
                    Enumerable list
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '14px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    Dummy data
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '14px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    Dummy data
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '14px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    Dummy data
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewProduct;
