import * as React from 'react';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown() {
  const [age, setAge] = React.useState('');

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
    <Box sx={{ width: '100%' }}>
      <FormControl sx={{ width: '100%' }}>
        {/* <InputLabel id="demo-simple-select-label">Equipment</InputLabel> */}
        <Select
          displayEmpty
          input={<OutlinedInput />}
          value={age}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Placeholder</span>;
            }

            return selected;
          }}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange}
        >
          <MenuItem disabled value="">
            {' '}
            <span>Placeholder</span>{' '}
          </MenuItem>
          <MenuItem value={'Ten'}>Ten</MenuItem>
          <MenuItem value={'Twenty'}>Twenty</MenuItem>
          <MenuItem value={'Thirty'}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
