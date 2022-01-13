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

// Material Dashboard 2 PRO React base styles
import typography from 'assets/theme-dark/base/typography';
import borders from 'assets/theme-dark/base/borders';
import colors from 'assets/theme-dark/base/colors';

// Material Dashboard 2 PRO React helper functions
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import rgba from 'assets/theme-dark/functions/rgba';

const { size } = typography;
const { white } = colors;
const { borderWidth, borderColor } = borders;

export default {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.md,
      color: rgba(white.main, 0.8)
    },

    dividers: {
      borderTop: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
      borderBottom: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`
    }
  }
};
