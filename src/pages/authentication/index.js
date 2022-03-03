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
import bgImage from 'assets/images/roofing-company-houston.jpg';
import { useFormik } from 'formik';

import schema from 'services/ValidationServices';
import { useState } from 'react';

function LoginScreen() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true
    },
    validationSchema: schema.login,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const onFailedLogin = (errorMessage) => {
        resetForm();
        setSubmitting(false);
        setErrorMessage(errorMessage);
      };
      dispatch(
        AuthActions.loginRequest({
          loader: 'login-request',
          slug: API.LOGIN_USER,
          method: 'post',
          data: { email: values.email, password: values.password },
          onFailedLogin
          // data: { email: 'satizkris+1@gmail.com', password: 'mypassword' }
        })
      );
    }
  });

  return (
    <AuthLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
    >
      <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
        <MDBox mb={2}>
          <MDInput
            fullWidth
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            fullWidth
            type="password"
            name="password"
            label="Password"
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
            onClick={formik.handleChange}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>
        <MDTypography mb={2} fontSize={14} textAlign="center" color="error">
          {errorMessage ? errorMessage : ''}
        </MDTypography>
        <MDBox mt={1} mb={1}>
          <MDButton
            fullWidth
            variant="gradient"
            color="info"
            size="large"
            type="submit"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
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
