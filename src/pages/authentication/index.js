import { useState } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Switch from '@mui/material/Switch';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import AuthLayout from 'layouts/AuthLayout';

import { useDispatch } from 'react-redux';
import AuthActions from 'redux/AuthRedux';
import { API } from 'constant';

// Image
import bgImage from 'assets/images/illustrations/illustration-reset.jpg';

function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const dispatch = useDispatch();
  const onPressLogin = () => {
    dispatch(
      AuthActions.loginRequest({
        loader: 'login-request',
        slug: API.LOGIN_USER,
        method: 'post',
        data: { email: 'satizkris+1@gmail.com', password: 'mypassword' }
      })
    );
  };

  return (
    <AuthLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
    >
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <MDInput fullWidth type="email" label="Email" />
        </MDBox>
        <MDBox mb={2}>
          <MDInput fullWidth type="password" label="Password" />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
            onClick={handleSetRememberMe}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton fullWidth variant="gradient" color="info" size="large" onClick={onPressLogin}>
            sign in
          </MDButton>
        </MDBox>
        <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
            Don&apos;t have an account?{' '}
            <MDTypography
              textGradient
              component={Link}
              to="/authentication/sign-up/cover"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </AuthLayout>
  );
}

export default LoginScreen;
