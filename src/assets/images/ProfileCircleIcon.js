import PropTypes from 'prop-types';

const ProfileCircleIcon = ({ width = 25, height = 24, ...props }) => (
  <svg width={width} height={height} {...props} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48.4799 51.1199C48.1999 51.0799 47.8399 51.0799 47.5199 51.1199C40.4799 50.8799 34.8799 45.1199 34.8799 38.0399C34.8799 30.7999 40.7199 24.9199 47.9999 24.9199C55.2399 24.9199 61.1199 30.7999 61.1199 38.0399C61.0799 45.1199 55.5199 50.8799 48.4799 51.1199Z" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M74.96 77.5202C67.84 84.0402 58.4 88.0002 48 88.0002C37.6 88.0002 28.16 84.0402 21.04 77.5202C21.44 73.7602 23.84 70.0802 28.12 67.2002C39.08 59.9202 57 59.9202 67.88 67.2002C72.16 70.0802 74.56 73.7602 74.96 77.5202Z" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M48 88C70.0914 88 88 70.0914 88 48C88 25.9086 70.0914 8 48 8C25.9086 8 8 25.9086 8 48C8 70.0914 25.9086 88 48 88Z" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
    
);
export default ProfileCircleIcon;

ProfileCircleIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
