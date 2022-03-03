/* eslint-disable indent */
/* eslint-disable complexity */
import * as React from 'react';
import { Grid, TextField, Box, FormHelperText, TextareaAutosize } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ImageUploadMultiple from 'components/ImageUploadMultiple';
import MDButton from 'components/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CrossIcon from 'assets/images/CrossIcon';
import { useFormik } from 'formik';
import schema from 'services/ValidationServices';
import MDInput from 'components/MDInput';
import { useDispatch, useSelector } from 'react-redux';
import { API } from 'constant';
import LOGGER from 'services/Logger';
import Breadcrumbs from 'components/Breadcrumbs';
import { useParams } from 'react-router-dom';
import { WidgetSelectors } from 'redux/WidgetRedux';
import WidgetActions from 'redux/WidgetRedux';
import ItemActions from 'redux/ItemRedux';
import { useNavigate } from 'react-router-dom';
import { ItemSelectors } from 'redux/ItemRedux';

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

function AddNewItem() {
  const classes = useStyles();
  const { widgetName, inventoryId, itemId } = useParams();
  const getInitialFormValues = (data) => {
    return data && data._id === itemId
      ? {
          commonName: data.commonName,
          formalName: data.formalName,
          description: data.description,
          manufacturer: data.manufacturer,
          size: data.size,
          color: data.color,
          type: data.type,
          unitOfMaterial: data.unitOfMaterial,
          unitCost: data.unitCost,
          packageCount: data.packageCount,
          countPerPallet: data.countPerPallet,
          countPerPalletPackage: data.countPerPalletPackage,
          primaryWidgetFamilyId: data.widgetFamily.parent
            ? data.widgetFamily.parent
            : data.widgetFamily._id,
          secondaryWidgetFamilyId: data.widgetFamily.parent ? data.widgetFamily._id : '',
          policiesMetadata: {
            underStockLevelCount: data.policiesMetadata.underStockLevelCount,
            overStockLevelCount: data.policiesMetadata.overStockLevelCount,
            alertStockLevelCount: data.policiesMetadata.alertStockLevelCount,
            reorderStockLevelCount: data.policiesMetadata.reorderStockLevelCount
          },
          images: data.images.map((img) => ({ ...img, src: img.url }))
        }
      : {
          commonName: '',
          formalName: '',
          description: '',
          manufacturer: '',
          size: '',
          color: '',
          type: '',
          unitOfMaterial: '',
          unitCost: 0,
          packageCount: 0,
          countPerPallet: 0,
          countPerPalletPackage: 0,
          primaryWidgetFamilyId: '',
          secondaryWidgetFamilyId: '',
          policiesMetadata: {
            underStockLevelCount: 0,
            overStockLevelCount: 0,
            alertStockLevelCount: 0,
            reorderStockLevelCount: 0
          },
          images: []
        };
  };
  const itemData = getInitialFormValues(useSelector(ItemSelectors.getFormItem(itemId)));
  const dispatch = useDispatch();
  const [Manufacturer, setManufacturer] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  React.useEffect(() => {
    dispatch(
      WidgetActions.widgetRequest({
        loader: 'location-request',
        slug: `${API.GET_WIDGET_FAMILY_BY_INVENTORY}${inventoryId}`,
        method: 'get'
      })
    );

    itemId &&
      dispatch(
        ItemActions.oneItemRequest({
          loader: 'location-request',
          slug: API.EDIT_ITEM,
          method: 'get',
          widgetName,
          inventoryId,
          itemId
        })
      );
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: itemData,
    validationSchema: schema.addNewItem,
    onSubmit: (values) => {
      LOGGER.log('values', values);
      itemId
        ? dispatch(
            ItemActions.editItemRequest({
              loader: 'loading-request',
              slug: `${API.EDIT_ITEM}${itemId}`,
              method: 'patch',
              navigateTo,
              data: {
                commonName: values.commonName,
                formalName: values.formalName,
                description: values.description,
                manufacturer: values.manufacturer,
                size: values.size,
                color: values.color,
                type: values.type,
                unitOfMaterial: values.unitOfMaterial,
                unitCost: values.unitCost,
                packageCount: values.packageCount,
                countPerPallet: values.countPerPallet,
                countPerPalletPackage: values.countPerPalletPackage,
                customAttributes: [], // TBD
                policiesMetadata: {
                  underStockLevelCount: values.policiesMetadata.underStockLevelCount,
                  overStockLevelCount: values.policiesMetadata.overStockLevelCount,
                  alertStockLevelCount: values.policiesMetadata.alertStockLevelCount,
                  reorderStockLevelCount: values.policiesMetadata.reorderStockLevelCount
                },
                widgetFamilyId:
                  values.secondaryWidgetFamilyId === ''
                    ? values.primaryWidgetFamilyId
                    : values.secondaryWidgetFamilyId,
                images: values.images
              }
            })
          )
        : dispatch(
            ItemActions.addItemRequest({
              loader: 'loading-request',
              slug: API.ADD_ITEM,
              method: 'post',
              navigateTo,
              data: {
                commonName: values.commonName,
                formalName: values.formalName,
                description: values.description,
                manufacturer: values.manufacturer,
                size: values.size,
                color: values.color,
                type: values.type,
                unitOfMaterial: values.unitOfMaterial,
                unitCost: values.unitCost,
                packageCount: values.packageCount,
                countPerPallet: values.countPerPallet,
                countPerPalletPackage: values.countPerPalletPackage,
                customAttributes: [], // TBD
                policiesMetadata: {
                  underStockLevelCount: values.policiesMetadata.underStockLevelCount,
                  overStockLevelCount: values.policiesMetadata.overStockLevelCount,
                  alertStockLevelCount: values.policiesMetadata.alertStockLevelCount,
                  reorderStockLevelCount: values.policiesMetadata.reorderStockLevelCount
                },
                widgetFamilyId:
                  values.secondaryWidgetFamilyId === ''
                    ? values.primaryWidgetFamilyId
                    : values.secondaryWidgetFamilyId,
                images: values.images
              }
            })
          );
    }
  });

  const primaryFamily = useSelector(WidgetSelectors.getWidgetFamiliesByInventoryId(inventoryId));
  const secondaryFamily = useSelector(
    WidgetSelectors.getWidgetsByParentId(formik.values.primaryWidgetFamilyId)
  );

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Breadcrumbs
          title={`${widgetName} Details`}
          route={[
            { name: 'Home', path: '/home' },
            { name: 'Setup', path: '/setup' },
            { name: 'Inventory', path: '/setup/inventory' },
            { name: `${widgetName || 'Item'}` },
            { name: `Add New ${widgetName || 'Item'}` }
          ]}
        />
        <Box mx={3} my={3}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ backgroundColor: '#fff', padding: '30px' }}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      {widgetName || 'Item'} name
                    </Box>
                    <MDInput
                      fullWidth
                      name="commonName"
                      type="text"
                      variant="outlined"
                      value={formik.values.commonName}
                      error={formik.touched.commonName && Boolean(formik.errors.commonName)}
                      helperText={formik.touched.commonName && formik.errors.commonName}
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
                    <MDInput
                      fullWidth
                      name="manufacturer"
                      type="text"
                      variant="outlined"
                      value={formik.values.manufacturer}
                      error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer)}
                      helperText={formik.touched.manufacturer && formik.errors.manufacturer}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Type
                    </Box>
                    <MDInput
                      fullWidth
                      name="type"
                      type="text"
                      variant="outlined"
                      value={formik.values.type}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                      helperText={formik.touched.type && formik.errors.type}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Unit of Material
                    </Box>
                    <MDInput
                      fullWidth
                      name="unitOfMaterial"
                      type="text"
                      variant="outlined"
                      value={formik.values.unitOfMaterial}
                      error={formik.touched.unitOfMaterial && Boolean(formik.errors.unitOfMaterial)}
                      helperText={formik.touched.unitOfMaterial && formik.errors.unitOfMaterial}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Package Count
                    </Box>
                    <MDInput
                      fullWidth
                      name="packageCount"
                      type="number"
                      variant="outlined"
                      value={formik.values.packageCount}
                      error={formik.touched.packageCount && Boolean(formik.errors.packageCount)}
                      helperText={formik.touched.packageCount && formik.errors.packageCount}
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
                      name="formalName"
                      type="text"
                      variant="outlined"
                      value={formik.values.formalName}
                      error={formik.touched.formalName && Boolean(formik.errors.formalName)}
                      helperText={formik.touched.formalName && formik.errors.formalName}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Size
                    </Box>
                    <MDInput
                      fullWidth
                      name="size"
                      type="text"
                      variant="outlined"
                      value={formik.values.size}
                      error={formik.touched.size && Boolean(formik.errors.size)}
                      helperText={formik.touched.size && formik.errors.size}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Color
                    </Box>
                    <MDInput
                      fullWidth
                      name="color"
                      type="text"
                      variant="outlined"
                      value={formik.values.color}
                      error={formik.touched.color && Boolean(formik.errors.color)}
                      helperText={formik.touched.color && formik.errors.color}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Unit Cost
                    </Box>
                    <MDInput
                      fullWidth
                      name="unitCost"
                      type="number"
                      variant="outlined"
                      value={formik.values.unitCost}
                      error={formik.touched.unitCost && Boolean(formik.errors.unitCost)}
                      helperText={formik.touched.unitCost && formik.errors.unitCost}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Count per Pallet
                    </Box>
                    <MDInput
                      fullWidth
                      name="countPerPallet"
                      type="number"
                      variant="outlined"
                      value={formik.values.countPerPallet}
                      error={formik.touched.countPerPallet && Boolean(formik.errors.countPerPallet)}
                      helperText={formik.touched.countPerPallet && formik.errors.countPerPallet}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Count per Pallet Package
                    </Box>
                    <MDInput
                      fullWidth
                      name="countPerPalletPackage"
                      type="number"
                      variant="outlined"
                      value={formik.values.countPerPalletPackage}
                      error={
                        formik.touched.countPerPalletPackage &&
                        Boolean(formik.errors.countPerPalletPackage)
                      }
                      helperText={
                        formik.touched.countPerPalletPackage && formik.errors.countPerPalletPackage
                      }
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box component="div" sx={{ marginBottom: '24px' }}>
                    <Box component="div" className={classes.labelSize}>
                      Product Family Association
                    </Box>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="primaryWidgetFamilyId"
                        value={formik.values.primaryWidgetFamilyId}
                        error={
                          formik.touched.primaryWidgetFamilyId &&
                          Boolean(formik.errors.primaryWidgetFamilyId)
                        }
                        onChange={formik.handleChange}
                      >
                        <MenuItem key={'none'} value={''}>
                          None Selected
                        </MenuItem>
                        {primaryFamily &&
                          primaryFamily.map((fam) => (
                            <MenuItem key={fam._id} value={fam._id}>
                              {fam.name}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText>
                        {formik.errors.primaryWidgetFamilyId &&
                          formik.touched.primaryWidgetFamilyId &&
                          formik.errors.primaryWidgetFamilyId}
                      </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="secondaryWidgetFamilyId"
                        value={formik.values.secondaryWidgetFamilyId}
                        error={
                          formik.touched.secondaryWidgetFamilyId &&
                          Boolean(formik.errors.secondaryWidgetFamilyId)
                        }
                        onChange={formik.handleChange}
                      >
                        <MenuItem key={'none'} value={''}>
                          None Selected
                        </MenuItem>
                        {secondaryFamily &&
                          secondaryFamily.map((fam) => (
                            <MenuItem key={fam._id} value={fam._id}>
                              {fam.name}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText>
                        {formik.errors.secondaryWidgetFamilyId &&
                          formik.touched.secondaryWidgetFamilyId &&
                          formik.errors.secondaryWidgetFamilyId}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Box>
                {itemId ? (
                  <ImageUploadMultiple
                    multiple
                    heading={`Upload ${widgetName} Image`}
                    accept="image/*"
                    images={formik.values.images}
                    setImages={(images) => {
                      formik.setFieldValue('images', images);
                    }}
                  />
                ) : (
                  <ImageUploadMultiple
                    multiple
                    heading={`Upload ${widgetName} Image`}
                    accept="image/*"
                    images={formik.values.images}
                    setImages={(images) => {
                      formik.setFieldValue('images', images);
                    }}
                  />
                )}
              </Box>
              {/* <Box
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
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  add custom fields
                </MDButton>
                <MDButton disabled size="large" color="primary" variant="outlined">
                  import
                </MDButton>
              </Box> */}
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
                    name="policiesMetadata.underStockLevelCount"
                    type="number"
                    variant="outlined"
                    value={formik.values.policiesMetadata.underStockLevelCount}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box>
                  <Box component="div" className={classes.labelSize}>
                    Over
                  </Box>
                  <MDInput
                    fullWidth
                    name="policiesMetadata.overStockLevelCount"
                    type="number"
                    variant="outlined"
                    value={formik.values.policiesMetadata.overStockLevelCount}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box>
                  <Box component="div" className={classes.labelSize}>
                    Alert
                  </Box>
                  <MDInput
                    fullWidth
                    name="policiesMetadata.alertStockLevelCount"
                    type="number"
                    variant="outlined"
                    value={formik.values.policiesMetadata.alertStockLevelCount}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box>
                  <Box component="div" className={classes.labelSize}>
                    Reorder
                  </Box>
                  <MDInput
                    fullWidth
                    name="policiesMetadata.reorderStockLevelCount"
                    type="number"
                    variant="outlined"
                    value={formik.values.policiesMetadata.reorderStockLevelCount}
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
                <MDButton
                  size="medium"
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    navigate('/setup/inventory');
                  }}
                >
                  Cancel
                </MDButton>
                <MDButton size="medium" color="primary" variant="contained" type="submit">
                  Save
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
          <MDButton
            sx={{ padding: '0px', minWidth: '14px' }}
            onClick={() => {
              setOpen(false);
            }}
          >
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
                    onChange={(event) => {
                      setManufacturer(event.target.value);
                    }}
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
                    onChange={(event) => {
                      setManufacturer(event.target.value);
                    }}
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

export default AddNewItem;
