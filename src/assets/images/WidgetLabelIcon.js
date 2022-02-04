import PropTypes from 'prop-types';

const WidgetLabelIcon = ({ width = 96, height = 96, color = 'white', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M88 34.08V15.92C88 10.28 85.44 8 79.08 8H62.92C56.56 8 54 10.28 54 15.92V34.04C54 39.72 56.56 41.96 62.92 41.96H79.08C85.44 42 88 39.72 88 34.08Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M88 79.08V62.92C88 56.56 85.44 54 79.08 54H62.92C56.56 54 54 56.56 54 62.92V79.08C54 85.44 56.56 88 62.92 88H79.08C85.44 88 88 85.44 88 79.08Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42 34.08V15.92C42 10.28 39.44 8 33.08 8H16.92C10.56 8 8 10.28 8 15.92V34.04C8 39.72 10.56 41.96 16.92 41.96H33.08C39.44 42 42 39.72 42 34.08Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42 79.08V62.92C42 56.56 39.44 54 33.08 54H16.92C10.56 54 8 56.56 8 62.92V79.08C8 85.44 10.56 88 16.92 88H33.08C39.44 88 42 85.44 42 79.08Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default WidgetLabelIcon;

WidgetLabelIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
