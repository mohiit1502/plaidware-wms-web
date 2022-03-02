import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import MDButton from 'components/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from 'components/TablePagination';
import { Dialog, DialogActions, MenuItem, Select } from '@mui/material';

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
  tHeads: PropTypes.array,
  editHandler: PropTypes.any
};

function Row({ tHeads, rowData, editHandler }) {
  return (
    <React.Fragment>
      <StyledTableRow sx={{ '&odd > *': { borderBottom: 'unset' } }}>
        <StyledTableCell sx={{ width: '10%', display: 'flex', alignItems: 'center' }}>
          <MDButton
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
            onClick={() => {
              editHandler(rowData._id);
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

function EnhancedTable({
  count,
  page,
  setPage,
  perPage,
  setPerPage,
  data,
  tHeads,
  editHandler,
  filtersControl,
  resetFilters
}) {
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const handleFiltersClose = () => {
    setFiltersOpen(false);
  };

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
          <Box>{/* <SearchBar /> */}</Box>
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
              onClick={() => {
                setFiltersOpen(true);
              }}
            >
              Filter
            </MDButton>
            {filtersControl ? (
              <Dialog open={filtersOpen} onClose={handleFiltersClose}>
                {filtersControl}
                <DialogActions>
                  <MDButton onClick={resetFilters}>Reset Filters</MDButton>
                  <MDButton
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setFiltersOpen(false);
                    }}
                  >
                    Close
                  </MDButton>
                </DialogActions>
              </Dialog>
            ) : null}
            {/* <MDButton
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
            </MDButton> */}
            {/* <Menu
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
            </Menu> */}
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
                data.map((rowData) => (
                  <Row
                    key={rowData._id}
                    editHandler={editHandler}
                    rowData={rowData}
                    tHeads={tHeads}
                  />
                ))}
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
          <Box sx={{ fontSize: '14px', color: '#000' }}>
            Per page:{' '}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={perPage}
              label="Age"
              onChange={(e) => {
                setPerPage(e.target.value);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Box>
          <Box>
            <TablePagination count={Math.ceil(count / perPage)} page={page} setPage={setPage} />
          </Box>
          <Box sx={{ fontSize: '14px', color: '#000' }}>
            [{(page - 1) * perPage + 1} to {perPage * page > count ? count : perPage * page} of{' '}
            {count}]
          </Box>
        </Box>
      </Box>
    </>
  );
}

EnhancedTable.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.any,
  perPage: PropTypes.number,
  setPerPage: PropTypes.any,
  data: PropTypes.array,
  tHeads: PropTypes.array,
  editHandler: PropTypes.any,
  filtersControl: PropTypes.any,
  resetFilters: PropTypes.any
};

export default EnhancedTable;
