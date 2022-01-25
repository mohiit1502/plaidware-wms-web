// import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import PropTypes from 'prop-types';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const useStyles = makeStyles({
  bind: {
    display: 'flex'
  },
  size: {
    fontSize: '12px',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginRight: '15px'
  },
  sizePos: {
    fontSize: '12px',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});


function LocationLabel({ area, row, bay, level, position }) {
  const classes = useStyles();
  return (
    <MDBox
      sx={{
        width: 381,
        height: 138,
        backgroundColor: ({ palette: { background } }) => background.default,
        padding: '32px 40px'
      }}
    >
      <MDTypography variant="h1">
        <div className={classes.bind}>
          <div>
            <MDTypography variant="h6" className={classes.size}>
              Area
            </MDTypography>
            <MDTypography variant="h1" color="black">
              {area}-
            </MDTypography>
          </div>
          <div>
            <MDTypography variant="h6" className={classes.size}>
              Row
            </MDTypography>
            <MDTypography variant="h1" color="black">
              {row}-
            </MDTypography>
          </div>
          <div>
            <MDTypography variant="h6" className={classes.size}>
              Bay
            </MDTypography>
            <MDTypography variant="h1" color="black">
              {bay}-
            </MDTypography>
          </div>
          <div>
            <MDTypography variant="h6" className={classes.size}>
              Level
            </MDTypography>
            <MDTypography variant="h1" color="black">
              {level}-
            </MDTypography>
          </div>
          <div>
            <MDTypography variant="h6" className={classes.sizePos}>
              Pos
            </MDTypography>
            <MDTypography variant="h1" color="black">
              {position}
            </MDTypography>
          </div>
        </div>
      </MDTypography>
    </MDBox>
  );
}

LocationLabel.propTypes = {
  area: PropTypes.string.isRequired,
  row: PropTypes.string.isRequired,
  bay: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
};

export default LocationLabel;
