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

// react-router-dom components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs, Grid, Toolbar } from '@mui/material';
import ArrowRight from 'assets/images/CarretArrowRightIcon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const buildBreadcrumbs = (route, light) => {
  return route.map((el) => {
    return el.path ? (
      <Link to={el.path} key={el}>
        <MDTypography
          component="span"
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ lineHeight: 0 }}
        >
          {el.name}
        </MDTypography>
      </Link>
    ) : (
      <MDTypography
        variant="button"
        fontWeight="regular"
        textTransform="capitalize"
        color={light ? 'white' : 'dark'}
        key={el}
        sx={{ lineHeight: 0 }}
      >
        {el.name}
      </MDTypography>
    );
  });
};

function Breadcrumbs({ route, light, children }) {
  return (
    <Toolbar variant="dense">
      <MDBox
        mr={{ xs: 0, xl: 8 }}
        sx={{
          padding: '12.5px 24px'
          // backgroundColor: '#fff'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <MuiBreadcrumbs
              sx={{
                '& .MuiBreadcrumbs-separator': {
                  color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
                  padding: '0 8px'
                }
              }}
              separator={<ArrowRight height={15} width={15} />}
            >
              {buildBreadcrumbs(route, light)}
            </MuiBreadcrumbs>
          </Grid>
          <Grid item md={4} whiteSpace="nowrap" position="absolute" right="16px">
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </Toolbar>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
  children: PropTypes.node
};

export default Breadcrumbs;
