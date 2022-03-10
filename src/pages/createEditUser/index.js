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
import PermissionsActions, { PermissionsSelectors } from 'redux/PermissionsRedux';
// import { AuthSelectors } from 'redux/AuthRedux';
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
import BlankImage from 'assets/images/blank-profile-picture.webp';
import EditIcon from 'assets/images/edit-icon.png';
import Breadcrumbs from 'components/Breadcrumbs';

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
  const actions = useSelector(PermissionsSelectors.getActionsDetail);
  const visibilities = useSelector(PermissionsSelectors.getPermissionsDetail);
  // const currentUser = useSelector(AuthSelectors.getUser);
  const location = useLocation();
  const [editedUser, setEditedUser] = useState(location?.state?.user);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [uploadedImg, setUploadedImg] = useState();
  const [loader, setLoader] = useState();
  // const [selectedPermissions, setSelectedPermissions] = useState({});

  useEffect(() => {
    if (context === 'edit') {
      const editedUser = location?.state?.user;
      if (!editedUser) {
        navigate('/setup/users-access');
      } else {
        setEditedUser(editedUser);
        setSelectedRoles(editedUser.roles);
        editedUser.image_url && setUploadedImg(editedUser.image_url);
      }
    }
  }, []);

  useEffect(() => {
    (!warehouses || warehouses.length === 0) &&
      dispatch(
        WarehouseActions.warehouseDataAction({
          loader: 'loading-request',
          slug: API.GET_WAREHOUSE_DATA,
          method: 'get'
        })
      );
    (!inventories || inventories.length === 0) &&
      dispatch(
        InventoryActions.getInventoryAction({
          loader: 'loading-request',
          slug: API.GET_INVENTORY,
          method: 'get'
        })
      );
    (!roles || roles.length === 0) &&
      dispatch(
        RolesActions.getRolesAction({
          loader: 'loading-request',
          slug: API.GET_ROLES_DATA,
          method: 'get'
        })
      );
    (!visibilities || visibilities.length === 0) &&
      dispatch(
        PermissionsActions.getPermissionsAction({
          loader: 'loading-request',
          slug: API.GET_PERMISSIONS_DATA,
          method: 'get'
        })
      );
    (!actions || actions.length === 0) &&
      dispatch(
        PermissionsActions.getActionsAction({
          loader: 'loading-request',
          slug: API.GET_ACTIONS_DATA,
          method: 'get'
        })
      );
  }, []);

  const formik = useFormik({
    initialValues: context === 'new' ? {
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      roles: '',
      warehouses: '',
      inventories: '',
      actions: '',
      visibilities: '',
      isActive: true,
      image: '',
      createdBy: '',
      createdAt: '',
      updatedBy: '',
      updatedAt: ''
    } : {
      fullName: editedUser ? editedUser.fullName : '',
      phoneNumber: editedUser ? editedUser.phoneNumber : '',
      email: editedUser ? editedUser.email : '',
      password: '',
      roles: editedUser ? editedUser.roles.map(role => role.name).join(', ') : '',
      warehouses: editedUser?.permissions?.warehouseScopes ? editedUser.permissions.warehouseScopes.map(sc => sc.id).join(',') : '',
      inventories: editedUser?.permissions?.inventoryScopes ? editedUser.permissions.inventoryScopes.map(sc => sc.id).join(',') : '',
      actions: editedUser?.permissions?.actions ? editedUser.permissions.actions.join(',') : '',
      visibilities: editedUser?.permissions?.allowedUIModules ? editedUser.permissions.allowedUIModules.join(',') : '',
      isActive: editedUser && editedUser.isActive !== undefined ? editedUser.isActive : true,
      image: editedUser ? editedUser.image_url : EditIcon,
      createdBy: editedUser ? editedUser.createdBy?.fullName : '',
      createdAt: editedUser ? editedUser.createdAt : '',
      updatedBy: editedUser ? editedUser.updatedBy?.fullName : '',
      updatedAt: editedUser ? editedUser.updatedAt : ''
    },
    validationSchema: schema.createUser,
    onSubmit: (values, { setSubmitting }) => {
      const onValidationFailed = () => {
        setLoader(false);
        setSubmitting(false);
      };
      const onSuccessfulSubmission = () => {
        setLoader(false);
        navigate('/setup/users-access');
      };
      const adaptPayload = (values) => {
        const valuesClone = { ...values };
        valuesClone.permissions = {};
        valuesClone.permissions.inventoryScopes = values.inventories
          ? values.inventories.split(',').map((inv) => ({ id: inv, type: 'Inventory' }))
          : [];
        valuesClone.permissions.warehouseScopes = values.warehouses
          ? values.warehouses.split(',').map((wh) => ({ id: wh, type: 'Warehouse' }))
          : [];
        valuesClone.permissions.actions = values.actions ? values.actions.split(',') : [];
        valuesClone.permissions.allowedUIModules = values.visibilities
          ? values.visibilities.split(',')
          : [];
        delete valuesClone.inventories;
        delete valuesClone.warehouses;
        delete valuesClone.actions;
        delete valuesClone.visibilities;
        valuesClone.permissions = JSON.stringify(valuesClone.permissions);
        valuesClone.roles = selectedRoles && selectedRoles.length > 0 ? selectedRoles.map(role => role._id) : [];
        const formData = new FormData();
        Object.keys(valuesClone).forEach(key => formData.append(key, valuesClone[key]));
        uploadedImg && formData.append('image', uploadedImg);
        setLoader(true);
        return formData;
      };
      dispatch(
        UsersActions.createUserAction({
          loader: 'loading-request',
          slug:
            context === 'edit' ? API.UPDATE_USER.replace(':id', editedUser._id) : API.CREATE_USER,
          method: 'post',
          contentType: false,
          processData: false,
          data: adaptPayload(values),
          onValidationFailed,
          onSuccessfulSubmission,
          toastMessage:
            context === 'edit'
              ? 'Updated user __placeholder__successfully'
              : 'Added user __placeholder__successfully'
        })
      );
    }
  });

  const handleMultiSelectChange = (e) => {
    const uniqueRoles = [];
    e.target.value.forEach((role) => {
      const roleIndex = uniqueRoles.findIndex((uRole) => uRole._id === role._id);
      if (roleIndex > -1) {
        uniqueRoles.splice(roleIndex, 1);
      } else {
        uniqueRoles.push(role);
      }
    });
    formik.handleChange('roles')(uniqueRoles.map((role) => role.name).join());
    aggregatePermissions(uniqueRoles);
    setSelectedRoles(uniqueRoles);
  };

  const aggregatePermissions = roles => {
    const actions = [], visibilities = [], warehouses = [], inventories = [];
    roles.forEach(role => {
      if (role.permissions) {
        const currActions = role.permissions.actions;
        const currVisibilities = role.permissions.allowedUIModules;
        const currWarehouseScopes = role.permissions.warehouseScopes;
        const currInventoryScopes = role.permissions.inventoryScopes;
        currActions.forEach(ac => actions.indexOf(ac) === -1 && actions.push(ac));
        currVisibilities.forEach(vi => visibilities.indexOf(vi) === -1 && visibilities.push(vi));
        currWarehouseScopes.forEach(currWh => warehouses.findIndex(wh => wh.id === currWh.id) === -1 && warehouses.push(currWh));
        currInventoryScopes.forEach(currInv => inventories.findIndex(inv => inv.id === currInv.id) === -1 && inventories.push(currInv));
        // setSelectedPermissions({...selectedPermissions, actions});
      }
    });
    formik.handleChange('actions')(actions.join(','));
    formik.handleChange('visibilities')(visibilities.join(','));
    formik.handleChange('warehouses')(warehouses.map(wh => wh.id).join(','));
    formik.handleChange('inventories')(inventories.map(inv => inv.id).join(','));
  };

  const handleFileChange = e => {
    const [file] = e.target.files;
    if (file) {
      setUploadedImg(file);
    }
  };

  return (
    <DashboardLayout className={classes.createEditUserGlobal}>
      <DashboardNavbar />
      <Breadcrumbs
        title="User Details"
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'User Access', path: '/setup/users-access' },
          { name: 'User Details' }
        ]}
      />
      <MDBox component="form" role="form" px={2} className={loader ? " loader" : ""} onSubmit={formik.handleSubmit}>
        <MDBox
          mx={4}
          sx={{
            border: '1px solid #C4C4C4',
            borderRadius: '4px',
            padding: '30px',
            backgroundColor: '#fff'
          }}
        >
          <MDBox sx={{ width: '50%', margin: 'auto' }}>
            <MDBox sx={{ width: '120px', margin: 'auto', position: 'relative' }}>
              <img src={uploadedImg ? typeof uploadedImg === 'string' ? uploadedImg : URL.createObjectURL(uploadedImg) : BlankImage}
                alt='img' width='120' height='120' style={{borderRadius: '50%'}}  onError={() => setUploadedImg(BlankImage)} />
              <MDBox sx={{ position: 'absolute', bottom: '0', right: '0' }}>
                <label htmlFor="image" style={{ cursor: 'pointer' }}>
                  <img src={EditIcon} />
                </label>
                <input id='image' name='image' type="file" className='d-none' accept="image/png, image/gif, image/jpeg"
                  onChange={handleFileChange} />
              </MDBox>
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                User Name
              </Box>
              <MDInput
                fullWidth
                value={formik.values.fullName}
                name="fullName"
                type="text"
                variant="outlined"
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                onChange={formik.handleChange}
              />
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                Email
              </Box>
              <MDInput
                fullWidth
                disabled={context === 'edit'}
                value={formik.values.email}
                name="email"
                type="email"
                variant="outlined"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
              />
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                Password
              </Box>
              <MDInput
                fullWidth
                value={formik.values.password}
                name="password"
                type="password"
                variant="outlined"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
              />
            </MDBox>
            <MDBox sx={{ marginBottom: '24px' }}>
              <Box component="div" sx={{}} className={classes.labelSize}>
                Phone Number
              </Box>
              <MDInput
                fullWidth
                value={formik.values.phoneNumber}
                name="phoneNumber"
                type="text"
                variant="outlined"
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                onChange={formik.handleChange}
              />
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
                    name="roles"
                    value={selectedRoles}
                    input={<OutlinedInput />}
                    error={formik.touched.roles && Boolean(formik.errors.roles)}
                    renderValue={() =>
                      selectedRoles?.length === 0
                        ? 'Please select a role'
                        : selectedRoles?.map((role) => role.name).join(', ')
                    }
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ width: '100%' }}
                    onChange={handleMultiSelectChange}
                  >
                    {roles &&
                      roles.map((role, key) => (
                        <MenuItem key={key} value={role}>
                          {role.name}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '30%',
                    paddingRight: '1rem',
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
                    <Switch
                      name="isActive"
                      checked={formik.values.isActive}
                      onChange={formik.handleChange}
                    />
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
                    <MDInput
                      fullWidth
                      disabled
                      name="createdBy"
                      type="text"
                      value={formik.values.createdBy}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Date &amp; Time
                    </Box>
                    <DateTimeInput disabled name='createdAt' value={new Date(formik.values.createdAt)} />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Last Updated by
                    </Box>
                    <MDInput
                      fullWidth
                      disabled
                      name="updatedBy"
                      type="text"
                      value={formik.values.updatedBy}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box component="div" className={classes.labelSize}>
                      Date &amp; Time
                    </Box>
                    <DateTimeInput disabled name='updatedAt' value={new Date(formik.values.updatedAt)} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Grid container spacing={4} sx={{ marginTop: '-6px' }}>
          <AllocationManager
            allDisabled={selectedRoles?.length > 0}
            name="warehouses"
            gridStyleOverride={{ paddingLeft: '4rem !important' }}
            allocatedList={formik.values.warehouses}
            list={warehouses}
            matchProp={{ a: '_id' }}
            title="Warehouse"
            onChange={val => {
              val = val?.map(obj => obj._id).join(',');
              // setSelectedPermissions({...selectedPermissions, warehouses: val});
              formik.handleChange('warehouses')(val);
            }}
          />
          <AllocationManager
            allDisabled={selectedRoles?.length > 0}
            name="inventories"
            gridStyleOverride={{ paddingRight: '2rem' }}
            allocatedList={formik.values.inventories}
            list={inventories}
            matchProp={{ a: '_id' }}
            title="Inventory"
            onChange={val => {
              val = val?.map(obj => obj._id).join(',');
              // setSelectedPermissions({...selectedPermissions, inventories: val});
              formik.handleChange('inventories')(val);
            }}
          />
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: '12px'}}>
          <Toggles
            allDisabled={selectedRoles?.length > 0}
            name="actions"
            gridStyleOverride={{ paddingLeft: '4rem !important' }}
            title="Actions"
            toggles={actions}
            selectedToggles={formik.values.actions}
            onChange={val => {
              val = Object.keys(val).join(',');
              // setSelectedPermissions({...selectedPermissions, actions: val});
              formik.handleChange('actions')(val);
            }}
          />
          <Toggles
            allDisabled={selectedRoles?.length > 0}
            name="visibilities"
            gridStyleOverride={{ paddingRight: '2rem' }}
            title="Application"
            toggles={visibilities}
            selectedToggles={formik.values.visibilities}
            onChange={val => {
              val = Object.keys(val).join(',');
              // setSelectedPermissions({...selectedPermissions, visibilities: val});
              formik.handleChange('visibilities')(val);
            }}
          />
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
            onClick={() => navigate('/setup/users-access')}
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
