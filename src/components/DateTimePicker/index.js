import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function DateTimeInput({ disabled, value }) {
  const [date, setDate] = useState(value || new Date());

  useEffect(() => {
    setDate(value);
  }, [value])

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          disabled={disabled}
          label=""
          value={date}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleChange}
        />
      </Stack>
    </LocalizationProvider>
  );
}

DateTimeInput.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
};
