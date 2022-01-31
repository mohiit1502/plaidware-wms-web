import PropTypes from 'prop-types';

const WarehouseIcon = ({ width = 25, height = 24, ...props }) => (
  <svg  width={width} height={height} viewBox="0 0 96 96" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M52.0401 11.6798L75.6401 22.1598C82.4401 25.1598 82.4401 30.1198 75.6401 33.1198L52.0401 43.5998C49.3601 44.7998 44.9601 44.7998 42.2801 43.5998L18.6801 33.1198C11.8801 30.1198 11.8801 25.1598 18.6801 22.1598L42.2801 11.6798C44.9601 10.4798 49.3601 10.4798 52.0401 11.6798Z" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 44C12 47.36 14.52 51.24 17.6 52.6L44.76 64.68C46.84 65.6 49.2 65.6 51.24 64.68L78.4 52.6C81.48 51.24 84 47.36 84 44" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 64C12 67.72 14.2 71.08 17.6 72.6L44.76 84.68C46.84 85.6 49.2 85.6 51.24 84.68L78.4 72.6C81.8 71.08 84 67.72 84 64" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg> 
);
export default WarehouseIcon;

WarehouseIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
