import React from 'react';
import PropTypes from 'prop-types';

export default function TabPanel({ children, value, index }) {
  return <div>{value === index && <h1>{children}</h1>}</div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};
