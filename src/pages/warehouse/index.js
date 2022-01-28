import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import SetupIcon from 'assets/images/SetupIcon';
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

function WarehouseScreen() {
  const classes = useStyles();
  const data = [
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Warehouse 1',
      path: '/',
      icon: <SetupIcon className={classes.iconSize} color="blue" />
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
export default WarehouseScreen;
