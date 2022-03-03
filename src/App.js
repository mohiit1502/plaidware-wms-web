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

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import LoginScreen from 'pages/authentication';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
// import MDBox from 'components/MDBox';

// Material Dashboard 2 PRO React example components
import Sidenav from 'components/Sidenav';
// import Configurator from 'components/Configurator';

// Material Dashboard 2 PRO React themes
import theme from 'assets/theme';

// Material Dashboard 2 PRO React Dark Mode themes
import themeDark from 'assets/theme-dark';

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav /*, setOpenConfigurator*/ } from 'context';

// Images
// import brandWhite from 'assets/images/logo-ct.png';
// import brandDark from 'assets/images/logo-ct-dark.png';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import PublicRoutes from 'routes/PublicRoutes';
import reduxStore from './redux/Store';
import { protectedRoutes as routes } from './routes/index';
import PrivateRoute from './routes/PrivateRoute';
// import MDAlert from 'components/MDAlert';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    // openConfigurator,
    sidenavColor,
    // transparentSidenav,
    // whiteSidenav,
    darkMode
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return (
          <Route
            path={route.route}
            element={<PrivateRoute component={route.component} />}
            key={route.key}
          />
        );
      }

      return null;
    });

  // const configsButton = (
  //   <MDBox
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     width="3.25rem"
  //     height="3.25rem"
  //     bgColor="white"
  //     shadow="sm"
  //     borderRadius="50%"
  //     position="fixed"
  //     right="2rem"
  //     bottom="2rem"
  //     zIndex={99}
  //     color="dark"
  //     sx={{ cursor: 'pointer' }}
  //     onClick={handleConfiguratorOpen}
  //   >
  //     <Icon fontSize="small" color="inherit">
  //       settings
  //     </Icon>
  //   </MDBox>
  // );

  return (
    <Provider store={reduxStore.store}>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === 'dashboard' && (
            <>
              <Sidenav
                color={sidenavColor}
                // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Plaidware"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              {/* <Configurator /> */}
              {/* {configsButton} */}
            </>
          )}
          {/* {layout === 'vr' && <Configurator />} */}
          <Routes>
            <Route path="/" element={<PublicRoutes component={<LoginScreen />} />} />
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {/* <MDAlert dismissible><span>Submitted Successfully!</span></MDAlert> */}
        </ThemeProvider>
        <ToastContainer position="bottom-right" />
      </PersistGate>
    </Provider>
  );
}
