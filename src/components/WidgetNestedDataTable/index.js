/* eslint-disable indent */
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import MDButton from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetSelectors } from 'redux/WidgetRedux';
import WidgetActions from 'redux/WidgetRedux';
import { API } from 'constant';
import { useFormik } from 'formik';
import LOGGER from 'services/Logger';

function MaterialForm({ formType, setFormOpen, selected, inventoryId }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues:
      formType === 'family'
        ? { name: '', inventoryId }
        : formType === 'subfamily'
        ? { name: '', inventoryId, parentId: selected._id || '' }
        : { name: formType.name, inventoryId, parentId: formType.parent?._id || undefined },
    onSubmit: (values) => {
      LOGGER.log('Form values and field info', values);
      ['family', 'subfamily'].includes(formType)
        ? dispatch(
            WidgetActions.editWidgetRequest({
              loader: 'location-request',
              slug: API.ADD_WIDGET_FAMILY,
              method: 'post',
              data: values,
              type: 'add'
            })
          )
        : dispatch(
            WidgetActions.editWidgetRequest({
              loader: 'location-request',
              slug: `${API.EDIT_WIDGET_FAMILY}${inventoryId}`,
              method: 'patch',
              data: values,
              type: 'edit'
            })
          );
      setFormOpen(false);
    }
  });

  return (
    <Dialog
      open
      onClose={() => {
        setFormOpen(false);
      }}
    >
      <DialogTitle>
        {['family', 'subfamily'].includes(formType) ? 'Create' : 'Edit'} material{' '}
        {['family', 'subfamily'].includes(formType) ? formType : null}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Some more text if needed</DialogContentText> */}
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Name"
          type="text"
          name="name"
          variant="standard"
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          onChange={formik.handleChange}
        />
      </DialogContent>
      <DialogActions>
        <MDButton
          onClick={() => {
            setFormOpen(false);
          }}
        >
          Cancel
        </MDButton>
        <MDButton onClick={formik.handleSubmit}>Save</MDButton>
      </DialogActions>
    </Dialog>
  );
}

MaterialForm.propTypes = {
  formType: PropTypes.any,
  setFormOpen: PropTypes.any,
  selected: PropTypes.any,
  inventoryId: PropTypes.any
};

function WidgetNestedDataTable({
  data,
  selected,
  setSelected,
  setFormOpen,
  setFormType,
  inventoryId
}) {
  const [open, setOpen] = React.useState(false);
  const widgetChildren = useSelector(WidgetSelectors.getWidgetsByParentId(data._id));

  return (
    <>
      <Box
        sx={{
          borderLeftWidth: '2px',
          borderLeftStyle: 'solid',
          borderLeftColor: '#aedaed',

          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: '#BDD0DB',

          background:
            selected?._id === data._id
              ? 'linear-gradient(135deg, ' + '#aedaed' + ' 0%, #f9f9f9 20%)'
              : '#f9f9f9'
        }}
      >
        <Grid container key={data._id}>
          <Grid item xs={2}>
            <IconButton
              disabled={!widgetChildren?.length}
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
                setFormType(data);
                setFormOpen(true);
              }}
            >
              EDIT
            </MDButton>
          </Grid>
          <Grid
            container
            item
            xs={10}
            onClick={() => {
              setSelected(data);
            }}
          >
            <Grid item xs={9}>
              {data.name}
            </Grid>
            <Grid item xs={1}>
              <MDButton
                disabled
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
                  // dispatch(
                  //   WarehouseLocationsActions.deleteLocationRequest({
                  //     loader: 'location-request',
                  //     slug: API.LOCATION_DELETE,
                  //     method: 'post',
                  //     data: { type: data.location, id: data.id }
                  //   })
                  // );
                }}
              >
                DELETE
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
        {open && widgetChildren ? (
          <Box Box sx={{ marginLeft: '25px', marginBottom: '15px' }}>
            {/* Add headers here */}
            {widgetChildren.map((data) => (
              <WidgetNestedDataTable
                key={data._id}
                data={data}
                selected={selected}
                setSelected={setSelected}
                setFormOpen={setFormOpen}
                setFormType={setFormType}
                inventoryId={inventoryId}
              />
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
}

WidgetNestedDataTable.propTypes = {
  data: PropTypes.any,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  setFormOpen: PropTypes.any,
  setFormType: PropTypes.any,
  inventoryId: PropTypes.any
};

const bottomButtonStyling = {
  width: '200px',
  marginTop: '25px',
  textTransform: 'uppercase',
  borderRadius: '100px',
  padding: '13px 30px'
};

function WidgetNestedDataTableContainer({ inventoryId }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(null);
  const [formType, setFormType] = React.useState('family');
  const [formOpen, setFormOpen] = React.useState(false);
  const widgetFamilyData = useSelector(WidgetSelectors.getWidgetFamiliesByInventoryId(inventoryId));

  useEffect(() => {
    dispatch(
      WidgetActions.widgetRequest({
        loader: 'location-request',
        slug: `${API.GET_WIDGET_FAMILY_BY_INVENTORY}${inventoryId}`,
        method: 'get'
      })
    );
  }, []);

  return (
    <>
      {widgetFamilyData &&
        widgetFamilyData.map((p) => (
          <WidgetNestedDataTable
            key={p._id}
            data={p}
            selected={selected}
            setSelected={setSelected}
            setFormOpen={setFormOpen}
            setFormType={setFormType}
          />
        ))}
      <Grid container spacing={5} justifyContent="center">
        <Grid item>
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            color="primary"
            variant="contained"
            onClick={() => {
              setFormType('family');
              setFormOpen(true);
            }}
          >
            Add Family
          </MDButton>
        </Grid>
        <Grid item>
          <MDButton
            size="medium"
            sx={bottomButtonStyling}
            disabled={selected?.parent}
            color={selected && !selected?.parent ? 'primary' : 'secondary'}
            variant="contained"
            onClick={() => {
              setFormType('subfamily');
              setFormOpen(true);
            }}
          >
            Add SubFamily
          </MDButton>
        </Grid>
      </Grid>
      {/* <pre>{JSON.stringify(selected, null, 4)}</pre> */}

      {formOpen && (
        <MaterialForm
          formType={formType}
          setFormOpen={setFormOpen}
          selected={selected}
          inventoryId={inventoryId}
        />
      )}
    </>
  );
}

WidgetNestedDataTableContainer.propTypes = {
  inventoryId: PropTypes.any
};

export default WidgetNestedDataTableContainer;
