import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'components/Footer';
import DashboardLayout from 'layouts/DashboardLayout';
import LocationLabelIcon from 'assets/images/LocationLabelIcon';
import WidgetLabelIcon from 'assets/images/WidgetLabelIcon';
import TileBasic from 'components/TileBasic';

function LabelingHome() {
  const data = [
    {
      name: 'Location Label',
      path: '/setup/labeling/location-labeling',
      icon: <LocationLabelIcon color="#007AFF" />
    },
    {
      name: 'Widget Label',
      path: '/setup/labeling',
      icon: <WidgetLabelIcon color="#007AFF" />
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TileBasic tiles={data} />
      <Footer />
    </DashboardLayout>
  );
}
export default LabelingHome;