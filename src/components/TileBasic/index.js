import React from 'react';
import PropTypes from 'prop-types';
import MDBox from 'components/MDBox';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import SetupIcon from 'assets/images/SetupIcon';

const useStyles = makeStyles({
  iconSize: {
    width: '50%',
    height: '50%',
    marginBottom: '10px'
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: '20px',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: '#007AFF',
      cursor: 'default',
      color: 'white',
      '& svg': {
        '& path': {
          fill: '#fff'
        }
      }
    }
  }
});

export default function TileBasic({ tiles }) {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        {tiles &&
          tiles.map((tile) => (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <MDBox
                  key={tile._id}
                  className={classes.centerContent}
                  sx={{
                    height: 200,
                    backgroundColor: ({ palette: { white } }) => white.main,
                    padding: '32px 40px'
                  }}
                >
                  <SetupIcon className={classes.iconSize} color="blue" />
                  {tile.name}
                </MDBox>
              </Grid>
            </>
          ))}
      </Grid>
    </>
  );
}

TileBasic.propTypes = {
  tiles: PropTypes.any
};
