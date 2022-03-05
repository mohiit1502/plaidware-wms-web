import EquipmentIcon from 'assets/images/EquimpmentIcon';
import FleetIcon from 'assets/images/FleetIcon';
import RawMaterialIcon from 'assets/images/RawMaterialIcon';

export const GetIconFromSlug = (slug) => {
  switch (slug) {
    case 'equipment':
      return <EquipmentIcon />;
    case 'fleet':
      return <FleetIcon />;
    case 'rawmaterial':
    default:
      return <RawMaterialIcon />;
  }
};

export const iconSlugs = ['equipment', 'fleet', 'rawmaterial'];
