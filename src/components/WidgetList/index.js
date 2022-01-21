import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import LOGGER from 'services/Logger';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

const useStyles = makeStyles({
  main: {
    display: 'grid',
    gap: '1.75rem',
    width: '100%',
    height: '100%',
    gridTemplateColumns: 'repeat(4, minmax(100px, calc(25% - 30px)))',
    backgroundColor: '#f9f9f9',
    padding: '20px 0',
    '@media (max-width: 800px)': {
      gridTemplateColumns: 'repeat(2, minmax(100px, calc(50% - 30px)))'
    }
  },
  root: {
    borderRadius: '9px',
    padding: '10px 0',
    backgroundColor: 'white',
    marginBottom: '15px',
    paddingLeft: '15px',
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#007aff',
      color: 'white'
    }
  },
  parent: {
    borderTop: '3px solid #007aff'
  },
  subRoot: {
    width: '90%'
  },
  pad: {
    paddingLeft: '25px'
  },
  border: {
    borderLeft: '1px solid lightgray'
  }
});

export default function WidgetList({ childList }) {
  const classes = useStyles();
  let border = false;
  return (
    <Box className={classes.main}>
      {' '}
      {childList.map((child) => {
        return (
          <>
            <Box
              key={child.parentName}
              className={`${border ? classes.border : null} ${classes.pad}`}
            >
              <Box
                className={`${classes.root} ${parent ? classes.parent : null}`}
                onClick={() => LOGGER.log(child.path)}
              >
                {child.parentName}{' '}
              </Box>{' '}
              {child.childList.map((subChildren) => {
                const [anchorEl, setAnchorEl] = React.useState(null);
                const open = Boolean(anchorEl);
                const handleClick = (event) => {
                  setAnchorEl(event.currentTarget);
                };
                const handleClose = () => {
                  setAnchorEl(null);
                };
                return (
                  <>
                    <Box
                      disableElevation
                      id="demo-customized-button"
                      aria-controls={open ? 'demo-customized-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      variant="contained"
                      key={subChildren.name}
                      className={`${classes.root} ${
                        subChildren.subChildren ? classes.parent : null
                      }`}
                      onClick={handleClick}
                    >
                      {subChildren.name}{' '}
                    </Box>{' '}
                    {subChildren.subChildren ? (
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          'aria-labelledby': 'demo-customized-button'
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        {subChildren.subChildren.map((subChild) => {
                          return (
                            <MenuItem
                              key={subChild.name}
                              className={`${classes.root} ${classes.subRoot}`}
                              onClick={() => LOGGER.log(subChild.path)}
                            >
                              {subChild.name}
                            </MenuItem>
                          );
                        })}{' '}
                      </StyledMenu>
                    ) : null}
                  </>
                );
              })}{' '}
            </Box>
            {(border = true)}
          </>
        );
      })}{' '}
    </Box>
  );
}

WidgetList.propTypes = {
  childList: PropTypes.arrayOf(
    PropTypes.shape({
      parentName: PropTypes.string.isRequired,
      path: PropTypes.string,
      childList: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          subChildren: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              path: PropTypes.string
            })
          )
        })
      )
    })
  ).isRequired
};
