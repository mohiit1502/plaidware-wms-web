/* eslint-disable indent */
import {
  Box,
  Button,
  // Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  // OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import MDButton from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { WarehouseLocationsSelectors } from 'redux/WarehouseLocationsRedux';
import LOGGER from 'services/Logger';
import { useFormik } from 'formik';
import { getPropertiesOfLocationType } from 'utils/nestedTableTools';
import { getInitialvaluesFromData } from 'utils/nestedTableTools';
import { getColorOfLocationType } from 'utils/nestedTableTools';
import { toTitleCase } from 'utils/nestedTableTools';
import WarehouseLocationsActions from 'redux/WarehouseLocationsRedux';
import { getAPIslugOfLocationType } from 'utils/nestedTableTools';
import { API } from 'constant';

function NestedDataTable({ data, selected, setSelected, populateChildren }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const children = useSelector(WarehouseLocationsSelectors.getChildrenOfParent(data.id));
  const fields = getPropertiesOfLocationType(data.location);
  const formik = useFormik({
    initialValues: getInitialvaluesFromData(data),
    onSubmit: (values /*, { resetForm, setSubmitting }*/) => {
      LOGGER.log('Form values and field info', values, data);
      const formData = { ...values };
      // formData[`${data.location}_id`] = data.id;
      dispatch(
        WarehouseLocationsActions.editLocationRequest({
          loader: 'location-request',
          slug: getAPIslugOfLocationType(data.location) + `/${data.id}`,
          method: 'patch',
          data: formData,
          child: {
            id: data.id,
            parentId: data.parentId,
            type: data.location
          }
        })
      );
      setEditFormOpen(false);
    }
  });

  useEffect(() => {
    populateChildren(data.id, data.location);
  }, []);

  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(null);
  const handleDeleteAlertClose = () => {
    setDeleteAlertOpen(false);
  };
  const handleDeleteAlertOpen = () => {
    setDeleteAlertOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          borderLeftWidth: '2px',
          borderLeftStyle: 'solid',
          borderLeftColor: getColorOfLocationType(data.location),

          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: '#BDD0DB',

          background:
            selected?.id === data.id
              ? 'linear-gradient(135deg, ' +
                getColorOfLocationType(data.location) +
                ' 0%, #f9f9f9 20%)'
              : '#f9f9f9'
        }}
      >
        <Grid container key={data.id}>
          <Grid item xs={3}>
            <IconButton
              disabled={!children?.length}
              aria-label="expand row"
              size="small"
              sx={{ marginLeft: '12px' }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            <MDButton
              size="small"
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'capitalize',
                minWidth: '45px',
                minHeight: '28px',
                marginLeft: '5px',
                marginRight: '20px',
                boxShadow: 'none',
                fontWeight: '500',
                padding: '0'
              }}
              onClick={() => {
                setEditFormOpen(true);
              }}
            >
              EDIT
            </MDButton>
            {data.location}
          </Grid>
          <Grid
            container
            xs
            onClick={() => {
              setSelected(data);
            }}
          >
            <Grid item xs={3}>
              {data.name}
            </Grid>
            <Grid item xs={2}>
              {['row', 'level', 'bay'].includes(data.location) ? data.number : data.type}
            </Grid>
            {data.location === 'bay' ? (
              <Grid item xs={2}>
                {data.type}
              </Grid>
            ) : null}
            <Grid item xs>
              {data.specs}
            </Grid>
            <Grid item xs={1}>
              <MDButton
                size="small"
                variant="contained"
                color="error"
                sx={{
                  textTransform: 'capitalize',
                  minWidth: '45px',
                  minHeight: '28px',
                  marginLeft: '5px',
                  marginRight: '20px',
                  boxShadow: 'none',
                  fontWeight: '500',
                  padding: '0 6'
                }}
                onClick={() => {
                  handleDeleteAlertOpen();
                }}
              >
                DELETE
              </MDButton>
              <Dialog
                open={deleteAlertOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={handleDeleteAlertClose}
              >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleDeleteAlertClose}>
                    No
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(
                        WarehouseLocationsActions.deleteLocationRequest({
                          loader: 'location-request',
                          slug: API.LOCATION_DELETE,
                          method: 'post',
                          data: { type: data.location, id: data.id }
                        })
                      );
                      handleDeleteAlertClose();
                    }}
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
        {open && children ? (
          <Box Box sx={{ marginLeft: '25px', marginBottom: '15px' }}>
            {/* Add headers here */}
            {children.map((data) => (
              <NestedDataTable
                key={data.id}
                data={data}
                selected={selected}
                setSelected={setSelected}
                populateChildren={populateChildren}
              />
            ))}
          </Box>
        ) : null}
      </Box>
      {editFormOpen && (
        <Dialog
          open={editFormOpen}
          onClose={() => {
            setEditFormOpen(false);
          }}
        >
          <DialogTitle>Edit {data.location} details</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>Some more text if needed</DialogContentText> */}
            {fields &&
              fields.map((fieldName) => (
                <TextField
                  autoFocus
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
            {data.location === 'sublevel' ? (
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
                {/* Positions:{' '} */}
                {/* <Select
                  multiple
                  name="positions"
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
                </Select> */}
              </>
            ) : null}
          </DialogContent>
          <DialogActions>
            <MDButton
              onClick={() => {
                setEditFormOpen(false);
              }}
            >
              Cancel
            </MDButton>
            <MDButton onClick={formik.handleSubmit}>Save</MDButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

NestedDataTable.propTypes = {
  data: PropTypes.any,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  populateChildren: PropTypes.any
};

export default NestedDataTable;
