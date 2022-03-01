import React from 'react';
import { Table } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

export default function TblContainer({ children, backgroundColor, color, id }) {
  const useStyles = makeStyles({
    headDisplay: {
      display: 'revert'
    },
    table: {
      '& thead th': {
        fontWeight: '600',
        color: color,
        backgroundColor: backgroundColor
      },
      '& tbody td': {
        borderRadius: '2px',
        fontWeight: 300,
        borderRight: '1px solid #EBEBEB',
        borderBottom: '1px solid #EBEBEB',
        borderLeft: '1px solid #EBEBEB',
        textAlign: 'left',
        whiteSpace: 'nowrap'
      },
      '& tbody tr:hover': {
        cursor: 'pointer'
      }
    }
  });
  const classes = useStyles();
  return (
    <>
      <Table className={classes.table} id={id}>{children}</Table>
    </>
  );
}

TblContainer.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.string
};
