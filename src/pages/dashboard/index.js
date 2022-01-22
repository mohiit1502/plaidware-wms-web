import { useDispatch } from 'react-redux';

import MDBox from 'components/MDBox';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import AuthActions from 'redux/AuthRedux';

function DashboardScreen() {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(AuthActions.logout());
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox px={2} py={3}>
        <h1>Hello Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default DashboardScreen;
