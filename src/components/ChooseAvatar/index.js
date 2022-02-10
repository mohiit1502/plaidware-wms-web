import { useState } from 'react';
import { Tabs, Tab, Grid, Box } from '@mui/material';
import TabPanel from 'components/Tabs';
import { makeStyles } from '@mui/styles';
import Avatar1 from 'assets/images/Avatar-1.png';
import Avatar2 from 'assets/images/Avatar-2.png';
import Avatar4 from 'assets/images/Avatar-4.png';
import Avatar5 from 'assets/images/Avatar-5.png';
import Avatar6 from 'assets/images/Avatar-6.png';
import ImageUpload from 'components/ImageUpload';

const useStyles = makeStyles({
  root: {
    '.MuiTabs-root': {
      backgroundColor: 'inherit'
    }
  },
  tabs: {
    '& .MuiButtonBase-root.MuiTab-root': {
      padding: '14.5px 0px',
      border: '1px solid rgba(194, 194, 194, 0.25)',
      borderRadius: '4px',
      backgroundColor: '#fff',
      fontSize: '14px',
      color: '#000 !important',
      letterSpacing: '0.01em',
      lineHeight: '17px',
      position: 'relative'
    },
    '& .MuiButtonBase-root.Mui-selected': {
      color: '#007AFF !important',
      borderBottom: '4px solid #007aff !important'
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    }
  }
});
const previewImg = [1, 2, 3];
function ChooseAvatar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleTabs = (e, val) => {
    setValue(val);
  };
  return (
    <Box sx={{ backgroundColor: '#fff', marginTop: '20px', padding: '20px', width: '50%' }}>
      <Tabs value={value} className={classes.tabs} onChange={handleTabs}>
        <Tab label="Choose from Gallary" />
        <Tab label="Upload your avatar" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            padding: '24px',
            border: '1px solid #c2c2c2',
            borderRadius: '8px',
            marginTop: '8px'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar1} alt="avatar" width="100%" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar2} alt="avatar" width="100%" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar5} alt="avatar" width="100%" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar4} alt="avatar" width="100%" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar5} alt="avatar" width="100%" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar4} alt="avatar" width="100%" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar6} alt="avatar" width="100%" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} sx={{ cursor: 'pointer', display: 'flex' }}>
              <img src={Avatar2} alt="avatar" width="100%" />
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          sx={{
            padding: '24px',
            border: '1px solid #c2c2c2',
            borderRadius: '8px',
            marginTop: '8px'
          }}
        >
          <ImageUpload heading="Upload Avatar" previewImg={previewImg} />
        </Box>
      </TabPanel>
    </Box>
  );
}

export default ChooseAvatar;
