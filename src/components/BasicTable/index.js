import React from 'react';
import PropTypes from 'prop-types';
import TblContainer from './TblContainer';
import { makeStyles } from '@mui/styles';
import { TableCell, TableHead, TableRow } from '@mui/material';

const useStyles = makeStyles(() => ({
  headDisplay: {
    display: 'revert'
  }
}));

export default function BasicTable({ children, headCells, backgroundColor, color }) {
  const classes = useStyles();
  return (
    <>
      <TblContainer backgroundColor={backgroundColor} color={color}>
        <TableHead className={classes.headDisplay}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>{headCell.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </TblContainer>
    </>
  );
}
BasicTable.propTypes = {
  children: PropTypes.node.isRequired,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
};
