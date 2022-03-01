import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function DateTimeInput({ disabled }) {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          disabled={disabled}
          label=""
          value={value}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleChange}
        />
      </Stack>
    </LocalizationProvider>
  );
}

DateTimeInput.propTypes = {
  disabled: PropTypes.bool
};
