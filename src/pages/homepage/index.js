import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import SetupIcon from 'assets/images/SetupIcon';
import SearchInventoryIcon from 'assets/images/SearchInventoryIcon';
import ReportsIcon from 'assets/images/ReportsIcon';
import ScanIcon from 'assets/images/ScanIcon';
import TileBasic from 'components/TileBasic';

function HomepageScreen() {
  const data = [
    {
      name: 'Search Inventory',
      path: '/',
      icon: <SearchInventoryIcon color="#007AFF" />
    },
    {
      name: 'Scan',
      path: '/',
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
      icon: <ReportsIcon color="#007AFF" />
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TileBasic tiles={data} />
    </DashboardLayout>
  );
}
export default HomepageScreen;
