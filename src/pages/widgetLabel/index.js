import { Box, Grid, TableBody, TableCell, TableRow } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import SearchBar from 'components/SearchBar';
import BasicTable from 'components/BasicTable';
import Barcodeimage from 'assets/images/barcode-number.png';
import MDButton from 'components/Button';

const useStyles = makeStyles({
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px'
  },
  customLabel: {
    backgroundColor: '#fff'
  },
  buttondiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '52px 0px'
  }
});
const records = [
  {
    warehouse: 'Ipsum',
    zone: 'Vivera',
    area: 'Nisi',
    row: 'Nulla',
    label: 'Mauris',
    bay: 'Senectus',
    barcodenumber: '2085550112',
    barcodeimage: Barcodeimage
  },
  {
    warehouse: 'Ipsum',
    zone: 'Vivera',
    area: 'Nisi',
    row: 'Nulla',
    label: 'Mauris',
    bay: 'Senectus',
    barcodenumber: '2085550112',
    barcodeimage: Barcodeimage
  },
  {
    warehouse: 'Ipsum',
    zone: 'Vivera',
    area: 'Nisi',
    row: 'Nulla',
    label: 'Mauris',
    bay: 'Senectus',
    barcodenumber: '2085550112',
    barcodeimage: Barcodeimage
  }
];

const recordsNew = [
  {
    warehouse: 'Ipsum',
    zone: 'Vivera',
    area: 'Nisi',
    barcodenumber: '2085550112',
    barcodeimage: Barcodeimage
  },
  {
    warehouse: 'Ipsum',
    zone: 'Vivera',
    area: 'Nisi',
    barcodenumber: '2085550112',
    barcodeimage: Barcodeimage
  },
  {
    warehouse: 'Ipsum',
    zone: 'Vivera',
    area: 'Nisi',
    barcodenumber: '2085550112',
    barcodeimage: Barcodeimage
  },
  {
    warehouse: 'Ipsum',
    zone: 'Vivera',
    area: 'Nisi',
    barcodenumber: '2085550112',
    barcodeimage: Barcodeimage
  }
];

const headCells = [
  {
    id: 'inventory',
    label: 'Inventory'
  },
  {
    id: 'Family',
    label: 'Family'
  },
  {
    id: 'Subfamily',
    label: 'Subfamily'
  },
  {
    id: 'Name',
    label: 'Name'
  },
  {
    id: 'Manufacture',
    label: 'Manufacture'
  },
  {
    id: 'Size',
    label: 'Size'
  },
  {
    id: 'barcode number',
    label: 'Barcode number'
  },
  {
    id: 'Barcode',
    label: 'Barcode'
  }
];
const headCellsNew = [
  {
    id: 'Inventory Name',
    label: 'Inventory Name'
  },
  {
    id: 'Item Name',
    label: 'Item Name'
  },
  {
    id: 'Item Description',
    label: 'Item Description'
  },
  {
    id: 'Barcode Number',
    label: 'Barcode Number'
  },
  {
    id: 'Barcode',
    label: 'Barcode'
  }
];
function WidgetLabel() {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Box mx={3} my={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={3}>
              <Box component="div" className={classes.labelSize}>
                Select Inventory
              </Box>
              <Box className={classes.customLabel}>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return 'Placeholder';
                    }

                    return selected.join(', ');
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    width: '100%'
                  }}
                  onChange={handleChange}
                >
                  <MenuItem disabled value="">
                    Placeholder
                  </MenuItem>
                  <MenuItem>Lorem Ipsum</MenuItem>
                </Select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <Box component="div" className={classes.labelSize}>
                Select Family
              </Box>
              <Box className={classes.customLabel}>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return 'Placeholder';
                    }

                    return selected.join(', ');
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    width: '100%'
                  }}
                  onChange={handleChange}
                >
                  <MenuItem disabled value="">
                    Placeholder
                  </MenuItem>
                  <MenuItem>Lorem Ipsum</MenuItem>
                </Select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <Box component="div" className={classes.labelSize}>
                Select Sub Family
              </Box>
              <Box className={classes.customLabel}>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return 'Placeholder';
                    }

                    return selected.join(', ');
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    width: '100%'
                  }}
                  onChange={handleChange}
                >
                  <MenuItem disabled value="">
                    Placeholder
                  </MenuItem>
                  <MenuItem>Lorem Ipsum</MenuItem>
                </Select>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <Box component="div" className={classes.labelSize}>
                Search Keyword
              </Box>
              <Box className={classes.customLabel}>
                <SearchBar />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: '24px', backgroundColor: '#FFFFFF' }}>
            <BasicTable
              headCells={headCells}
              records={records}
              backgroundColor="#E5E5E5"
              color="#8D8D8D"
            >
              <TableBody>
                {records &&
                  records.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.warehouse}</TableCell>
                      <TableCell>{item.zone}</TableCell>
                      <TableCell>{item.area}</TableCell>
                      <TableCell>{item.row}</TableCell>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.bay}</TableCell>
                      <TableCell>{item.barcodenumber}</TableCell>
                      <TableCell>
                        <img src={item.barcodeimage} alt="img" width="200px" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </BasicTable>
          </Box>
          <Box sx={{ marginTop: '24px', backgroundColor: '#FFFFFF' }}>
            <BasicTable
              headCells={headCellsNew}
              records={records}
              backgroundColor="#E5E5E5"
              color="#8D8D8D"
            >
              <TableBody>
                {recordsNew &&
                  recordsNew.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.warehouse}</TableCell>
                      <TableCell>{item.zone}</TableCell>
                      <TableCell>{item.area}</TableCell>
                      <TableCell>{item.barcodenumber}</TableCell>
                      <TableCell>
                        <img src={item.barcodeimage} alt="img" width="200px" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </BasicTable>
          </Box>
          <div className={classes.buttondiv}>
            <MDButton color="primary">{'Print Labels'}</MDButton>
          </div>
        </Box>
      </DashboardLayout>
    </>
  );
}

export default WidgetLabel;
