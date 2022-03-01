import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import MDBox from 'components/MDBox';
import Switch from 'components/Switch';
import MDTypography from 'components/MDTypography';
import './Toggles.component.scss';

const useStyles = makeStyles(() => ({
  switchSpacer: {
    margin: '0',
    '& .MuiFormControlLabel-root': {
      margin: '0'
    },
    '& .MuiSwitch-root': {
      margin: '0'
    }
  }
}));

const Toggles = props => {
  const {boxSx, md, title, toggles, typoComponent, typoSx, typoVariant, xs} = props;
  const classes = useStyles();

  const switchRenders = toggles => toggles && toggles.map((toggle, key) => {
    return <MDBox key={key} display='flex' justifyContent='space-between' alignItems='center' lineHeight={1} className={classes.switchSpacer}
      sx={{ marginBottom: '20px  !important' }}>
      <MDTypography variant='body2'>{toggle}</MDTypography>
      <Switch checked />
    </MDBox>;
  });

  return <Grid item id='c-Toggles' xs={xs || 12} md={md || 3} >
    <MDBox sx={boxSx || {backgroundColor: '#fff', border: '1px solid #c2c2c2', borderTop: '7px solid #007aff', borderRadius: '4px'}}>
      <Typography gutterBottom variant={typoVariant || 'h6'} component={typoComponent || 'div'}
        sx={typoSx || {borderBottom: '1px solid #c2c2c2', padding: '10px 20px', marginBottom: '20px'}}>
        {title || "Title"}
      </Typography>
      <Box sx={{ padding: ' 0px 20px' }}>{toggles && switchRenders(toggles)}</Box>
    </MDBox>
  </Grid>;
};

Toggles.propTypes = {
  boxSx: PropTypes.object,
  md: PropTypes.number,
  title: PropTypes.string,
  toggles: PropTypes.array,
  typoComponent: PropTypes.string,
  typoSx: PropTypes.object,
  typoVariant: PropTypes.string,
  xs: PropTypes.number
};

export default Toggles;
