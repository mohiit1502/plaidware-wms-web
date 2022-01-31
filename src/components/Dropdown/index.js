import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel'
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
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
export default function Dropdown({ items, dropdownData }) {
  const classes = useStyles();

  const [age, setAge] = useState('');
  const [dropDownValue, setDropDownValue] = useState([]);

  useEffect(() => {
    setDropDownValue(items);
  }, [items]);

  const handleChange = (event) => {
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
          {dropDownValue?.label}
        </InputLabel>
        <FormControl sx={{ width: '100%' }}>
          <Select
            displayEmpty
            input={<OutlinedInput />}
            value={age}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span>{dropDownValue?.placeholder}</span>;
              }
              return selected;
            }}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
          >
            <MenuItem disabled value="">
              <span>{dropDownValue?.label}</span>
            </MenuItem>
            {dropdownData && dropdownData.map((data) => (
              <MenuItem value={data.displayname} key={data.ID}>{data.displayname}</MenuItem>
            ))}
            
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
Dropdown.propTypes = {
  items: PropTypes.object.isRequired,
  dropdownData: PropTypes.object.isRequired

};
