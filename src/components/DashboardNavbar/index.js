/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid';

// react-router components
// import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import AuthActions from 'redux/AuthRedux';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
// import MDInput from 'components/MDInput';
// import MDBadge from 'components/MDBadge';

// Material Dashboard 2 PRO React example components
// import Breadcrumbs from 'components/Breadcrumbs';
import NotificationItem from 'components/NotificationItem';

// import InputAdornment from '@mui/material/InputAdornment';

// Custom styles for DashboardNavbar
import {
  // navbar,
  // navbarContainer,
  // navbarRow,
  navbarIconButton,
  // navbarDesktopMenu,
  navbarMobileMenu
} from 'components/Navbars/DashboardNavbar/styles';

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav
  // setOpenConfigurator
} from 'context';
// import SearchBar from 'components/SearchBar';
// import { Box, Typography } from '@mui/material';
import { Box } from '@mui/material';

// import FSRServicesLogo from 'assets/images/fsrServicesLogo.png';

const useStyles = makeStyles(() => ({
  overlayStyle: {
    position: 'absolute',
    top: '80px',
    marginTop: '0px',
    '& .MuiBackdrop-root': {
      top: '60px'
    },
    '& .MuiPaper-root': {
      top: '-16px !important'
    }
  }
}));

function DashboardNavbar({ absolute, light, isMini /*, children*/ }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, /*openConfigurator,*/ darkMode } =
    controller;
  // const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  // const route = useLocation().pathname.split('/').slice(1);
  const dispatchLogout = useDispatch();
  const handleLogout = () => dispatchLogout(AuthActions.logout());
  const classes = useStyles();
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, fixedNavbar && window.scrollY === 0 && !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  // const handleOpenMenu = (event) => {
  //   handleCloseMenu();
  //   setOpenMenu(event.currentTarget);
  // };
  const handleCloseMenu = () => {
    // setOpenMenu(false);
    setOpenProfileMenu(null);
  };

  const showProfileMenu = (event) => {
    // setOpenMenu(false);
    setOpenProfileMenu(event.currentTarget);
  };

  // // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'left'
  //     }}
  //     className={classes.overlayStyle}
  //     open={Boolean(openMenu)}
  //     sx={{ mt: 2 }}
  //     onClose={handleCloseMenu}
  //   >
  //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
  //     <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
  //     <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
  //   </Menu>
  // );

  // Render the profile menu
  const renderProfileMenu = () => (
    <Menu
      anchorEl={openProfileMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      className={classes.overlayStyle}
      open={Boolean(openProfileMenu)}
      sx={{ mt: 2 }}
      onClose={handleCloseMenu}
    >
      <NotificationItem icon={<Icon>logout</Icon>} title="Logout" onClick={handleLogout} />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    }
  });

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      top={top ? '0' : navbarType}
      color="inherit"
      className="header"
      // sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Box
        sx={{
          paddingTop: '8px',
          paddingBottom: '8px',
          marginBottom: '5px',
          boxShadow: '0px 1px 4px rgb(0 0 0 / 8%)',
          width: '100% !important'
          // background: 'linear-gradient(90deg, #2d373c 1%, #ffffff 100%)'
        }}
      >
        <Toolbar className="custom-header">
          {isMini ? null : (
            <MDBox display="flex" width="100% !important" max-width="100% !important">
              <MDBox
                sx={{ width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center' }}
                pr={3}
              >
                {/* <img
                  src={FSRServicesLogo}
                  alt="FSR services logo"
                  style={{
                    height: '2.3em'
                  }}
                />
                <Typography sx={{ color: '#fff', marginLeft: '60px' }}>We Know Roofing</Typography> */}
              </MDBox>
              <MDBox display="flex" color={light ? 'white' : 'inherit'}>
                <IconButton
                  disableRipple
                  size="small"
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon sx={iconsStyle} fontSize="medium">
                    {miniSidenav ? 'menu_open' : 'menu'}
                  </Icon>
                </IconButton>
                {/* <IconButton
                  disableRipple
                  size="small"
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon sx={iconsStyle}>settings</Icon>
                </IconButton> */}
                {/* <IconButton
                  disableRipple
                  size="small"
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <MDBadge circular badgeContent={9} color="error" size="xs">
                    <Icon sx={iconsStyle}>notifications</Icon>
                  </MDBadge>
                </IconButton> */}
                {/* {renderMenu()} */}
                <IconButton
                  disableRipple
                  size="small"
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={showProfileMenu}
                >
                  <Avatar alt="user name" src="/images/avatar.jpg" sx={{ width: 24, height: 24 }} />
                </IconButton>
                {renderProfileMenu()}
              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </Box>
      {/* <Toolbar variant="dense">
        <MDBox color="inherit" mb={{ xs: 2, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light}>
            {children}
          </Breadcrumbs>
        </MDBox>
      </Toolbar> */}
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  children: PropTypes.node
};

export default DashboardNavbar;
