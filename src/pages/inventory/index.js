import React from 'react';
import PropTypes from 'prop-types';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  useRadioGroup,
  Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MDInput from 'components/MDInput';
import Switch from 'components/Switch';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import MDButton from 'components/Button';
import { useFormik } from 'formik';
import schema from 'services/ValidationServices';
import { API } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import InventoryActions from 'redux/InventoryRedux';
import LOGGER from 'services/Logger';
import Breadcrumbs from 'components/Breadcrumbs';
import { useParams } from 'react-router-dom';
import { InventorySelectors } from 'redux/InventoryRedux';
import { useNavigate } from 'react-router-dom';
import WidgetNestedDataTable from 'components/WidgetNestedDataTable';
import { GetIconFromSlug } from 'utils/inventorySlugTools';
import { iconSlugs } from 'utils/inventorySlugTools';

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

const definedPolicies = [
  {
    text: 'Order Tracking',
    key: 'orderTracking'
  },
  {
    text: 'Replenishment',
    key: 'replenishment'
  },
  {
    text: 'Alerting',
    key: 'alerting'
  }
  // {
  //   text: 'Location',
  //   key: 'preferredLocations'
  // }
];

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      border: `1px solid ${theme.palette.primary.light}`,
      borderRadius: '10px'
    }
  })
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
}
MyFormControlLabel.propTypes = {
  value: PropTypes.any
};

function InventoryScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inventoryId } = useParams();

  const navigateTo = () => {
    navigate('/setup/inventory');
  };

  const currentInventoryData = useSelector(InventorySelectors.getInventoryDetailById(inventoryId));
  LOGGER.log({ currentInventoryData });
  // const [inventoryAllData, setInventoryAllData] = useState([]);
  // const initialInventoryName='';

  // useEffect(() => {
  //     const filterData = inventoryData.filter((item) => item._id === inventoryId);
  //     console.log('filterData', filterData);
  //     setInitialInventoryName(filterData[0].name)
  //     setInventoryAllData(filterData[0].widgetName);
  // }, []);

  // LOGGER.log('initialInventoryName', initialInventoryName);

  /* eslint-disable indent */
  const formik = useFormik({
    initialValues: inventoryId
      ? {
          name: currentInventoryData.name,
          widgetName: currentInventoryData.widgetName,
          icon_slug: currentInventoryData.icon_slug,
          policies: {
            orderTracking: currentInventoryData.policies.orderTracking,
            alerting: currentInventoryData.policies.alerting,
            replenishment: currentInventoryData.policies.replenishment,
            preferredLocations: false, // TODO: change later when implemented on BE
            inventory_process: currentInventoryData.policies.inventory_process
          }
        }
      : {
          name: '',
          widgetName: '',
          icon_slug: '',
          policies: {
            orderTracking: false,
            alerting: false,
            replenishment: false,
            preferredLocations: false, // TODO: change later
            inventory_process: 'CCR'
          }
        },
    validationSchema: schema.addInventory,
    onSubmit: (values) => {
      LOGGER.log('values', values);
      inventoryId
        ? dispatch(
            InventoryActions.updateInventoryAction({
              loader: 'loading-request',
              slug: `${API.ADD_INVENTORY}/${inventoryId}`,
              method: 'patch',
              navigateTo,
              data: {
                ...values,
                icon_slug: values.icon_slug
              }
            })
          )
        : dispatch(
            InventoryActions.addInventoryAction({
              loader: 'loading-request',
              slug: API.ADD_INVENTORY,
              method: 'post',
              navigateTo,
              data: {
                ...values,
                icon_slug: values.icon_slug
              }
            })
          );
    }
  });

  LOGGER.log('Form values', formik.values);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        title="Inventory Details"
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Inventory', path: '/setup/inventory' },
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
                    name="name"
                    type="text"
                    variant="outlined"
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helpertText={formik.touched.name && formik.errors.name}
                    onChange={formik.handleChange}
                  />
                </Box>

                <Grid item xs={12}>
                  <Box component="div" sx={customStyles.labelSize}>
                    Widget Name
                  </Box>
                  <MDInput
                    fullWidth
                    name="widgetName"
                    type="text"
                    variant="outlined"
                    value={formik.values.widgetName}
                    error={formik.touched.widgetName && Boolean(formik.errors.widgetName)}
                    helpertext={formik.touched.widgetName && formik.errors.widgetName}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <MDBox sx={{ my: 4 }}>
                  <MDTypography variant="h5">Policies</MDTypography>
                  <MDTypography sx={customStyles.textSize}>
                    Choose policies to be applied
                  </MDTypography>
                </MDBox>
                <MDBox
                  mr={{ xs: 0, xl: 8 }}
                  sx={{
                    width: '60%',
                    padding: '12.5px 10px',
                    backgroundColor: '#fff',
                    border: 'solid 0.5px #c4c4c4',
                    borderRadius: '4px',
                    my: 5
                  }}
                >
                  <div sx={customStyles.wrap}>
                    {definedPolicies.map((item) => (
                      <div sx={customStyles.gridWrap} key={item.key}>
                        <MDTypography sx={customStyles.textWrap}>{item.text}</MDTypography>
                        <Switch
                          name={`policies.${item.key}`}
                          checked={formik.values.policies[item.key]}
                          onChange={formik.handleChange}
                        />
                      </div>
                    ))}
                    <Box component="div" sx={{ marginBottom: '20px' }}>
                      <Box component="div" sx={customStyles.labelSize}>
                        Inventory Process
                      </Box>
                      <Select
                        select
                        fullWidth
                        variant="outlined"
                        name="policies.inventory_process"
                        value={formik.values.policies.inventory_process}
                        onChange={formik.handleChange}
                      >
                        <MenuItem key="CCR" value="CCR">
                          CCR
                        </MenuItem>
                        <MenuItem key="PPR" value="PPR">
                          PPR
                        </MenuItem>
                      </Select>
                    </Box>
                  </div>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box
                  sx={{
                    width: 400,
                    height: 300,
                    padding: '20px',
                    border: '1px solid #D2D6DA'
                  }}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-error-radios"
                    name="icon_slug"
                    value={formik.values.icon_slug}
                    onChange={formik.handleChange}
                  >
                    {iconSlugs.map((iconSlug) => (
                      <MyFormControlLabel
                        key={iconSlug}
                        value={iconSlug}
                        control={<Radio style={{ display: 'none' }} />}
                        label={GetIconFromSlug(iconSlug)}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              </Grid>
              <MDBox sx={{ ml: 'auto', mr: 'auto', mt: 3 }}>
                <MDButton
                  sx={{ ml: 3 }}
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    navigate('/setup/inventory');
                  }}
                >
                  {'CLOSE'}
                </MDButton>
                <MDButton sx={{ ml: 3 }} color="primary" variant="outlined" type="submit">
                  {'SAVE'}
                </MDButton>
                {/* <MDButton
                  sx={{ ml: 3 }}
                  color="primary"
                  onClick={() => {
                    navigate(
                      `/setup/inventory/new-item/${currentInventoryData.widgetName}/${inventoryId}`
                    );
                  }}
                >
                  {'ADD ITEMS'}
                </MDButton> */}
              </MDBox>
            </Grid>
          </MDBox>
        </form>
        {inventoryId ? (
          <>
            <MDBox sx={{ my: 4 }}>
              <MDTypography variant="h5">Widget family hierarchy</MDTypography>
              <MDTypography sx={customStyles.textSize}>
                Define widget family and sub-family
              </MDTypography>
            </MDBox>
            <WidgetNestedDataTable inventoryId={inventoryId} />
          </>
        ) : null}
      </MDBox>
    </DashboardLayout>
  );
}
export default InventoryScreen;
