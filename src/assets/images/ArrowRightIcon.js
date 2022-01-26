import PropTypes from 'prop-types';

const ArrowRightIcon = ({ width = 50, height = 24, color = '#007AFF', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8223 14.1148C10.6798 14.1148 10.5373 14.0623 10.4248 13.9498C10.2073 13.7323 10.2073 13.3723 10.4248 13.1548L14.5798 8.99984L10.4248 4.84484C10.2073 4.62734 10.2073 4.26734 10.4248 4.04984C10.6423 3.83234 11.0023 3.83234 11.2198 4.04984L15.7723 8.60234C15.9898 8.81984 15.9898 9.17984 15.7723 9.39734L11.2198 13.9498C11.1073 14.0623 10.9648 14.1148 10.8223 14.1148Z"
      fill={color}
    />
    <path
      d="M15.2475 9.5625H2.625C2.3175 9.5625 2.0625 9.3075 2.0625 9C2.0625 8.6925 2.3175 8.4375 2.625 8.4375H15.2475C15.555 8.4375 15.81 8.6925 15.81 9C15.81 9.3075 15.555 9.5625 15.2475 9.5625Z"
      fill={color}
    />
  </svg>
);
export default ArrowRightIcon;

ArrowRightIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
