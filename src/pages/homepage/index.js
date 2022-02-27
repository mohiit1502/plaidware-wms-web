import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import SetupIcon from 'assets/images/SetupIcon';
import SearchInventoryIcon from 'assets/images/SearchInventoryIcon';
import ReportsIcon from 'assets/images/ReportsIcon';
import ScanIcon from 'assets/images/ScanIcon';
import TileBasic from 'components/TileBasic';
import Breadcrumbs from 'components/Breadcrumbs';

function HomepageScreen() {
  const data = [
    {
      name: 'Search Inventory',
      path: '/',
      disabled: true,
      icon: <SearchInventoryIcon color="#007AFF" />
    },
    {
      name: 'Scan',
      path: '/',
      disabled: true,
      icon: <ScanIcon color="#007AFF" />
    },
    {
      name: 'Setup',
      path: '/setup',
      icon: <SetupIcon color="#007AFF" />
    },
    {
      name: 'Reports',
      path: '/',
      disabled: true,
      icon: <ReportsIcon color="#007AFF" />
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs route={[{ name: 'Home', path: '/home' }]} />
      <TileBasic tiles={data} />
    </DashboardLayout>
  );
}
export default HomepageScreen;
