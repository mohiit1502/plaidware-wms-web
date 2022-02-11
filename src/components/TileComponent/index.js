import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ArrowRightIcon from 'assets/images/ArrowRightIcon';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import useStyles from './styles';
import LOGGER from 'services/Logger';
import { Link } from 'react-router-dom';

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
          {children}
          <Box className={`${classes.name} ${expand ? null : classes.content}`}>{data.name}</Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails className={`${classes.row2} ${expand ? null : classes.remove}`}>
        <Link to={data.path.update}>
          <Box className={classes.box}>
            Update {data.name} <ArrowRightIcon />
          </Box>
        </Link>
        <Link to={data.path.addNew}>
          <Box className={`${classes.box} ${classes.boxEven}`}>
            Add New {data.name} <ArrowRightIcon />
          </Box>
        </Link>
        <Link to={data.path.cycleCount}>
          <Box className={classes.box}>
            Cycle Count <ArrowRightIcon />
          </Box>
        </Link>
        <Link to={data.path.list}>
          <Box className={`${classes.box} ${classes.boxEven}`}>
            {data.name} List <ArrowRightIcon />
          </Box>
        </Link>
      </AccordionDetails>
    </Accordion>
  );
}

Tile.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node
};