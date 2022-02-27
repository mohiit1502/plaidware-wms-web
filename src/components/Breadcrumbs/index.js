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
import { Breadcrumbs as MuiBreadcrumbs, Grid } from '@mui/material';
import ArrowRight from 'assets/images/CarretArrowRightIcon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const buildBreadcrumbs = (route, light) => {
  if (route[0] === 'home') route = [];
  else if (route.length === 1) route = ['home'];
  else {
    route = ['home', ...route];
    route.pop();
  }
  return route.map((el) => (
    <Link to={`/${el}`} key={el}>
      <MDTypography
        component="span"
        variant="button"
        fontWeight="regular"
        textTransform="capitalize"
        color={light ? 'white' : 'dark'}
        sx={{ lineHeight: 0 }}
      >
        {el}
      </MDTypography>
    </Link>
  ));
};

function Breadcrumbs({ title, route, light, children }) {
  return (
    <MDBox
      mr={{ xs: 0, xl: 8 }}
      sx={{
        padding: '12.5px 24px',
        backgroundColor: '#fff'
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
            <MDTypography
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? 'white' : 'dark'}
              sx={{ lineHeight: 0 }}
            >
              {title.replace('-', ' ')}
            </MDTypography>
          </MuiBreadcrumbs>
        </Grid>
        <Grid item md={4} whiteSpace="nowrap" position="absolute" right="16px">
          {children}
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
  children: PropTypes.node
};

export default Breadcrumbs;
