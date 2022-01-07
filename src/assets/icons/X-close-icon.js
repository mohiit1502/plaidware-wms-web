const XIcon = ({ width = 18, height = 18, color = '#ffffff', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="13" y1="1" x2="1" y2="13"></line>
    <line x1="1" y1="1" x2="13" y2="13"></line>
  </svg>
);

export default XIcon;
