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

const tHeads = [
  { key: 'name', name: '' },
  { key: 'commonName', name: 'Common Name' },
  { key: 'formalName', name: 'Formal Name' },
  { key: 'description', name: 'Description' },
  { key: 'manufacturer', name: 'Manufacturer' },
  { key: 'size', name: 'size' },
  { key: 'color', name: 'color' },
  { key: 'type', name: 'type' },
  { key: 'unitOfMaterial', name: 'unitOfMaterial' },
  { key: 'unitCost', name: 'unitCost' },
  { key: 'packageCount', name: 'packageCount' },
  { key: 'countPerPallet', name: 'countPerPallet' },
  { key: 'countPerPalletPackage', name: 'countPerPalletPackage' },
  { key: 'totalQuantity', name: 'totalQuantity' },
  { key: 'reservedQuantity', name: 'reservedQuantity' },
  { key: 'availableQuantity', name: 'availableQuantity' }
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

  React.useEffect(() => {
    dispatch(
      ItemActions.itemRequest({
        loader: 'loading-request',
        slug: API.GET_ITEMS_BY_INVENTORY,
        method: 'get',
        page: page - 1,
        perPage,
        inventoryId
      })
    );
  }, [page, perPage]);

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
          data={data}
          tHeads={tHeads}
        />
      </MDBox>
    </DashboardLayout>
  );
}
export default ItemListing;
