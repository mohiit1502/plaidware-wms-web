import React from 'react';
import { Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import MuiAlert from '@mui/material/Alert';

export default function SnackBar({ message, open, handleClose }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
SnackBar.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.bool
};
