import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import TileBasic from 'components/TileBasic';
import { API } from 'constant';
import WarehouseActions from 'redux/WarehouseRedux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WarehouseSelectors } from 'redux/WarehouseRedux';
import WarehouseIcon from 'assets/images/WarehouseIcon';
import MDButton from 'components/Button';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';

function WarehouseScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const warehouseData = useSelector(WarehouseSelectors.getWarehouseDetail);
  useEffect(() => {
    dispatch(
      WarehouseActions.warehouseDataAction({
        loader: 'loading-request',
        slug: API.GET_WAREHOUSE_DATA,
        method: 'get'
      })
    );
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        title="List of Warehouses"
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Warehouse' }
        ]}
      >
        <MDButton
          sx={{ ml: 3 }}
          color="primary"
          onClick={() => navigate('/setup/warehouse/add-warehouse')}
        >
          Create Warehouse
        </MDButton>
      </Breadcrumbs>
      <TileBasic
        tiles={warehouseData.map((warehouse) => ({
          ...warehouse,
          icon: <WarehouseIcon height={96} width={96} />,
          path: `/setup/warehouse/edit-warehouse/${warehouse._id}`
        }))}
      />
    </DashboardLayout>
  );
}
export default WarehouseScreen;
