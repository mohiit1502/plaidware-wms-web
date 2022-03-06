import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { makeStyles } from '@mui/styles';
import {intersection, not, notBy, intersectionBy} from 'services/Utils';

const useStyles = makeStyles({
  boxStyling: {
    boxShadow: 'none',
    borderRadius: '5px',
    border: '1px solid #c2c2c2',
    padding: '8px'
  },
  label: {
    '& .MuiTypography-root': {
      fontSize: '12px'
    }
  },
  line: {
    backgroundImage: 'none',
    margin: '0 -8px',
    width: 'calc(100% + 16px)',
    backgroundColor: '#c2c2c2'
  },
  unsetwidth: {
    minWidth: 'unset',
    '& .MuiCheckbox-root': {
      paddingLeft: '0px'
    }
  },
  maxHeight: {
    maxHeight: '20rem',
    overflow: 'auto'
  }
});

export default function TransferList({list, initlist, matchProp, onChange}) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(list || []);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    if (initlist) {
      const initlistClone = typeof initlist === 'object' ? initlist : initlist.split(',');
      const left = notBy(matchProp, list, initlistClone);
      const right = intersectionBy(matchProp, list, initlistClone);
      setLeft(left);
      setRight(right);
    }
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    const rightNew = right.concat(left);
    const leftNew = [];
    setRight(rightNew);
    setLeft(leftNew);
    onChange({unassigned: leftNew, assigned: rightNew});
  };

  const handleCheckedRight = () => {
    const rightNew = right.concat(leftChecked);
    const leftNew = not(left, leftChecked);
    setRight(rightNew);
    setLeft(leftNew);
    setChecked(not(checked, leftChecked));
    onChange({unassigned: leftNew, assigned: rightNew});
  };

  const handleCheckedLeft = () => {
    const rightNew = not(right, rightChecked);
    const leftNew = left.concat(rightChecked);
    setLeft(leftNew);
    setRight(rightNew);
    setChecked(not(checked, rightChecked));
    onChange({unassigned: leftNew, assigned: rightNew});
  };

  const handleAllLeft = () => {
    const rightNew = [];
    const leftNew = left.concat(right);
    setLeft(leftNew);
    setRight(rightNew);
    onChange({unassigned: leftNew, assigned: rightNew});
  };

  const customList = items => (
    <List component="div" role="list" className={classes.maxHeight}>
      {items.map((item, key) => {
        const value = item.name;
        const labelId = `transfer-list-item-${value}-label`;

        return (
          <ListItem button key={value + '-' + key} role="listitem" onClick={handleToggle(item)}>
            <ListItemIcon className={classes.unsetwidth}>
              <Checkbox
                disableRipple
                checked={checked.indexOf(item) !== -1}
                tabIndex={-1}
                inputProps={{
                  'aria-labelledby': labelId
                }}
              />
            </ListItemIcon>

            <ListItemText
              id={labelId}
              className={classes.label}
              primary={`${value}`}
            />
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  );

  return (
    <Grid container className="flex-fill">
      <Grid item md={5} className={classes.boxStyling}>
        <Typography gutterBottom variant="caption" component="div">
          Unassigned
        </Typography>
        <Divider className={classes.line} />
        {left && customList(left) }
      </Grid>
      <Grid item md={2}>
        <Grid container direction="column" alignItems="center">
          <IconButton
            sx={{ my: 0.5, color: '#000' }}
            variant="outlined"
            size="small"
            disabled={left.length === 0}
            aria-label="move all right"
            onClick={handleAllRight}
          >
            &gt;&gt;
          </IconButton>
          <IconButton
            sx={{ my: 0.5, color: '#000' }}
            variant="outlined"
            size="small"
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
            onClick={handleCheckedRight}
          >
            &gt;
          </IconButton>
          <IconButton
            sx={{ my: 0.5, color: '#000' }}
            variant="outlined"
            size="small"
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
            onClick={handleCheckedLeft}
          >
            &lt;
          </IconButton>
          <IconButton
            sx={{ my: 0.5, color: '#000' }}
            variant="outlined"
            size="small"
            disabled={right.length === 0}
            aria-label="move all left"
            onClick={handleAllLeft}
          >
            &lt;&lt;
          </IconButton>
        </Grid>
      </Grid>
      <Grid item md={5} className={classes.boxStyling}>
        <Typography gutterBottom variant="caption" component="div">
          Assigned
        </Typography>
        <Divider className={classes.line} />
        {right && customList(right)}
      </Grid>
    </Grid>
  );
}

TransferList.propTypes = {
  initlist: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  list: PropTypes.array,
  matchProp: PropTypes.object,
  onChange: PropTypes.func
};
