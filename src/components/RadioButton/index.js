import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';

export default function RadioButtonGroup({ options, groupLabel }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{groupLabel}</FormLabel>
      <RadioGroup defaultValue={options[0]} name="radio-buttons-group">
        {options.map((option) => (
          <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioButtonGroup.propTypes = {
  options: PropTypes.array,
  groupLabel: PropTypes.string
};
