import DashboardNavbar from 'components/DashboardNavbar';
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
      path: '/setup/labeling/widget-label',
      icon: <WidgetLabelIcon color="#007AFF" />
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TileBasic tiles={data} />
    </DashboardLayout>
  );
}
export default LabelingHome;
