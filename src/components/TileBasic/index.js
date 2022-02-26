import React from 'react';
import PropTypes from 'prop-types';
import MDBox from 'components/MDBox';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  iconSize: {
    width: '50%',
    height: '50%',
    marginBottom: '10px'
  },
  margin: {
    marginBottom: '20px'
  },
  tileContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: '20px',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    marginBottom: '20px',
    cursor: 'pointer !important',
    '& svg': {
      '&path': {
        stroke: '#007AFF !important'
      }
    },
    '&:hover': {
      backgroundColor: '#007AFF',
      cursor: 'default',
      color: 'white',
      '& svg': {
        '& path': {
          stroke: '#fff'
        }
      }
    }
  },
  disabledTileContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: '20px',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    marginBottom: '20px',
    opacity: '0.5',
    '& svg': {
      '&path': {
        stroke: '#007AFF !important'
      }
    }
  }
});

export default function TileBasic({ tiles }) {
  const classes = useStyles();

  return (
    <>
      <MDBox px={2} py={3}>
        <Grid container spacing={2}>
          {tiles &&
            tiles.map((item) => (
              <>
                <Grid item xs={12} sm={6} md={tiles.length > 4 ? 4 : 6}>
                  {item.disabled ? (
                    <MDBox
                      key={item.name + item.path}
                      data={{ name: item.name, path: item.path }}
                      className={classes.disabledTileContent}
                      sx={{
                        height: 230,
                        backgroundColor: ({ palette: { white } }) => white.main,
                        padding: '32px 40px'
                      }}
                    >
                      {item.icon}
                      {item.name}
                    </MDBox>
                  ) : (
                    <Link
                      to={item.path}
                      state={{ name: item.name, address: item.address, id: item._id }}
                    >
                      <MDBox
                        key={item.name + item.path}
                        data={{ name: item.name, path: item.path }}
                        className={classes.tileContent}
                        sx={{
                          height: 230,
                          backgroundColor: ({ palette: { white } }) => white.main,
                          padding: '32px 40px'
                        }}
                      >
                        {item.icon}
                        {item.name}
                      </MDBox>
                    </Link>
                  )}
                </Grid>
              </>
            ))}
        </Grid>
      </MDBox>
    </>
  );
}

TileBasic.propTypes = {
  tiles: PropTypes.any
};
