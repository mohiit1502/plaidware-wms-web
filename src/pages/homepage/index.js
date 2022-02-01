import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import SetupIcon from 'assets/images/SetupIcon';
import SearchInventoryIcon from 'assets/images/SearchInventoryIcon';
import ReportsIcon from 'assets/images/ReportsIcon';
import ScanIcon from 'assets/images/ScanIcon';
import TileBasic from 'components/TileBasic';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  iconSize: {
    width: '50%',
    height: '50%',
    marginBottom: '10px'
  },
  margin: {
    marginBottom: '20px'
  }
});

function HomepageScreen() {
  const classes = useStyles();
  const data = [
    {
      name: 'Search Inventory',
      path: '/',
      icon: <SearchInventoryIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Scan',
      path: '/',
      icon: <ScanIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Setup',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Reports',
      path: '/',
      icon: <ReportsIcon className={classes.iconSize} color="blue" />
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} py={3}>
        <TileBasic tiles={data} />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default HomepageScreen;
