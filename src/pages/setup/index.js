import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import MDBox from 'components/MDBox';
import { Grid } from '@mui/material';
import WarehouseIcon from 'assets/images/WarehouseIcon';
import InventoryIcon from 'assets/images/InventoryIcon';
import ProfileCircleIcon from 'assets/images/ProfileCircleIcon';
import LabelIcon from 'assets/images/LabelIcon';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  iconSize: {
    width: '50%',
    height: '50%',
    marginBottom: '10px'
  },
  margin: {
    marginBottom: '20px'
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: '20px',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    marginBottom: '20px',
    cursor: 'pointer !important',
    '& svg': {
      '&path': {
        stroke: '#007AFF !important'
      }
    },
    '&:hover': {
      backgroundColor: '#007AFF',
      cursor: 'default',
      color: 'white',
      '& svg': {
        '& path': {
          stroke: '#fff'
        }
      }
    }
  }
});

function SetupHome() {
  const classes = useStyles();
  const data = [
    {
      name: 'Warehouse',
      path: '/warehouse',
      icon: <WarehouseIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Inventory',
      path: '/',
      icon: <InventoryIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'User & Access',
      path: '/',
      icon: <ProfileCircleIcon className={classes.iconSize} color="blue" />
    },
    {
      name: 'Labeling',
      path: '/',
      icon: <LabelIcon className={classes.iconSize} color="blue" />
    }
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} py={3}>
        <Grid container spacing={2}>
          {data.map((items) => (
            <>
              <Grid item xs={12} sm={6} md={6}>
                <Link to={items.path}>
                  <MDBox
                    key={items.name + items.path}
                    data={{ name: items.name, path: items.path }}
                    className={classes.centerContent}
                    sx={{
                      height: 230,
                      backgroundColor: ({ palette: { white } }) => white.main,
                      padding: '32px 40px'
                    }}
                  >
                    {items.icon}
                    {items.name}
                  </MDBox>
                </Link>
              </Grid>
            </>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default SetupHome;
