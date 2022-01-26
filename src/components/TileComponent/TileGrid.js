import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import SetupIcon from 'assets/images/SetupIcon';
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


// TODO: When using this component, please use props here instead.
// The below code was left as a sample for testing.
// Please also remove this comment when the above are complete
export default function TileGrid() {
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
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="50px" height="50px" />
      </Tile>
      <Tile data={{ name: 'Setup', path: '/' }}>
        {' '}
        <SetupIcon color="#007aff" width="40px" height="40px" />
      </Tile>
    </Box>
  );
}
