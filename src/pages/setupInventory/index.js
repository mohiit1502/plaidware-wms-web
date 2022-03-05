import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import EquipmentIcon from 'assets/images/EquimpmentIcon';
import ProductsIcon from 'assets/images/ProductsIcon';
import FleetIcon from 'assets/images/FleetIcon';
import RawMaterialIcon from 'assets/images/RawMaterialIcon';
import InventoryActions from 'redux/InventoryRedux';
import { InventorySelectors } from 'redux/InventoryRedux';
import { Grid } from '@mui/material';
import Tile from 'components/TileComponent';
import MDButton from 'components/Button';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { API } from 'constant';

function getIconFromSlug(slug) {
  switch (slug) {
    case 'equipment':
      return <EquipmentIcon />;
    case 'product':
      return <ProductsIcon />;
    case 'fleet':
      return <FleetIcon />;
    case 'rawmaterial':
    default:
      return <RawMaterialIcon />;
  }
}

function SetupInventory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inventoryData = useSelector(InventorySelectors.getInventoryDetail);
  const [inventoryAllData, setInventoryAllData] = useState([]);

  useEffect(() => {
    if (inventoryData?.length) {
      setInventoryAllData(inventoryData);
    }
  }, [inventoryData]);

  useEffect(() => {
    dispatch(
      InventoryActions.getInventoryAction({
        loader: 'loading-request',
        slug: API.GET_INVENTORY,
        method: 'get'
      })
    );
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        title="List Of Inventories"
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Inventory' }
        ]}
      >
        <MDButton sx={{ ml: 3 }} color="primary" onClick={() => navigate('/setup/inventory/new')}>
          Create Inventory
        </MDButton>
      </Breadcrumbs>
      <MDBox px={2} py={3}>
        <Grid container spacing={2}>
          {inventoryAllData &&
            inventoryAllData.map((tile) => (
              <Grid item xs={12} sm={6} md={inventoryAllData?.length > 4 ? 4 : 6} key={tile._id}>
                <Tile data={{ name: tile?.name, widgetname: tile?.widgetName, id: tile?._id }}>
                  {getIconFromSlug(tile.icon_slug)}
                </Tile>
              </Grid>
            ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default SetupInventory;
