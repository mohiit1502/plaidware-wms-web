import PropTypes from 'prop-types';

const ProductsIcon = ({ width = '96', height = '96', color = '#007AFF', ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6802 29.7598L48.0001 50.1997L83.0801 29.8796"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 86.4402V50.1602"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M39.72 9.92L18.36 21.8001C13.52 24.4801 9.56006 31.2 9.56006 36.72V59.3201C9.56006 64.8401 13.52 71.5601 18.36 74.2401L39.72 86.1202C44.28 88.6402 51.7599 88.6402 56.3199 86.1202L77.6801 74.2401C82.5201 71.5601 86.48 64.8401 86.48 59.3201V36.72C86.48 31.2 82.5201 24.4801 77.6801 21.8001L56.3199 9.92C51.7199 7.36 44.28 7.36 39.72 9.92Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M67.6794 38L68 38.3206L30.04 16.4004"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProductsIcon;

ProductsIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
