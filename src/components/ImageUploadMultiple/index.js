/* eslint-disable no-case-declarations */
import MDBox from 'components/MDBox';
import PropTypes from 'prop-types';
import UploadIcon from 'assets/images/UploadIcon';
import MDTypography from 'components/MDTypography';
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import { Button } from '@mui/material';
import Close from 'assets/images/Close';

function ImageUpload({ heading, accept, multiple, images, setImages }) {
  const addImage = (e) => {
    setImages([
      ...images,
      { src: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] }
    ]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_val, idx) => idx !== index));
  };

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
            component="input"
            name="file"
            disabled={!multiple && images.length}
            accept={accept}
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
            onChange={addImage}
          />
          <MDBox component="span">
            {!multiple && images.length ? null : <UploadIcon />}
            <MDTypography
              component="span"
              sx={{ color: '#000', letterSpacing: '0.01em', display: 'block' }}
            >
              {!multiple && images.length ? 'Cannot add more images' : heading}
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* -----------img-preview----------- */}
        <MDBox sx={{ marginBottom: '-10px' }}>
          {images &&
            images.map((item, idx) => {
              return (
                <MDBox
                  key={idx}
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
                  <img src={item.src} alt="placeholder" width="100%" />
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
                    onClick={() => {
                      removeImage(idx);
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
  images: PropTypes.array,
  heading: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  setImages: PropTypes.func
};