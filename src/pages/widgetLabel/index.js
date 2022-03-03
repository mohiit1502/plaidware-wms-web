import { Box, Grid, TableBody, TableCell, TableRow } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import BasicTable from 'components/BasicTable';
import MDButton from 'components/Button';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import Breadcrumbs from 'components/Breadcrumbs';
import Dropdown from 'components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { InventorySelectors } from 'redux/InventoryRedux';
import WidgetActions from 'redux/WidgetRedux';
import { API } from 'constant';
import MDBox from 'components/MDBox';
import { WidgetSelectors } from 'redux/WidgetRedux';
import ProductActions from 'redux/ProductsRedux';
import { ProductSelectors } from 'redux/ProductsRedux';
import InventoryActions from 'redux/InventoryRedux';
import QRcode from 'components/QRcode';

const useStyles = makeStyles({
  nodataStyle: {
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '600%'
  },
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px'
  },
  customLabel: {
    backgroundColor: '#fff'
  },
  buttondiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '52px 0px'
  }
});

const headCells = [
  {
    id: 'inventory',
    label: 'Inventory'
  },
  {
    id: 'Family',
    label: 'Family'
  },
  {
    id: 'Subfamily',
    label: 'Subfamily'
  },
  {
    id: 'formalName',
    label: 'Name'
  },
  {
    id: 'manufacturer',
    label: 'Manufacture'
  },
  {
    id: 'size',
    label: 'Size'
  },
  {
    id: 'barcode number',
    label: 'Barcode number'
  },
  {
    id: 'Barcode',
    label: 'Barcode'
  }
];
const headCellsNew = [
  {
    id: 'Inventory Name',
    label: 'Inventory Name'
  },
  {
    id: 'formalName',
    label: 'Item Name'
  },
  {
    id: 'description',
    label: 'Item Description'
  },
  {
    id: 'Barcode Number',
    label: 'Barcode Number'
  },
  {
    id: 'Barcode',
    label: 'Barcode'
  }
];

function WidgetLabel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [labelData, setLabelData] = useState([]);
  const [inventoryId, setInventoryId] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [allProductData, setAllProductData] = useState([]);
  const [filterClick, setFilterClick] = useState(false);

  const inventoryData = useSelector(InventorySelectors.getInventoryDetail);
  const familyData = useSelector(WidgetSelectors.getWidgetFamiliesByInventoryId(inventoryId));
  const subFamilyData = useSelector(WidgetSelectors.getWidgetsByParentId(familyId));
  const productData = useSelector(ProductSelectors.getProductDetail);

  React.useEffect(() => {
    dispatch(
      InventoryActions.getInventoryAction({
        loader: 'loading-request',
        slug: API.GET_INVENTORY,
        method: 'get'
      })
    );
  }, []);

  React.useEffect(() => {
    if (productData.result && filterClick) {
      setAllProductData(productData?.result);
    }
  }, [productData, filterClick]);

  const inventoryChange = (event) => {
    const filterData = inventoryData.filter((item) => item.name === event.target.value);
    const id = filterData[0]._id;
    setInventoryId(filterData[0]._id);
    dispatch(
      WidgetActions.widgetRequest({
        loader: 'loading-request',
        slug: `${API.GET_WIDGET_FAMILY_BY_INVENTORY}${id}`,
        method: 'get'
      })
    );
  };

  const familyChange = (event) => {
    const filterData = familyData.filter((item) => item.name === event.target.value);
    const id = filterData[0]._id;
    setFamilyId(filterData[0]._id);
    dispatch(
      WidgetActions.widgetRequest({
        loader: 'loading-request',
        slug: `${API.GET_WIDGET_FAMILY_BY_INVENTORY}${id}`,
        method: 'get'
      })
    );
  };

  const subFamilyChange = (event) => {
    const filterData = subFamilyData.filter((item) => item.name === event.target.value);
    const id = filterData[0]._id;
    dispatch(
      WidgetActions.widgetRequest({
        loader: 'loading-request',
        slug: `${API.GET_WIDGET_FAMILY_BY_INVENTORY}${id}`,
        method: 'get'
      })
    );
  };
  const filterHandler = () => {
    setInventoryId('');
    setFilterClick(true);
    dispatch(
      ProductActions.getProductByIdAction({
        loader: 'loading-request',
        slug: `${API.GET_PRODUCT_BY_ID}${inventoryId}`,
        method: 'get'
      })
    );
  };

  const getTableItem = (e, item) => {
    if (e.target.checked) {
      setLabelData((prev) => [...prev, item]);
    } else {
      const filterData = labelData.filter((item2) => item2._id !== item._id);
      setLabelData(filterData);
    }
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Breadcrumbs
          title="Search And Print Location Labels"
          route={[
            { name: 'Home', path: '/home' },
            { name: 'Setup', path: '/setup' },
            { name: 'Labeling', path: '/setup/labeling' },
            { name: 'Widget Label' }
          ]}
        />
        <MDBox px={5} py={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Dropdown
                dropdownData={inventoryData}
                dropdownChange={inventoryChange}
                label="Select Inventory"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Dropdown
                dropdownData={familyData}
                dropdownChange={familyChange}
                label="Select Family"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Dropdown
                dropdownData={subFamilyData}
                label="Select Sub Family"
                dropdownChange={subFamilyChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MDButton
                color="primary"
                sx={{ minWidth: '100%', marginTop: '50px', padding: '13px 40px' }}
                onClick={() => filterHandler()}
              >
                {'Filter'}
              </MDButton>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: '24px', backgroundColor: '#FFFFFF' }}>
            <BasicTable
              headCells={headCells}
              records={allProductData}
              backgroundColor="#E5E5E5"
              color="#8D8D8D"
            >
              <TableBody>
                {filterClick && allProductData.length ? (
                  allProductData &&
                  allProductData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          {...label}
                          sx={{ marginRight: '2px' }}
                          onChange={(e) => getTableItem(e, item)}
                        />
                        {item?.inventory?.name}
                      </TableCell>
                      <TableCell>{item?.widgetfamily?.name}</TableCell>
                      <TableCell>{item?.location?.sub_levels}</TableCell>
                      <TableCell>{item?.formalName}</TableCell>
                      <TableCell>{item?.manufacturer}</TableCell>
                      <TableCell>{item?.size}</TableCell>
                      <TableCell>{item?._id}</TableCell>
                      <TableCell>
                        <QRcode payload={item._id} width={100} height={100} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className={classes.nodataStyle}>No Data</TableRow>
                )}
              </TableBody>
            </BasicTable>
          </Box>
          <Box sx={{ marginTop: '24px', backgroundColor: '#FFFFFF' }}>
            <BasicTable
              headCells={headCellsNew}
              records={labelData}
              backgroundColor="#E5E5E5"
              color="#8D8D8D"
            >
              <TableBody>
                {labelData &&
                  labelData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item?.inventory?.name}</TableCell>
                      <TableCell>{item.formalName}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>
                        <QRcode payload={item._id} width={100} height={100} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </BasicTable>
          </Box>
          <div className={classes.buttondiv}>
            <MDButton color="primary">{'Print Labels'}</MDButton>
          </div>
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default WidgetLabel;
