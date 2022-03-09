import * as React from 'react';
// import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
// import FormGroup from '@mui/material/FormGroup';
import SwitchButton from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
  <SwitchButton disableRipple focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  width: 47,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466 !important',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    border: 'none'
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    }),
    height: 26,
    width: 80
  }
}));

export default function Switch({ disabled, checked, onChange, name }) {
  return <IOSSwitch disabled={disabled} checked={checked} sx={{ m: 1 }} name={name} onChange={onChange} />;
}

Switch.propTypes = {
  checked: PropTypes.any,
  disabled: PropTypes.bool,
  name: PropTypes.any,
  onChange: PropTypes.any
};
