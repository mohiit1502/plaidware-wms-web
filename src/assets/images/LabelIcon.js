import PropTypes from 'prop-types';

const LabelIcon = ({ width = 25, height = 24, ...props }) => (
  <svg width={width} height={height} {...props} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.619 62.1055L35.739 80.2255C43.179 87.6655 55.259 87.6655 62.739 80.2255L80.299 62.6655C87.739 55.2255 87.739 43.1455 80.299 35.6655L62.139 17.5855C58.339 13.7855 53.099 11.7455 47.739 12.0255L27.739 12.9855C19.739 13.3455 13.379 19.7055 12.979 27.6655L12.019 47.6655C11.779 53.0655 13.819 58.3055 17.619 62.1055Z" stroke="#007AFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.939 48.9053C44.4618 48.9053 48.939 44.4281 48.939 38.9053C48.939 33.3824 44.4618 28.9053 38.939 28.9053C33.4161 28.9053 28.939 33.3824 28.939 38.9053C28.939 44.4281 33.4161 48.9053 38.939 48.9053Z" stroke="#007AFF" strokeWidth="5" strokeLinecap="round"/>
    <path d="M52.939 68.9053L68.939 52.9053" stroke="#007AFF" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
    
);
export default LabelIcon;

LabelIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
};
