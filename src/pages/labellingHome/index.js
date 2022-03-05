import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import LocationLabelIcon from 'assets/images/LocationLabelIcon';
import WidgetLabelIcon from 'assets/images/WidgetLabelIcon';
import TileBasic from 'components/TileBasic';
import Breadcrumbs from 'components/Breadcrumbs';

function LabelingHome() {
  const data = [
    {
      name: 'Location Label',
      path: '/setup/labeling/location-labeling',
      icon: <LocationLabelIcon color="#007AFF" />
    },
    {
      name: 'Widget Label',
      path: '/setup/labeling/widget-label',
      icon: <WidgetLabelIcon color="#007AFF" />
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Breadcrumbs
        title="Labeling"
        route={[
          { name: 'Home', path: '/home' },
          { name: 'Setup', path: '/setup' },
          { name: 'Labeling', path: '/setup/labeling' }
        ]}
      />
      <TileBasic tiles={data} />
    </DashboardLayout>
  );
}
export default LabelingHome;
