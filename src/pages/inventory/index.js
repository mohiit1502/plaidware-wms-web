import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { Box, Grid, MenuItem, Select, TableBody, TableCell, TableRow } from '@mui/material';
import MDInput from 'components/MDInput';
import ImageUpload from 'components/ImageUpload';
import Switch from 'components/Switch';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import Dropdown from 'components/Dropdown';
import MDButton from 'components/Button';
import BasicTable from 'components/BasicTable';
import { useFormik } from 'formik';
import schema from 'services/ValidationServices';
import { API } from 'constant';
import { useDispatch } from 'react-redux';
import InventoryActions from 'redux/InventoryRedux';
import LOGGER from 'services/Logger';
import Breadcrumbs from 'components/Breadcrumbs';

const customStyles = {
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px'
  },
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
};

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

const inventoryTypes = ['Perishable', 'Material', 'Product', 'Inventory', 'Fleet'];

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
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      inventoryname: '',
      inventorytype: '',
      widgetname: '',
      policies: false,
      images: []
    },
    validationSchema: schema.addInventory,
    onSubmit: (values, onSubmitProps) => {
      LOGGER.log('values', values);
      dispatch(
        InventoryActions.addInventoryAction({
          loader: 'loading-request',
          slug: API.ADD_INVENTORY,
          method: 'post',
          data: {
            name: values.inventoryname,
            type: values.inventorytype,
            policies: {
              alerting: {
                lowestStockLevel: true,
                highestStockLevel: true,
                alertStockLevel: true,
                reOrderLevel: true
              }
            }
          }
        })
      );
      onSubmitProps.resetForm();
    }
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Inventory Definition' },
          { name: 'Add New/Update Inventory' }
        ]}
      />
      <MDBox px={5} py={5}>
        <form onSubmit={formik.handleSubmit}>
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
                <Box component="div" sx={{ marginBottom: '20px' }}>
                  <Box component="div" sx={customStyles.labelSize}>
                    Inventory Name
                  </Box>
                  <MDInput
                    fullWidth
                    name="inventoryname"
                    type="text"
                    variant="outlined"
                    value={formik.values.inventoryname}
                    error={formik.touched.inventoryname && Boolean(formik.errors.inventoryname)}
                    helpertText={formik.touched.inventoryname && formik.errors.inventoryname}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box component="div" sx={{ marginBottom: '20px' }}>
                  <Box component="div" sx={customStyles.labelSize}>
                    Inventory Type
                  </Box>
                  <Select
                    select
                    fullWidth
                    variant="outlined"
                    name="inventorytype"
                    value={formik.values.inventorytype}
                    error={formik.touched.inventorytype && Boolean(formik.errors.inventorytype)}
                    helperText={formik.touched.inventorytype && formik.errors.inventorytype}
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
                </Box>

                <Grid item xs={12} sm={12} md={12}>
                  <Box component="div" sx={customStyles.labelSize}>
                    Widget Name
                  </Box>
                  <MDInput
                    fullWidth
                    name="widgetname"
                    type="text"
                    variant="outlined"
                    value={formik.values.widgetname}
                    error={formik.touched.widgetname && Boolean(formik.errors.widgetname)}
                    helpertext={formik.touched.widgetname && formik.errors.widgetname}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <MDBox sx={{ my: 4 }}>
                  <MDTypography variant="h5">Policies</MDTypography>
                  <MDTypography sx={customStyles.textSize}>
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
                  <div sx={customStyles.wrap}>
                    {stockBox.map((item) => (
                      <>
                        <div sx={customStyles.gridWrap}>
                          <MDTypography sx={customStyles.textWrap}>{item.text}</MDTypography>
                          <Switch
                            name="policies"
                            checked={formik.values.policies}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <ImageUpload
                  multiple
                  heading="Upload Inventory Images"
                  accept="image/*"
                  images={formik.values.images}
                  setImages={(images) => {
                    formik.setFieldValue('images', images);
                  }}
                />
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
                    <MDButton color="primary" circular="true" sx={customStyles.marginTop}>
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
                <MDButton sx={{ ml: 3 }} color="primary" variant="outlined" type="submit">
                  {'SAVE'}
                </MDButton>
                <MDButton sx={{ ml: 3 }} color="primary">
                  {'ADD ITEMS'}
                </MDButton>
              </MDBox>
            </Grid>
          </MDBox>
        </form>
      </MDBox>
    </DashboardLayout>
  );
}
export default InventoryScreen;
