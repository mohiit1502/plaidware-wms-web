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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import TablePagination from 'components/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e5e7eb',
    color: theme.palette.common.black,
    fontWeight:400 
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight:400
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(4n+1)': {
    backgroundColor: theme.palette.action.hover
  },
  'td, th' :{
    padding: '0.75rem 0.5rem'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
  // '&:nth-of-type(1) td, &:nth-of-type(1) th': {
  //   width: '10px'
  // }
}));


function createData(zone, names, type, specifications) {
  return { 
    zone, 
    names, 
    type, 
    specifications,
    children:[
      {
        rownumber:'10,654',
        location:'ALFKI',
        employeeid:'4',
        orderdate:'08/25/2008',
        requiredate:'09/22/2008',
        shippeddate:'09/22/2008'
      },
      {
        rownumber:'10,654',
        location:'ALFKI',
        employeeid:'4',
        orderdate:'08/25/2008',
        requiredate:'09/22/2008',
        shippeddate:'09/22/2008'
      }
    ]
  };
}
  
const rows = [
  createData('Zone A', 'Semper libero sit element...', 'Ana Trujillo', 'Orci arcu dictum pellentesque'),
  createData('Zone A', 'Semper libero sit element...', 'Ana Trujillo', 'Orci arcu dictum pellentesque'),
  createData('Zone A', 'Semper libero sit element...', 'Ana Trujillo', 'Orci arcu dictum pellentesque'),
  createData('Zone A', 'Semper libero sit element...', 'Ana Trujillo', 'Orci arcu dictum pellentesque'),
  createData('Zone A', 'Semper libero sit element...', 'Ana Trujillo', 'Orci arcu dictum pellentesque')
];

Row.propTypes = {
  row: PropTypes.shape({
    zone: PropTypes.string.isRequired,
    names: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    specifications: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        rownumber: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        employeeid: PropTypes.string.isRequired,
        orderdate: PropTypes.string.isRequired,
        requiredate: PropTypes.string.isRequired,
        shippeddate: PropTypes.string.isRequired
      }),
    ).isRequired
  }).isRequired
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '&odd > *': { borderBottom: 'unset' } }}>
        <StyledTableCell sx={{ width:'10%', display:'flex', alignItems: 'center' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            sx ={{ border: '1px solid #ccc' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <MDButton size="small" variant="contained" color="primary" sx={{ textTransform:'capitalize', minWidth:'45px', minHeight:'28px', marginLeft:'10px', boxShadow:'none', fontWeight:'500', padding:'0' }}>EDIT</MDButton>

        </StyledTableCell>
        <StyledTableCell component="th" scope="row" sx={{ textTransform:'uppercase', fontWeight:'400', fontSize:'14px', width:'5%' }}>
          {row.zone}
        </StyledTableCell>
        <StyledTableCell>{row.names}</StyledTableCell>
        <StyledTableCell>{row.type}</StyledTableCell>
        <StyledTableCell>{row.specifications}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }} >
          <Collapse unmountOnExit in={open}>
            <Box sx={{ margin:'15px 104px'  }}>
              <Table size="small" aria-label="purchases" sx={{ border: '1.2px solid #C2C2C2' }}>
                <TableHead  sx={{ background: '#E5E7EB', display:'table-header-group !important' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight:'500', fontSize:'14px' }}>Row no</TableCell>
                    <TableCell sx={{ fontWeight:'500', fontSize:'14px' }}>Number of Bays</TableCell>
                    <TableCell sx={{ fontWeight:'500', fontSize:'14px' }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight:'500', fontSize:'14px' }}>Order Date</TableCell>
                    <TableCell sx={{ fontWeight:'500', fontSize:'14px' }}>Required Date</TableCell>
                    <TableCell sx={{ fontWeight:'500', fontSize:'14px' }}>Shipped Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.children?.map((item , i)=>{
                    return(
                      <TableRow key={i}>
                        <TableCell>{item.rownumber}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.employeeid}</TableCell>
                        <TableCell>{item.orderdate}</TableCell>
                        <TableCell>{item.requiredate}</TableCell>
                        <TableCell>{item.shippeddate}</TableCell>
                      </TableRow>  
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function NestedTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ border:'1px solid #c4c4c4', borderTop:'6px solid #007aff', borderRadius:'4px', overflow: 'hidden' }}>
        <Box 
          sx={{
            display : 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:'16px'
          }}
        >
          <Box>
            <SearchBar />
          </Box>
          <Box sx={{ display:'flex', columnGap:'15px' }}>
            <MDButton size="small" variant="outlined" color="primary" sx={{ textTransform:'capitalize', minWidth:'60px', minHeight:'44px', fontWeight:'500' }}>Sorting</MDButton>
            <MDButton
              id="fade-button"
              size="small" variant="outlined" color="primary" sx={{ textTransform:'capitalize', minWidth:'60px', minHeight:'44px', fontWeight:'500' }}
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              endIcon={ <KeyboardArrowDownIcon /> }
              onClick={handleClick}
            >
                Dashboard
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
        </Box>
        {/* Table-row- */}
        <TableContainer component={Paper} sx={{ borderRadius: '0 !important', boxShadow:'none' }}>
          <Table aria-label="collapsible table" sx={{ minWidth: 700 }}>
            <TableHead sx={{ display:'table-header-group' }}>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Zone</StyledTableCell>
                <StyledTableCell>Names</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Specifications</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', padding:'15px 10px'  }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MDButton size="small" variant="outlined" color="primary" sx={{ textTransform:'inherit', minWidth:'45px', minHeight:'28px', boxShadow:'none', fontWeight:'500', padding:'0' }}>Go to</MDButton>
            <MDButton size="small" variant="outlined" color="primary" sx={{ textTransform:'inherit', minWidth:'45px', minHeight:'28px', marginLeft:'10px', boxShadow:'none', fontWeight:'500', padding:'0', border:' 1px solid #C2C2C2', color:'#000' }}>1</MDButton>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize:'12px', marginLeft:'15px' }}>
              View:
              <MDButton
                id="fade-button"
                size="small" variant="outlined" color="primary"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                endIcon={ <KeyboardArrowDownIcon /> }
                sx={{ textTransform:'inherit', minWidth:'45px', minHeight:'28px', marginLeft:'10px', boxShadow:'none', fontWeight:'500', padding:'0', border:' 1px solid #C2C2C2', color:'#000' }}
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
          </Box>
          {/*---- pagination- */}
          <Box>
            <TablePagination />
          </Box>
          <Box sx={{ fontSize:'14px', color:'#000' }}>
            [1 to 10 of 92]
          </Box>
        </Box>
      </Box>
    </>
  );
}

