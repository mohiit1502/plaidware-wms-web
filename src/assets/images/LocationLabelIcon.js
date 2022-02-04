import PropTypes from 'prop-types';

const LocationLabelIcon = ({ width = 96, height = 96, color = 'white', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M48 53.7198C54.8925 53.7198 60.48 48.1323 60.48 41.2398C60.48 34.3473 54.8925 28.7598 48 28.7598C41.1075 28.7598 35.52 34.3473 35.52 41.2398C35.52 48.1323 41.1075 53.7198 48 53.7198Z"
      stroke={color}
      strokeWidth="5"
    />
    <path
      d="M14.4798 33.96C22.3598 -0.679991 73.6798 -0.63999 81.5198 34C86.1198 54.32 73.4798 71.52 62.3998 82.16C54.3598 89.92 41.6398 89.92 33.5598 82.16C22.5198 71.52 9.87981 54.28 14.4798 33.96Z"
      stroke={color}
      strokeWidth="5"
    />
  </svg>
);
export default LocationLabelIcon;

LocationLabelIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
