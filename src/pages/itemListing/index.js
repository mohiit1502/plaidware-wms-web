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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select
} from '@mui/material';

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
  { key: 'countPerPalletPackage', name: 'Count Per Pallet Package' }
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

  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(null);
  const handleDeleteAlertClose = () => {
    setDeleteAlertOpen(null);
  };
  const handleDeleteAlertOpen = (id) => {
    setDeleteAlertOpen(id);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        title={`List of ${widgetName}s`}
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Inventory', path: '/setup/inventory' },
          { name: `${widgetName}s List` }
        ]}
      />

      <MDBox px={5} py={3}>
        <Dialog
          open={deleteAlertOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={handleDeleteAlertClose}
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDeleteAlertClose}>
              No
            </Button>
            <Button
              onClick={() => {
                const refreshDispatch = () => {
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
                };
                dispatch(
                  ItemActions.deleteItemRequest({
                    loader: 'loading-request',
                    slug: '/item/',
                    method: 'delete',
                    itemId: deleteAlertOpen,
                    refreshDispatch
                  })
                );
                handleDeleteAlertClose();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <EnhancedTable
          count={count}
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          editHandler={(id) => {
            navigateTo(`/setup/inventory/browse/${widgetName}/${inventoryId}/edit/${id}`);
          }}
          deleteHandler={(id) => {
            handleDeleteAlertOpen(id);
          }}
          resetFilters={() => {
            setPFam('');
            setSFam('');
          }}
          filtersControl={
            <>
              <Grid item sx={4}>
                <Select
                  select
                  variant="outlined"
                  value={pFam}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    width: 200
                  }}
                  onChange={(e) => {
                    setSFam('');
                    setPFam(e.target.value);
                  }}
                >
                  <MenuItem key={'none'} value={''}>
                    Widget family L1
                  </MenuItem>
                  {primaryFamilies &&
                    primaryFamilies.map((fam) => (
                      <MenuItem key={fam._id} value={fam._id}>
                        {fam.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item sx={4}>
                <Select
                  select
                  fullWidth
                  variant="outlined"
                  value={sFam}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    width: 200
                  }}
                  onChange={(e) => {
                    setSFam(e.target.value);
                  }}
                >
                  <MenuItem key={'none'} value={''}>
                    Widget family L2
                  </MenuItem>
                  {secondaryFamilies &&
                    secondaryFamilies.map((fam) => (
                      <MenuItem key={fam._id} value={fam._id}>
                        {fam.name}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </>
          }
          data={
            data
              ? data.map((item) => {
                  return {
                    _id: item._id,
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
                    countPerPalletPackage: item.countPerPalletPackage
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
