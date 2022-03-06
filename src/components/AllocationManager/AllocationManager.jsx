import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import TransferList from 'components/MDTransferList';
import './AllocationManager.component.scss';

const AllocationManager = props => {
  const {boxStyleOverride, component, gridStyleOverride, initlist, list, matchProp, md, onChange, title, variant, xs} = props;
  // eslint-disable-next-line no-unused-vars
  const [allocationStatus, setAllocationStatus] = useState();

  const handleAllocationChange = state => {
    setAllocationStatus(state);
    onChange && onChange(state.assigned?.map(obj => obj._id).join(','));
  };

  return <Grid item className='c-AllocationManager' xs={xs || 12} md={md || 6} sx={gridStyleOverride}>
    <MDBox
      sx={boxStyleOverride || ({
        backgroundColor: '#fff',
        border: '1px solid #c2c2c2',
        borderTop: '7px solid #007aff',
        padding: '12px',
        borderRadius: '4px'
      })}
      className="h-100 d-flex flex-column"
    >
      <Typography gutterBottom variant={variant || 'h6'} component={component || 'div'}>
        {title}
      </Typography>
      <TransferList list={list || []} initlist={initlist} matchProp={matchProp} onChange={handleAllocationChange} />
    </MDBox>
  </Grid>;
};

AllocationManager.propTypes = {
  boxStyleOverride: PropTypes.object,
  component: PropTypes.string,
  gridStyleOverride: PropTypes.object,
  initlist: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  list: PropTypes.array,
  matchProp: PropTypes.object,
  md: PropTypes.number,
  onChange: PropTypes.func,
  styleOverride: PropTypes.object,
  title: PropTypes.string,
  variant: PropTypes.string,
  xs: PropTypes.number
};

export default AllocationManager;
