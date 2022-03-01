import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import SearchBar from 'components/SearchBar';
import MDButton from 'components/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import IconButton from '@mui/material/IconButton';
// import Collapse from '@mui/material/Collapse';
import TablePagination from 'components/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e5e7eb',
    color: theme.palette.common.black,
    fontWeight: 400
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 400
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(2n+1)': {
    backgroundColor: theme.palette.action.hover
  },
  'td, th': {
    padding: '0.75rem 0.5rem'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

Row.propTypes = {
  rowData: PropTypes.array,
  tHeads: PropTypes.array
};

function Row({ tHeads, rowData }) {
  return (
    <React.Fragment>
      <StyledTableRow sx={{ '&odd > *': { borderBottom: 'unset' } }}>
        <StyledTableCell sx={{ width: '10%', display: 'flex', alignItems: 'center' }}>
          <MDButton
            disabled
            size="small"
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'capitalize',
              minWidth: '45px',
              minHeight: '28px',
              marginLeft: '10px',
              boxShadow: 'none',
              fontWeight: '500',
              padding: '0'
            }}
          >
            EDIT
          </MDButton>
        </StyledTableCell>
        {tHeads &&
          tHeads
            .slice(1)
            .map((head) => <StyledTableCell key={head.key}>{rowData[head.key]}</StyledTableCell>)}
      </StyledTableRow>
    </React.Fragment>
  );
}

function EnhancedTable({ data, tHeads }) {
  // const [anchorEl, setAnchorEl] = React.useState(false);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <>
      <Box
        sx={{
          border: '1px solid #c4c4c4',
          borderTop: '6px solid #007aff',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px'
          }}
        >
          <Box>
            <SearchBar />
          </Box>
          <Box sx={{ display: 'flex', columnGap: '15px' }}>
            <MDButton
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                textTransform: 'capitalize',
                minWidth: '60px',
                minHeight: '44px',
                fontWeight: '500'
              }}
            >
              Sorting
            </MDButton>
            <MDButton
              id="fade-button"
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                textTransform: 'capitalize',
                minWidth: '60px',
                minHeight: '44px',
                fontWeight: '500'
              }}
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={() => {}}
            >
              Dashboard
            </MDButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={null}
              open={false}
              TransitionComponent={Fade}
              onClose={() => {}}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Table-row- */}
        <TableContainer component={Paper} sx={{ borderRadius: '0 !important', boxShadow: 'none' }}>
          <Table aria-label="collapsible table" sx={{ minWidth: 700 }}>
            <TableHead sx={{ display: 'table-header-group' }}>
              <TableRow>
                {tHeads &&
                  tHeads.map((head) => (
                    <StyledTableCell key={head.name}>{head.name}</StyledTableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((rowData) => <Row key={rowData._id} rowData={rowData} tHeads={tHeads} />)}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 10px'
          }}
        >
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MDButton
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                textTransform: 'inherit',
                minWidth: '45px',
                minHeight: '28px',
                boxShadow: 'none',
                fontWeight: '500',
                padding: '0'
              }}
            >
              Go to
            </MDButton>
            <MDButton
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                textTransform: 'inherit',
                minWidth: '45px',
                minHeight: '28px',
                marginLeft: '10px',
                boxShadow: 'none',
                fontWeight: '500',
                padding: '0',
                border: ' 1px solid #C2C2C2',
                color: '#000'
              }}
            >
              1
            </MDButton>
            <Box
              sx={{ display: 'flex', alignItems: 'center', fontSize: '12px', marginLeft: '15px' }}
            >
              View:
              <MDButton
                id="fade-button"
                size="small"
                variant="outlined"
                color="primary"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  textTransform: 'inherit',
                  minWidth: '45px',
                  minHeight: '28px',
                  marginLeft: '10px',
                  boxShadow: 'none',
                  fontWeight: '500',
                  padding: '0',
                  border: ' 1px solid #C2C2C2',
                  color: '#000'
                }}
                onClick={handleClick}
              >
                12
              </MDButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button'
                }}
                anchorEl={anchorEl}
                open={open}
                TransitionComponent={Fade}
                onClose={handleClose}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Box>
          </Box> */}
          {/*---- pagination- */}
          <Box>
            <TablePagination />
          </Box>
          <Box sx={{ fontSize: '14px', color: '#000' }}>[1 to 10 of 92]</Box>
        </Box>
      </Box>
    </>
  );
}

EnhancedTable.propTypes = {
  data: PropTypes.array,
  tHeads: PropTypes.array
};

export default EnhancedTable;
