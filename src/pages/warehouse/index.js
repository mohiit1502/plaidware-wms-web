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
        <TileBasic tiles={warehouseData} />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default WarehouseScreen;
