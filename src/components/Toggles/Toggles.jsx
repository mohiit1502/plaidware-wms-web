import React, {useEffect, useState} from 'react';
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
  },
  maxHeight: {
    maxHeight: '20rem',
    overflow: 'auto'
  }
}));

const Toggles = props => {
  const {allDisabled, boxSx, gridStyleOverride, selectedToggles, md, onChange, title, toggles, typoComponent, typoSx, typoVariant, xs} = props;
  const [toggleState, updateToggleState] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (typeof selectedToggles === 'string') {
      const selectedToggleState = {};
      selectedToggles.split(',').forEach(iToggle => selectedToggleState[iToggle] = true);
      updateToggleState(selectedToggleState);
    }
  }, [selectedToggles]);

  const handleToggle = (e, toggle) => {
    const toggleStateClone = {...toggleState, [toggle]: e.target.checked};
    updateToggleState(toggleStateClone);
    onChange && onChange(toggleStateClone);
  };

  const switchRenders = toggles => toggles && toggles.map((toggle, key) => {
    toggle = typeof toggle === 'string' ? toggle : toggle.name;
    const id = toggle + '-' + key;
    return <MDBox key={key} display='flex' justifyContent='space-between' alignItems='center' lineHeight={1} className={classes.switchSpacer}
      sx={{ marginBottom: '20px  !important' }}>
      <MDTypography variant='body2'>{toggle}</MDTypography>
      <Switch disabled={allDisabled} id={id} checked={toggleState[toggle] === undefined ? false : toggleState[toggle]} onChange={e => handleToggle(e, toggle)} />
    </MDBox>;
  });

  return <Grid item className='c-Toggles' xs={xs || 12} md={md || 6} sx={gridStyleOverride}>
    <MDBox sx={boxSx || {backgroundColor: '#fff', border: '1px solid #c2c2c2', borderTop: '7px solid #007aff', borderRadius: '4px'}}>
      <Typography gutterBottom variant={typoVariant || 'h6'} component={typoComponent || 'div'}
        sx={typoSx || {borderBottom: '1px solid #c2c2c2', padding: '10px 20px', marginBottom: '20px'}}>
        {title || 'Title'}
      </Typography>
      <Box sx={{ padding: ' 0px 20px' }} className={classes.maxHeight}>{toggles && switchRenders(toggles)}</Box>
    </MDBox>
  </Grid>;
};

Toggles.propTypes = {
  allDisabled: PropTypes.bool,
  boxSx: PropTypes.object,
  gridStyleOverride: PropTypes.object,
  selectedToggles: PropTypes.string,
  md: PropTypes.number,
  onChange: PropTypes.func,
  title: PropTypes.string,
  toggles: PropTypes.array,
  typoComponent: PropTypes.string,
  typoSx: PropTypes.object,
  typoVariant: PropTypes.string,
  xs: PropTypes.number
};

export default Toggles;
