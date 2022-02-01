import PropTypes from 'prop-types';

const SearchInventoryIcon = ({ width = '78', height = '86', color = '#007AFF', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 78 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M31 19H47C55 19 55 15 55 11C55 3 51 3 47 3H31C27 3 23 3 23 11C23 19 27 19 31 19Z"
      stroke={color}
      strokeWidth="5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M55 11.0801C68.32 11.8001 75 16.7201 75 35.0001V59.0001C75 75.0001 71 83.0001 51 83.0001H27C7 83.0001 3 75.0001 3 59.0001V35.0001C3 16.7601 9.68 11.8001 23 11.0801"
      stroke={color}
      strokeWidth="5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.6287 62.2582C45.7082 62.2582 52.2578 55.7086 52.2578 47.6292C52.2578 39.5497 45.7082 33 37.6287 33C29.5493 33 22.9996 39.5497 22.9996 47.6292C22.9996 55.7086 29.5493 62.2582 37.6287 62.2582Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M55.0004 64.9998L50.4288 60.4282"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchInventoryIcon;

SearchInventoryIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
