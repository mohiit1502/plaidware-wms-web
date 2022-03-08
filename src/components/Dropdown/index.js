import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  font: {
    fontWeight: 'bold',
    color: 'black'
  }
});

export default function Dropdown({ dropdownData, label, onChange, value }) {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <InputLabel className={classes.font} id="demo-simple-select-label" sx={{ pb: 2, pt: 3 }}>
          {label}
        </InputLabel>
        <FormControl sx={{ width: '100%' }}>
          <Select
            displayEmpty
            value={value}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={onChange}
          >
            <MenuItem disabled value="">
              None selected
            </MenuItem>
            {dropdownData &&
              dropdownData.map((data) => (
                <MenuItem value={data._id} key={data._id}>
                  {data.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
Dropdown.propTypes = {
  dropdownData: PropTypes.array,
  onChange: PropTypes.any,
  label: PropTypes.string,
  value: PropTypes.any
};
