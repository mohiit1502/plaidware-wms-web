import React from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
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
  }
});

const TableContainer = styled('div')(
  () => `
  td,
  th {
    border-right: 1px solid #D3D4D5;
    text-align: left;
    padding: 18px 44px;
    white-space: nowrap;
  }
  th {
    background-color: #E5E7EB;
  }
  `
);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  }
}));

function createData(name, type, quantity, pick, put, adjust) {
  return { name, type, quantity, pick, put, adjust };
}
const rows = [
  createData('Name', '', '', 'Pick', 'Put', 'Adjust'),
  createData('Name', '', '', 'Pick', 'Put', 'Adjust'),
  createData('Name', '', '', 'Pick', 'Put', 'Adjust'),
  createData('Name', '', '', 'Pick', 'Put', 'Adjust'),
  createData('Name', '', '', 'Pick', 'Put', 'Adjust')
];

export default function TableList() {
  const classes = useStyles();
  return (
    <TableContainer sx={{ width: 200, maxWidth: '100%' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead className={classes.headColor}>
          <TableRow>
            <TableCell>Widget Name</TableCell>
            <TableCell align="right">Type-color-size</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Pick</TableCell>
            <TableCell align="right">Put</TableCell>
            <TableCell align="right">Adjust</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <TableCell className={classes.rowStyle}>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  style={{
                    width: '100%',
                    backgroundColor: '#FF9534',
                    color: 'white'
                  }}
                >
                  {row.pick}
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  style={{
                    width: '100%',
                    backgroundColor: '#34C759',
                    color: 'white'
                  }}
                >
                  {row.put}
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  style={{
                    width: '100%',
                    backgroundColor: '#007AFF',
                    color: 'white'
                  }}
                >
                  {row.adjust}
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
