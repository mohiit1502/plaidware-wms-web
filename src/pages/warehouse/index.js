import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import TileBasic from 'components/TileBasic';
import { API } from 'constant';
import WarehouseActions from 'redux/WarehouseRedux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WarehouseSelectors } from 'redux/WarehouseRedux';
import WarehouseIcon from 'assets/images/WarehouseIcon';

function WarehouseScreen() {
  const dispatch = useDispatch();
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
      <MDBox px={2} py={3}>
        <TileBasic
          tiles={warehouseData.map((warehouse) => ({
            ...warehouse,
            icon: <WarehouseIcon height={96} width={96} />
          }))}
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default WarehouseScreen;
