import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import TileGrid from 'components/TileComponent/TileGrid';
import EquipmentIcon from 'assets/images/EquimpmentIcon';
import ProductsIcon from 'assets/images/ProductsIcon';
import FleetIcon from 'assets/images/FleetIcon';
import RawMaterialIcon from 'assets/images/RawMaterialIcon';

function SetupInventory() {
  const tileList = [
    {
      name: 'Equipment',
      path: { update: '/update', addNew: '/addNew', cycleCount: '/cycleCount', list: '/list' },
      icon: <EquipmentIcon />
    },
    {
      name: 'Raw Material',
      path: { update: '/update', addNew: '/addNew', cycleCount: '/cycleCount', list: '/list' },
      icon: <RawMaterialIcon />
    },
    {
      name: 'Products',
      path: { update: '/update', addNew: '/addNew', cycleCount: '/cycleCount', list: '/list' },
      icon: <ProductsIcon />
    },
    {
      name: 'Fleet',
      path: { update: '/update', addNew: '/addNew', cycleCount: '/cycleCount', list: '/list' },
      icon: <FleetIcon />
    }
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} py={3}>
        <TileGrid tiles={tileList} />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default SetupInventory;
