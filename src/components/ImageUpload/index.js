import MDBox from 'components/MDBox';
import PropTypes from 'prop-types';
import UploadIcon from 'assets/images/UploadIcon';
import MDTypography from 'components/MDTypography';
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import Placeholder from 'assets/images/placeholder.png';
import { Button } from '@mui/material';
import Close from 'assets/images/Close';

function ImageUpload({ heading, previewImg }) {
  return (
    <>
      <MDBox
        sx={{
          border: '1px solid #c4c4c4',
          borderRadius: pxToRem(8),
          padding: pxToRem(16)
        }}
      >
        <MDBox
          sx={{
            border: '1px dashed #C4C4C4',
            borderRadius: pxToRem(6),
            cursor: 'pointer',
            position: 'relative',
            textAlign: 'center',
            minHeight: pxToRem(200),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <MDBox
            multiple
            component="input"
            name="file"
            type="file"
            sx={{
              width: '100%',
              opacity: '0',
              cursor: 'pointer',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0'
            }}
          />
          <MDBox component="span">
            <UploadIcon />
            <MDTypography
              component="span"
              sx={{ color: '#000', letterSpacing: '0.01em', display: 'block' }}
            >
              {heading}
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* -----------img-preview----------- */}
        <MDBox sx={{ marginBottom: '-10px' }}>
          {previewImg.map((item) => {
            return (
              <MDBox
                key={item}
                component="span"
                sx={{
                  width: '80px',
                  height: '63px',
                  marginRight: '16px',
                  display: 'inline-block',
                  borderRadius: '4px',
                  position: 'relative'
                }}
              >
                <img src={Placeholder} alt="placeholder" width="100%" />
                <Button
                  sx={{
                    backgroundColor: '#fff !important',
                    boxShadow: '0px 1px 1px rgb(0 0 0 / 25%)',
                    padding: '0',
                    minWidth: '20px',
                    minHeight: '20px',
                    borderRadius: '100%',
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    '&:hover': {
                      backgroundColor: 'red !important'
                    }
                  }}
                >
                  <Close />
                </Button>
              </MDBox>
            );
          })}
        </MDBox>
      </MDBox>
    </>
  );
}

export default ImageUpload;
ImageUpload.propTypes = {
  previewImg: PropTypes.array,
  heading: PropTypes.string
};
