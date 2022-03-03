import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import Dropdown from 'components/Dropdown';
import { Box, Checkbox, Grid, TableBody, TableCell, TableRow } from '@mui/material';
import MDButton from 'components/Button';
import Breadcrumbs from 'components/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { LabellingSelectors } from 'redux/LabellingRedux';
import { WarehouseSelectors } from 'redux/WarehouseRedux';
import { WarehouseLocationsSelectors } from 'redux/WarehouseLocationsRedux';
import WarehouseActions from 'redux/WarehouseRedux';
import { API } from 'constant';
import WarehouseLocationsActions from 'redux/WarehouseLocationsRedux';
import LabellingActions from 'redux/LabellingRedux';
import BasicTable from 'components/BasicTable';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const useStyles = makeStyles({
  nodataStyle: {
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300%'
  },
  iconSize: {
    width: '50%',
    height: '50%',
    marginBottom: '10px'
  },
  margin: {
    margin: '20px'
  },
  buttondiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px'
  }
});

function LabelingScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [zoneId, setZoneId] = useState('');
  const [areaId, setAreaId] = useState('');
  const [rowId, setRowId] = useState('');
  const [bayId, setBayId] = useState('');
  const [allLabelData, setAllLabelData] = useState([]);
  const [totemLabelData, setTotemLabelData] = useState([]);
  const [locationLabelData, setLocationLabelData] = useState([]);

  const warehouseData = useSelector(WarehouseSelectors.getWarehouseDetail);
  const zonedata = useSelector(WarehouseLocationsSelectors.getChildrenOfParent(zoneId));
  const areadata = useSelector(WarehouseLocationsSelectors.getChildrenOfParent(areaId));
  const rowdata = useSelector(WarehouseLocationsSelectors.getChildrenOfParent(rowId));
  const labelData = useSelector(LabellingSelectors.getLabelDetail);

  React.useEffect(() => {
    if (labelData && zoneId && areaId && rowId && bayId) {
      setAllLabelData(labelData);
    }
  }, [labelData, zoneId, areaId, rowId]);

  const headCells = [
    {
      id: 'warehouse',
      label: 'Warehouse'
    },
    {
      id: 'zone',
      label: 'Zone'
    },
    {
      id: 'area',
      label: 'Area'
    },
    {
      id: 'row',
      label: 'Row'
    },
    {
      id: 'bay',
      label: 'Bay'
    }
  ];

  useEffect(() => {
    dispatch(
      WarehouseActions.warehouseDataAction({
        loader: 'loading-request',
        slug: API.GET_WAREHOUSE_DATA,
        method: 'get'
      })
    );
  }, []);

  const warehouseChange = (event) => {
    const filterData = warehouseData.filter((item) => item.name === event.target.value);
    const id = filterData[0]._id;
    const type = 'warehouse';
    setZoneId(id);
    dispatch(
      WarehouseLocationsActions.locationRequest({
        loader: 'loading-request',
        slug: API.GET_CHILDREN_FROM_PARENT,
        method: 'post',
        data: { id, type }
      })
    );
  };

  const zoneChange = (event) => {
    const filterData = zonedata.filter((item) => item.name === event.target.value);
    const id = filterData[0]._id;
    const type = filterData[0].location;
    setAreaId(id);
    dispatch(
      WarehouseLocationsActions.locationRequest({
        loader: 'loading-request',
        slug: API.GET_CHILDREN_FROM_PARENT,
        method: 'post',
        data: { id, type }
      })
    );
  };

  const areaChange = (event) => {
    const filterData = areadata.filter((item) => item.name === event.target.value);
    const id = filterData[0]._id;
    const type = filterData[0].location;
    setRowId(id);
    dispatch(
      WarehouseLocationsActions.locationRequest({
        loader: 'loading-request',
        slug: API.GET_CHILDREN_FROM_PARENT,
        method: 'post',
        data: { id, type }
      })
    );
  };

  const rowChange = (event) => {
    const filterData = rowdata.filter((item) => item.name === event.target.value);
    const id = filterData[0]._id;
    const type = filterData[0].location;
    setBayId(id);
    dispatch(
      WarehouseLocationsActions.locationRequest({
        loader: 'loading-request',
        slug: API.GET_CHILDREN_FROM_PARENT,
        method: 'post',
        data: { id, type }
      })
    );
    dispatch(
      LabellingActions.getLabelAction({
        loader: 'labelling-request',
        slug: API.GET_LABEL,
        method: 'post',
        data: {
          warehouse: zoneId,
          zone: areaId,
          area: rowId,
          row: bayId
        }
      })
    );
  };

  const getTableItem = (e, item) => {
    if (e.target.checked) {
      setTotemLabelData((prev) => [...prev, item.totem_label]);
      setLocationLabelData((prev) => [...prev, item.location_data]);
    } else {
      const filterData = allLabelData.filter((item2) => item2.bay._id !== item.bay._id);
      setTotemLabelData(filterData);
      setLocationLabelData(filterData);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Labeling', path: '/setup/labeling' },
          { name: 'Location Label' }
        ]}
      />
      <MDBox px={5} py={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Dropdown
              dropdownData={warehouseData}
              dropdownChange={warehouseChange}
              label="Select warehouse"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Dropdown dropdownData={zonedata} dropdownChange={zoneChange} label="Select Zone" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Dropdown dropdownData={areadata} dropdownChange={areaChange} label="Select Area" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Dropdown dropdownData={rowdata} dropdownChange={rowChange} label="Select Row" />
          </Grid>
        </Grid>
        <br />
        <BasicTable
          headCells={headCells}
          records={allLabelData}
          backgroundColor="#E5E5E5"
          color="#8D8D8D"
        >
          <TableBody>
            {bayId ? (
              allLabelData &&
              allLabelData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Checkbox
                      {...label}
                      sx={{ marginRight: '2px' }}
                      onChange={(e) => getTableItem(e, item)}
                    />
                    {item?.warehouse?.name}
                  </TableCell>
                  <TableCell>{item?.zone?.name}</TableCell>
                  <TableCell>{item?.row?.name}</TableCell>
                  <TableCell>{item?.area?.name}</TableCell>
                  <TableCell>{item?.bay?.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={classes.nodataStyle}>No Data</TableRow>
            )}
          </TableBody>
        </BasicTable>
        <Grid container spacing={2} py={5}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ backgroundColor: '#FFBC26', padding: '3px 12px' }}>Bay Totem Labels</Box>
            <Box sx={{ border: '1px solid black', padding: '3px 12px', height: '300px' }}>
              {totemLabelData && totemLabelData.map((item, index) => <div key={index}>{item}</div>)}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ backgroundColor: '#FFBC26', padding: '3px 12px' }}>Bin Location Labels</Box>
            <Box sx={{ border: '1px solid black', padding: '3px 12px', height: '300px' }}>
              {locationLabelData &&
                locationLabelData.map((item, index) => (
                  <div key={index}>
                    {item.map((data, index) => (
                      <div key={index}>{data.label}</div>
                    ))}
                  </div>
                ))}
            </Box>
          </Grid>
        </Grid>
        <div className={classes.buttondiv}>
          <MDButton color="primary">{'Print Labels'}</MDButton>
        </div>
      </MDBox>
    </DashboardLayout>
  );
}
export default LabelingScreen;
