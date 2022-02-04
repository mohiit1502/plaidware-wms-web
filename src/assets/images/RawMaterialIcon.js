import PropTypes from 'prop-types';

const RawMaterialIcon = ({ width = '96', height = '96', color = '#007AFF', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 96 96"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M47.9999 37.28C52.7599 37.28 56.6399 33.4 56.6399 28.64C56.6399 23.88 52.7599 20 47.9999 20C43.2399 20 39.3599 23.88 39.3599 28.64C39.3599 33.4 43.2399 37.28 47.9999 37.28Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.16 76.0002C31.92 76.0002 35.8 72.1202 35.8 67.3602C35.8 62.6002 31.92 58.7202 27.16 58.7202C22.4 58.7202 18.52 62.6002 18.52 67.3602C18.52 72.1202 22.36 76.0002 27.16 76.0002Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M68.8402 76.0002C73.6002 76.0002 77.4802 72.1202 77.4802 67.3602C77.4802 62.6002 73.6002 58.7202 68.8402 58.7202C64.0802 58.7202 60.2002 62.6002 60.2002 67.3602C60.2002 72.1202 64.0802 76.0002 68.8402 76.0002Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RawMaterialIcon;

RawMaterialIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
