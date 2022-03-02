/* eslint-disable indent */
import React from 'react';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import Breadcrumbs from 'components/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import ItemActions from 'redux/ItemRedux';
import { API } from 'constant';
import { useParams } from 'react-router-dom';
import LOGGER from 'services/Logger';
import { ItemSelectors } from 'redux/ItemRedux';
import EnhancedTable from 'components/EnhancedTable';
import { useNavigate } from 'react-router-dom';
import WidgetActions from 'redux/WidgetRedux';
import { WidgetSelectors } from 'redux/WidgetRedux';
import { DialogContent, DialogContentText, DialogTitle, MenuItem, Select } from '@mui/material';

const tHeads = [
  { key: 'name', name: '' },
  { key: 'commonName', name: 'Common Name' },
  { key: 'formalName', name: 'Formal Name' },
  { key: 'description', name: 'Description' },
  { key: 'manufacturer', name: 'Manufacturer' },
  { key: 'size', name: 'Size' },
  { key: 'color', name: 'Color' },
  { key: 'type', name: 'Type' },
  { key: 'unitOfMaterial', name: 'Unit of Material' },
  { key: 'unitCost', name: 'Unit Cost' },
  { key: 'packageCount', name: 'Package Count' },
  { key: 'countPerPallet', name: 'Count Per Pallet' },
  { key: 'countPerPalletPackage', name: 'Count Per Pallet Package' },
  { key: 'location', name: 'Location' },
  { key: 'totalQuantity', name: 'Total Quantity' },
  { key: 'reservedQuantity', name: 'Reserved Quantity' },
  { key: 'availableQuantity', name: 'Available Quantity' }
];

function ItemListing() {
  const dispatch = useDispatch();
  const { widgetName, inventoryId } = useParams();
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  LOGGER.log({ widgetName, inventoryId });

  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  const data = useSelector(ItemSelectors.getItems);
  const count = useSelector(ItemSelectors.getItemsCount);

  const [pFam, setPFam] = React.useState('');
  const [sFam, setSFam] = React.useState('');
  const primaryFamilies = useSelector(WidgetSelectors.getWidgetFamiliesByInventoryId(inventoryId));
  const secondaryFamilies = useSelector(WidgetSelectors.getWidgetsByParentId(pFam));

  React.useEffect(() => {
    dispatch(
      ItemActions.itemRequest({
        loader: 'loading-request',
        slug: API.GET_ITEMS_BY_INVENTORY,
        method: 'get',
        page: page - 1,
        perPage,
        inventoryId,
        family: sFam || pFam || null
      })
    );
  }, [page, perPage, pFam, sFam]);

  React.useEffect(() => {
    dispatch(
      WidgetActions.widgetRequest({
        loader: 'location-request',
        slug: `${API.GET_WIDGET_FAMILY_BY_INVENTORY}${inventoryId}`,
        method: 'get'
      })
    );
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Inventory', path: '/setup/inventory' },
          { name: `${widgetName}s List` }
        ]}
      />

      <MDBox px={2} py={3}>
        List of {widgetName}s{/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        <EnhancedTable
          count={count}
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          editHandler={(id) => {
            navigateTo(`/setup/inventory/browse/${widgetName}/${inventoryId}/edit/${id}`);
          }}
          resetFilters={() => {
            setPFam('');
            setSFam('');
          }}
          filtersControl={
            <>
              <DialogTitle>Add filters</DialogTitle>
              <DialogContent>
                <DialogContentText>Filter by family</DialogContentText>
                <Select
                  select
                  fullWidth
                  variant="outlined"
                  value={pFam}
                  onChange={(e) => {
                    setSFam('');
                    setPFam(e.target.value);
                  }}
                >
                  <MenuItem key={'none'} value={''}>
                    None Selected
                  </MenuItem>
                  {primaryFamilies &&
                    primaryFamilies.map((fam) => (
                      <MenuItem key={fam._id} value={fam._id}>
                        {fam.name}
                      </MenuItem>
                    ))}
                </Select>
                <Select
                  select
                  fullWidth
                  variant="outlined"
                  value={sFam}
                  onChange={(e) => {
                    setSFam(e.target.value);
                  }}
                >
                  <MenuItem key={'none'} value={''}>
                    None Selected
                  </MenuItem>
                  {secondaryFamilies &&
                    secondaryFamilies.map((fam) => (
                      <MenuItem key={fam._id} value={fam._id}>
                        {fam.name}
                      </MenuItem>
                    ))}
                </Select>
              </DialogContent>
            </>
          }
          data={
            data
              ? data.map((item) => {
                  return {
                    name: item._id,
                    commonName: item.commonName,
                    formalName: item.formalName,
                    description: item.description,
                    manufacturer: item.manufacturer,
                    size: item.size,
                    color: item.color,
                    type: item.type,
                    unitOfMaterial: item.unitOfMaterial,
                    unitCost: item.unitCost,
                    packageCount: item.packageCount,
                    countPerPallet: item.countPerPallet,
                    countPerPalletPackage: item.countPerPalletPackage,
                    location: `SubLevel-${item.location.name}`,
                    totalQuantity: item.totalQuantity,
                    reservedQuantity: item.reservedQuantity,
                    availableQuantity: item.availableQuantity
                  };
                })
              : []
          }
          tHeads={tHeads}
        />
      </MDBox>
    </DashboardLayout>
  );
}
export default ItemListing;
