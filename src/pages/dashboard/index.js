import MDBox from 'components/MDBox';

import DashboardLayout from 'layouts/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';

function DashboardScreen() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <h1>Hello Dashboard</h1>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DashboardScreen;
