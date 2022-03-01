import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import WarehouseActions, { WarehouseSelectors } from 'redux/WarehouseRedux';
import InventoryActions, { InventorySelectors } from 'redux/InventoryRedux';
import RolesActions, { RolesSelectors } from 'redux/RolesRedux';
import { AuthSelectors } from 'redux/AuthRedux';
import UsersActions from 'redux/UsersRedux';

import schema from 'services/ValidationServices';

import MDBox from 'components/MDBox';
import Switch from 'components/Switch';
import DashboardNavbar from 'components/DashboardNavbar';
import { AllocationManager, Toggles } from 'components';
import DashboardLayout from 'layouts/DashboardLayout';
import MDButton from 'components/Button';
import DateTimeInput from 'components/DateTimePicker';
import MDInput from 'components/MDInput';

import { API } from 'constant';
import UserIcon from 'assets/images/userIcon.png';
import EditIcon from 'assets/images/edit-icon.png';

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
  createEditUserGlobal: {
    '& legend': {
      width: 0
    }
  }
}));

/* eslint-disable complexity */
function CreateEditUser(props) {
  const { context } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector(RolesSelectors.getRolesDetail);
  const warehouses = useSelector(WarehouseSelectors.getWarehouseDetail);
  const inventories = useSelector(InventorySelectors.getInventoryDetail);
  const currentUser = useSelector(AuthSelectors.getUser);
  const location = useLocation();
  const [editedUser, setEditedUser] = useState();
  const [userRoles, setUserRoles] = useState([]);

  const formik = useFormik({
    initialValues: {
      fullName: editedUser ? editedUser.fullName : '',
      phoneNumber: editedUser ? editedUser.phoneNumber : '',
      roles: userRoles,
      permissions: {},
      isActive: editedUser && editedUser.isActive !== undefined ? editedUser.isActive : true,
      createdBy: context === 'new' ? currentUser ? currentUser.fullName : '' : editedUser ? editedUser.createdBy?.fullName : '',
      createdOn: new Date(),
      updatedBy: context === 'new' ? currentUser ? currentUser.fullName : '' : editedUser ? editedUser.updatedBy?.fullName : '',
      updatedOn: new Date()
    },
    validationSchema: schema.createUser,
    onSubmit: (values, { setSubmitting }) =>
    {
      const onValidationFailed = () => {
        setSubmitting(false);
      };

      // const onSuccessfulSubmission = data => {
      const onSuccessfulSubmission = () => {
        navigate('/setup/users-access');
        // TODO
        // dispatchAlert
      };
      values.roles = values.roles && values.roles.length > 0 ? values.roles.map(role => role._id) : [];
      dispatch(
        UsersActions.createUserAction({
          loader: 'loading-request',
          slug: API.CREATE_USER,
          method: 'post',
          data: values,
          onValidationFailed,
          onSuccessfulSubmission
        })
      );
    }
  });

  useEffect(() => {
    if (context === 'edit') {
      const editedUser = location?.state?.user;
      if (!editedUser) {
        navigate('/setup/users-access');
      } else {
        setEditedUser(editedUser);
        setUserRoles(editedUser.role_name ? editedUser.role_name.split(',') : []);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(WarehouseActions.warehouseDataAction({loader: 'loading-request', slug: API.GET_WAREHOUSE_DATA,method: 'get'}));
    dispatch(InventoryActions.getInventoryAction({loader: 'loading-request', slug: API.GET_INVENTORY,method: 'get'}));
    !roles || roles.length === 0 && dispatch(RolesActions.getRolesAction({loader: 'loading-request', slug: API.GET_ROLES_DATA, method: 'get'}));
    dispatch(RolesActions.getRolesAction({loader: 'loading-request', slug: API.GET_ROLES_DATA, method: 'get'}));
    dispatch(PermissionActions.getRolesAction({loader: 'loading-request', slug: API.GET_ROLES_DATA, method: 'get'}));
    fetchPermissions();
    fetchActions();
  }, []);


  const handleChange = event => {
    const value = typeof event.target.value === 'string' ? event.target.value?.split(',') : event.target.value;
    setUserRoles(value);
    formik.handleChange(event);
  };

  return (
    <DashboardLayout className={classes.createEditUserGlobal}>
      <DashboardNavbar />
      <MDBox component='form' role='form' px={2} sx={{ backgroundColor: '#fff' }} onSubmit={formik.handleSubmit}>
        <MDBox mx={4} sx={{ border: '1px solid #C4C4C4', borderRadius: '4px', padding: '30px' }}>
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
              <MDInput fullWidth disabled={context === 'edit'} value={formik.values.fullName} name="fullName" type="text"
                variant="outlined" error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName} onChange={formik.handleChange} />
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                Phone Number
              </Box>
              <MDInput fullWidth value={formik.values.phoneNumber} name="phoneNumber" type="text"
                variant="outlined" error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber} onChange={formik.handleChange} />
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
                    name='roles'
                    value={userRoles}
                    input={<OutlinedInput />}
                    error={formik.touched.roles && Boolean(formik.errors.roles)}
                    renderValue={() => {
                      if (userRoles.length === 0) {
                        return 'Please select a role';
                      }

                      return userRoles.map(role => role.name).join(',');
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      width: '100%'
                    }}
                    onChange={handleChange}
                  >
                    {roles && roles.map((role, key) => <MenuItem key={key} value={role}>{role.name}</MenuItem>)}
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
                    <Switch checked={formik.values.isActive} />
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
                    <MDInput fullWidth disabled name="warehousename" type="text" value={currentUser ? currentUser.fullName : ''} variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Date &amp; Time
                    </Box>
                    <DateTimeInput disabled />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Last Updated by
                    </Box>
                    <MDInput fullWidth disabled name="warehousename" type="text" value={currentUser ? currentUser.fullName : ''} variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Date &amp; Time
                    </Box>
                    <DateTimeInput disabled />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Grid container spacing={4} sx={{ marginTop: '-6px' }}>
          <AllocationManager gridStyleOverride={{ paddingLeft: '4rem !important' }} list={warehouses} title='Warehouse' />
          <AllocationManager gridStyleOverride={{ paddingRight: '2rem' }} list={inventories} title='Inventory' />
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '12px', paddingLeft: '2rem' }}>
          <Toggles title='Actions' />
          <Toggles title='Application' />
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
            type="button"
            sx={{ marginRight: '15px' }}
          >
            Cancel
          </MDButton>
          <MDButton size="medium" color="primary" variant="contained" type="submit">
            {context === 'new' ? 'Create' : 'Save'}
          </MDButton>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

CreateEditUser.propTypes = {
  context: PropTypes.string
};

export default CreateEditUser;
