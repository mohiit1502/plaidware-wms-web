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

const tHeads = [
  { key: 'name', name: '' },
  { key: 'commonName', name: 'Common Name' },
  { key: 'formalName', name: 'Formal Name' },
  { key: 'description', name: 'Description' },
  { key: 'manufacturer', name: 'Manufacturer' }
];

function ItemListing() {
  const dispatch = useDispatch();
  const { widgetName, inventoryId } = useParams();
  const [page /*, setPage*/] = React.useState(0);
  const [perPage /*, setPerPage*/] = React.useState(10);
  LOGGER.log({ widgetName, inventoryId });

  const data = useSelector(ItemSelectors.getItemsByInventoryId(inventoryId));

  React.useEffect(
    () => {
      dispatch(
        ItemActions.itemRequest({
          loader: 'loading-request',
          slug: API.GET_ITEMS_BY_INVENTORY,
          method: 'get',
          page,
          perPage,
          inventoryId
        })
      );
    },
    [
      /* page, perPage */
    ]
  );

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
        <EnhancedTable data={data} tHeads={tHeads} />
      </MDBox>
    </DashboardLayout>
  );
}
export default ItemListing;
