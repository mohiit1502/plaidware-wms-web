import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import Tile from './Tile';

const useStyles = makeStyles({
  menu: {
    display: 'grid',
    gap: '1.75rem',
    backgroundColor: '#f9f9f9',
    padding: '24px 48px',
    '@media (max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, minmax(250px, auto)) !important'
    },
    '@media (max-width: 690px)': {
      gridTemplateColumns: 'repeat(1, minmax(250px, auto)) !important'
    }
  }
});

export default function TileGrid({ tiles }) {
  const classes = useStyles();
  // to make the grid adjust its elemnts:
  const myContainer = useRef(null);
  let gridColumns = 2;
  useEffect(() => {
    const grid = myContainer.current;
    const gridChild = grid.childElementCount;
    gridColumns = Math.floor(Math.sqrt(gridChild));
    grid.style.gridTemplateColumns = `repeat(${gridColumns}, minmax(250px, auto))`;
  });
  return (
    <Box className={classes.menu} ref={myContainer}>
      {tiles &&
        tiles.map((tile) => (
          <Tile key={tile.name} data={{ name: tile.name, path: tile.path }}>
            {' '}
            {tile.icon}
          </Tile>
        ))}
    </Box>
  );
}

TileGrid.propTypes = {
  tiles: PropTypes.array
};
