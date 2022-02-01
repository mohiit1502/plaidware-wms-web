import PropTypes from 'prop-types';

const ScanIcon = ({ width = '96', height = '96', color = '#007AFF', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 36V28C8 16 16 8 28 8H68C80 8 88 16 88 28V36"
      stroke={color}
      strokeWidth="5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 60V68C8 80 16 88 28 88H68C80 88 88 80 88 68V60"
      stroke={color}
      strokeWidth="5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 48H88"
      stroke={color}
      strokeWidth="5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ScanIcon;

ScanIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
