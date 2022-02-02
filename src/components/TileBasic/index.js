import React from 'react';
import PropTypes from 'prop-types';
import MDBox from 'components/MDBox';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
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
              <Grid item xs={12} sm={6} md={tiles.length <= 4 ? undefined : 4}>
                <MDBox
                  key={tile.name + tile.path}
                  data={{ name: tile.name, path: tile.path }}
                  className={classes.centerContent}
                  sx={{
                    height: 200,
                    backgroundColor: ({ palette: { white } }) => white.main,
                    padding: '32px 40px'
                  }}
                >
                  {tile.icon}
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
