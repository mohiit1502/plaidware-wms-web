import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import WarehouseIcon from 'assets/images/WarehouseIcon';
import InventoryIcon from 'assets/images/InventoryIcon';
import ProfileCircleIcon from 'assets/images/ProfileCircleIcon';
import LabelIcon from 'assets/images/LabelIcon';
import TileBasic from 'components/TileBasic';
import Breadcrumbs from 'components/Breadcrumbs';

function SetupHome() {
  const data = [
    {
      name: 'Warehouse',
      path: '/setup/warehouse',
      icon: <WarehouseIcon width={96} height={96} color="#007AFF" />
    },
    {
      name: 'Inventory',
      path: '/setup/inventory',
      icon: <InventoryIcon width={96} height={96} color="#007AFF" />
    },
    {
      name: 'User & Access',
      path: '/setup/users-access',
      icon: <ProfileCircleIcon width={96} height={96} color="#007AFF" />
    },
    {
      name: 'Labeling',
      path: '/setup/labeling',
      icon: <LabelIcon width={96} height={96} color="#007AFF" />
    }
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs title="Setup Warehouse, Inventory, Users" route={[{ name: 'Home', path: '/home' }, { name: 'Setup' }]} />
      <TileBasic tiles={data} />
    </DashboardLayout>
  );
}

export default SetupHome;
