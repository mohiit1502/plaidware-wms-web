import * as React from 'react';
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
  }
});

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

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
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <List component="div" role="list">
      {items.map((value) => {
        const labelId = `transfer-list-item-${value}-label`;

        return (
          <ListItem button key={value} role="listitem" onClick={handleToggle(value)}>
            <ListItemIcon className={classes.unsetwidth}>
              <Checkbox
                disableRipple
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                inputProps={{
                  'aria-labelledby': labelId
                }}
              />
            </ListItemIcon>

            <ListItemText
              id={labelId}
              className={classes.label}
              primary={`Warehouse ${value + 1}`}
            />
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  );

  return (
    <Grid container>
      <Grid item md={5} className={classes.boxStyling}>
        <Typography gutterBottom variant="caption" component="div">
          Unassigned
        </Typography>
        <Divider className={classes.line} />
        {customList(left)}
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
        {customList(right)}
      </Grid>
    </Grid>
  );
}
