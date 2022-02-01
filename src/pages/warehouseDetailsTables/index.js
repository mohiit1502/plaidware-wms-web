import MDButton from 'components/Button';
import DashboardNavbar from 'components/DashboardNavbar';
import NestedTable from 'components/NestedTable';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

const useStyles = makeStyles({
  customButton: {
    width: '100%',
    padding: '13px 30px !important',
    textTransform: 'uppercase',
    borderRadius: '100px !important',
    boxShadow: 'none !important'
  }
});

const WarehouseDetailsTables = () => {
  const classes = useStyles();
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Box px={3} py={3}>
          <NestedTable />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '20px',
              margin: '20px 0px'
            }}
          >
            <MDButton
              size="medium"
              className={classes.customButton}
              color="primary"
              variant="contained"
            >
              add zone
            </MDButton>
            <MDButton
              size="medium"
              className={classes.customButton}
              color="primary"
              variant="contained"
            >
              add area
            </MDButton>
            <MDButton
              size="medium"
              className={classes.customButton}
              color="primary"
              variant="contained"
            >
              add row
            </MDButton>
            <MDButton
              size="medium"
              className={classes.customButton}
              color="primary"
              variant="contained"
              sx={{ background: '#E5E7EB !important', color: 'rgba(75, 85, 99, 0.5)' }}
            >
              add bay
            </MDButton>
            <MDButton
              size="medium"
              className={classes.customButton}
              color="primary"
              variant="contained"
              sx={{ background: '#E5E7EB !important', color: 'rgba(75, 85, 99, 0.5)' }}
            >
              split bay
            </MDButton>
            <MDButton
              size="medium"
              className={classes.customButton}
              color="primary"
              variant="contained"
              sx={{ background: '#E5E7EB !important', color: 'rgba(75, 85, 99, 0.5)' }}
            >
              split level
            </MDButton>
          </Box>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default WarehouseDetailsTables;
