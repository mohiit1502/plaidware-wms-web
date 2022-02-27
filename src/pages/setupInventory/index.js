import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import EquipmentIcon from 'assets/images/EquimpmentIcon';
import ProductsIcon from 'assets/images/ProductsIcon';
import FleetIcon from 'assets/images/FleetIcon';
import RawMaterialIcon from 'assets/images/RawMaterialIcon';
import { Grid } from '@mui/material';
import Tile from 'components/TileComponent';
import MDButton from 'components/Button';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';

function SetupInventory() {
  const navigate = useNavigate();

  const tiles = [
    {
      name: 'Raw Material',
      path: { update: '/', addNew: '/', cycleCount: '/', list: '/' },
      icon: <RawMaterialIcon />
    },
    {
      name: 'Products',
      path: {
        update: '/',
        addNew: '/setup/inventory/product/add-new-product',
        cycleCount: '/',
        list: '/'
      },
      icon: <ProductsIcon />
    },
    {
      name: 'Equipment',
      path: { update: '/', addNew: '/', cycleCount: '/', list: '/' },
      icon: <EquipmentIcon />
    },
    {
      name: 'Fleet',
      path: { update: '/', addNew: '/', cycleCount: '/', list: '/' },
      icon: <FleetIcon />
    }
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Inventory' }
        ]}
      >
        <MDButton
          sx={{ ml: 3 }}
          color="primary"
          onClick={() => navigate('/setup/inventory/inventory-new')}
        >
          Add new Inventory
        </MDButton>
      </Breadcrumbs>
      <MDBox px={2} py={3}>
        <Grid container spacing={2}>
          {tiles &&
            tiles.map((tile) => (
              <Grid item xs={12} sm={6} md={tiles.length > 4 ? 4 : 6} key={tile.name}>
                <Tile data={{ name: tile.name, path: tile.path }}>{tile.icon}</Tile>
              </Grid>
            ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default SetupInventory;
