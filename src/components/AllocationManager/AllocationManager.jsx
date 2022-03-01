import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import TransferList from 'components/MDTransferList';
import './AllocationManager.component.scss';

const AllocationManager = props => {
  const {boxStyleOverride, component, gridStyleOverride, list, md, title, variant, xs} = props;
  return <Grid item className="c-AllocationManager" xs={xs || 12} md={md || 6} sx={gridStyleOverride}>
    <MDBox
      sx={boxStyleOverride || ({
        backgroundColor: '#fff',
        border: '1px solid #c2c2c2',
        borderTop: '7px solid #007aff',
        padding: '12px',
        borderRadius: '4px'
      })}
    >
      <Typography gutterBottom variant={variant || 'h6'} component={component || 'div'}>
        {title}
      </Typography>
      <TransferList list={list || []} />
    </MDBox>
  </Grid>;
};

AllocationManager.propTypes = {
  boxStyleOverride: PropTypes.object,
  component: PropTypes.string,
  gridStyleOverride: PropTypes.object,
  list: PropTypes.array,
  md: PropTypes.number,
  styleOverride: PropTypes.object,
  title: PropTypes.string,
  variant: PropTypes.string,
  xs: PropTypes.number
};

export default AllocationManager;
