import PropTypes from 'prop-types';
const FleetIcon = ({ width = 96, height = 96, color = '#007aff', ...props }) => (
  <svg
    width={width}
    height={height}
    {...props}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 8V48C60 52.4 56.4 56 52 56H8V24C8 15.16 15.16 8 24 8H60Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M88 56V68C88 74.64 82.64 80 76 80H72C72 75.6 68.4 72 64 72C59.6 72 56 75.6 56 80H40C40 75.6 36.4 72 32 72C27.6 72 24 75.6 24 80H20C13.36 80 8 74.64 8 68V56H52C56.4 56 60 52.4 60 48V20H67.36C70.24 20 72.8799 21.56 74.3199 24.04L81.16 36H76C73.8 36 72 37.8 72 40V52C72 54.2 73.8 56 76 56H88Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 88C36.4183 88 40 84.4183 40 80C40 75.5817 36.4183 72 32 72C27.5817 72 24 75.5817 24 80C24 84.4183 27.5817 88 32 88Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M64 88C68.4183 88 72 84.4183 72 80C72 75.5817 68.4183 72 64 72C59.5817 72 56 75.5817 56 80C56 84.4183 59.5817 88 64 88Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M88 48V56H76C73.8 56 72 54.2 72 52V40C72 37.8 73.8 36 76 36H81.16L88 48Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FleetIcon;
FleetIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
