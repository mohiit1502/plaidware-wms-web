import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ArrowRightIcon from 'assets/images/ArrowRightIcon';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import useStyles from './styles';
import LOGGER from 'services/Logger';

export default function Tile({ data, children }) {
  let [expand, setExpand] = useState(false);
  const classes = useStyles();

  return (
    <Accordion className={`${classes.root} ${expand ? null : classes.hoverChange}`}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={expand ? null : classes.fullHeight}
        onClick={() => {
          setExpand((expand = !expand));
          LOGGER.log(expand);
        }}
      >
        <Box
          className={`${classes.row1} ${expand ? classes.row1Svg : null} ${
            expand ? null : classes.column
          }`}
        >
          {children}{' '}
          <Box className={`${classes.name} ${expand ? null : classes.content}`}>{data.name}</Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails className={`${classes.row2} ${expand ? null : classes.remove}`}>
        <Box
          className={classes.box}
          onClick={() => {
            console.log(data.path.update);
          }}
        >
          Update {data.name} <ArrowRightIcon />{' '}
        </Box>
        <Box
          className={`${classes.box} ${classes.boxEven}`}
          onClick={() => {
            console.log(data.path.addNew);
          }}
        >
          Add New {data.name} <ArrowRightIcon />{' '}
        </Box>
        <Box
          className={classes.box}
          onClick={() => {
            console.log(data.path.cycleCount);
          }}
        >
          Cycle Count <ArrowRightIcon />{' '}
        </Box>
        <Box
          className={`${classes.box} ${classes.boxEven}`}
          onClick={() => {
            console.log(data.path.list);
          }}
        >
          {data.name} List <ArrowRightIcon />{' '}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

Tile.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node
};
