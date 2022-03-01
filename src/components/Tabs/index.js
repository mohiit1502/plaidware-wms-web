import React from 'react';
import PropTypes from 'prop-types';

export default function TabPanel({ children, className, value, index }) {
  return <div className={className ? className : ''}>{value === index && <h1>{children}</h1>}</div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.number,
  index: PropTypes.number
};
