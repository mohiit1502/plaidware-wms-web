import React from 'react';

const CrossIcon = ({ width = 30, height = 30 }) => (
  <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5">
      <circle cx="20" cy="20" r="20" fill="#C2C2C2"/>
      <path d="M26.25 13.75L13.75 26.25" stroke='white' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.75 13.75L26.25 26.25" stroke='white' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);
  
export default CrossIcon;

CrossIcon.propTypes = {
  width: Number,
  height: Number
};

