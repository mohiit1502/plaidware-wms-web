import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React example components
import PageLayout from 'layouts/PageLayout';

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from 'context';

import companyImage from 'assets/images/fsr-logo.png';

function AuthLayout({ header, title, description, illustration, children }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <PageLayout background="white">
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { background, white } }) =>
            darkMode ? background.default : white.main
        }}
      >
        <Grid item xs={12} lg={6}>
          <MDBox
            display={{ xs: 'none', lg: 'flex' }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{
              backgroundImage: `url(${illustration})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
        </Grid>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: 'auto' }}>
          <MDBox display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <MDBox py={3} px={3} textAlign="center">
              <MDBox
                display={{ xs: 'none', lg: 'flex' }}
                width="350px"
                height="117px"
                borderRadius="lg"
                ml={2}
                my={5}
                sx={{
                  backgroundImage: `url(${companyImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              />
              {!header ? (
                <>
                  <MDBox mb={1} textAlign="center">
                    <MDTypography variant="h4" fontWeight="bold">
                      {title}
                    </MDTypography>
                  </MDBox>
                  <MDTypography variant="body2" color="text">
                    {description}
                  </MDTypography>
                </>
              ) : (
                header
              )}
            </MDBox>
            <MDBox p={3}>{children}</MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of AuthLayout
AuthLayout.defaultProps = {
  header: '',
  title: '',
  description: '',
  illustration: ''
};

// Typechecking props for the AuthLayout
AuthLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.string
};

export default AuthLayout;
