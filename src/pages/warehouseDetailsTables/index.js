import React from 'react';
import PropTypes from 'prop-types';
import MDButton from 'components/Button';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import NestedDataTable from 'components/NestedTable';
import { useDispatch, useSelector } from 'react-redux';
import WarehouseLocationsActions from 'redux/WarehouseLocationsRedux';
import { API } from 'constant';
import { WarehouseLocationsSelectors } from 'redux/WarehouseLocationsRedux';
import LOGGER from 'services/Logger';
import { getPropertiesOfLocationType } from 'utils/nestedTableTools';
import { useFormik } from 'formik';
import { getInitialvaluesFromParentData } from 'utils/nestedTableTools';
import { toTitleCase } from 'utils/nestedTableTools';
import { getChildLocationType } from 'utils/nestedTableTools';
import { getAPIslugOfLocationType } from 'utils/nestedTableTools';
import { useParams } from 'react-router-dom';

const bottomButtonStyling = {
  width: '100%',
  textTransform: 'uppercase',
  borderRadius: '100px',
  padding: '13px 30px'
};

const AddForm = ({ addFormOpen, setAddFormOpen, selected, warehouseId }) => {
  const dispatch = useDispatch();
  const data = addFormOpen !== 'zone' ? selected : { location: 'warehouse', parentId: warehouseId };

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
      <DashboardLayout>
        <DashboardNavbar />
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
      </DashboardLayout>
    </>
  );
};

export default WarehouseNestedDetails;
