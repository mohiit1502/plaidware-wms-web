import React, { useState } from 'react';
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

export default function Dropdown({ dropdownData, label, dropdownChange = null }) {
  const classes = useStyles();
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    if (dropdownChange !== null) {
      dropdownChange(event);
    }
    const {
      target: { value }
    } = event;
    setAge(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <InputLabel className={classes.font} id="demo-simple-select-label" sx={{ pb: 2, pt: 3 }}>
          {label}
        </InputLabel>
        <FormControl sx={{ width: '100%' }}>
          <Select
            displayEmpty
            value={age}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span>{/* {dropDownValue?.placeholder} */}</span>;
              }
              return selected;
            }}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
          >
            <MenuItem disabled value="">
              {/* <span>{dropDownValue?.label}</span> */}
            </MenuItem>
            {dropdownData &&
              dropdownData.map((data) => (
                <MenuItem value={data.name} key={data._id}>
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
  dropdownData: PropTypes.object.isRequired,
  dropdownChange: PropTypes.object,
  label: PropTypes.string
};
