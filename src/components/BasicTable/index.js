import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles({
  headColor: {
    display: 'revert'
  },
  rowStyle: {
    color: '#007aff'
  },
  tablebody: {
    fontSize: '13px',
    color: '#7F7F7F'
  }
});

const row = (x, i, header) => (
  <TableRow key={`tr-${i}`}>
    {header.map((y, k) => (
      <TableCell key={`tc-${k}`}>{x[y.prop]}</TableCell>
    ))}
  </TableRow>
);
export default function BasicTable({ data, header, backgroundColor }) {
  const classes = useStyles();
  const TableContainer = styled('div')(
    () => `
  td,
  th {
    border-right: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;
    border-left: 1px solid #EBEBEB;
    text-align: left;
    white-space: nowrap;
    background-color: white;
  }
  th {
    background-color: ${backgroundColor};,
    color: #9B9B9B;
  }
  `
  );

  return (
    <TableContainer sx={{ width: 200, maxWidth: '100%' }}>
      <Table sx={{ minWidth: 700 }} style={{ width: 1200 }}>
        <TableHead className={classes.headColor}>
          <TableRow className={classes.tableRowContainer}>
            {header && header.map((x, i) => <TableCell key={`thc-${i}`}>{x.name}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>{data.map((x, i) => row(x, i, header))}</TableBody>
      </Table>
    </TableContainer>
  );
}
BasicTable.propTypes = {
  data: PropTypes.array,
  header: PropTypes.array,
  backgroundColor: PropTypes.string
};
