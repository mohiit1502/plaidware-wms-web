import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import WarehouseIcon from 'assets/images/WarehouseIcon';
import InventoryIcon from 'assets/images/InventoryIcon';
import ProfileCircleIcon from 'assets/images/ProfileCircleIcon';
import LabelIcon from 'assets/images/LabelIcon';
import TileBasic from 'components/TileBasic';
import Footer from 'components/Footer';

function SetupHome() {
  const data = [
    {
      name: 'Warehouse',
      path: '/warehouse',
      icon: <WarehouseIcon width={96} height={96} color="#007AFF" />
    },
    {
      name: 'Inventory',
      path: '/',
      icon: <InventoryIcon width={96} height={96} color="#007AFF" />
    },
    {
      name: 'User & Access',
      path: '/',
      icon: <ProfileCircleIcon width={96} height={96} color="#007AFF" />
    },
    {
      name: 'Labeling',
      path: '/labeling',
      icon: <LabelIcon width={96} height={96} color="#007AFF" />
    }
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TileBasic tiles={data} />
      <Footer />
    </DashboardLayout>
  );
}

export default SetupHome;
