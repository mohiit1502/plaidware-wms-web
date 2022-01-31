import PropTypes from 'prop-types';

const InventoryIcon = ({ width = 25, height = 24,  ...props }) => (
  <svg width={width} height={height} {...props} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.24 58.7998L43.24 64.7998L59.24 48.7998" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 24H56C64 24 64 20 64 16C64 8 60 8 56 8H40C36 8 32 8 32 16C32 24 36 24 40 24Z" stroke="#007AFF" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M64 16.0801C77.32 16.8001 84 21.7201 84 40.0001V64.0001C84 80.0001 80 88.0001 60 88.0001H36C16 88.0001 12 80.0001 12 64.0001V40.0001C12 21.7601 18.68 16.8001 32 16.0801" stroke="#007AFF" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
    
);
export default InventoryIcon;

InventoryIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
