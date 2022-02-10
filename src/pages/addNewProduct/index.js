import * as React from 'react';
import { Grid, TextareaAutosize, TextField, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DashboardNavbar from 'components/DashboardNavbar';
import DashboardLayout from 'layouts/DashboardLayout';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ImageUpload from 'components/ImageUpload';
import MDButton from 'components/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CrossIcon from 'assets/images/CrossIcon';

const useStyles = makeStyles({
  labelSize: {
    fontSize: '16px',
    letterSpacing: '0.01em',
    color: '#000',
    marginBottom: '4px',
    lineHeight: '20px'
  },
  textAreaSize: {
    width: '100% !important',
    resize: 'none',
    height: '208px !important',
    boxSizing: 'border-box',
    border: '1px solid #C4C4C4',
    borderRadius: '4px',
    padding: '10px'
  },
  cursorPointer: {
    cursor: 'pointer'
  }
});
const previewImg = [1, 2, 3];
function AddNewProduct() {
  const classes = useStyles();
  const [Manufacturer, setManufacturer] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setManufacturer(event.target.value);
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Box mx={3} my={3}>
          <Box sx={{ backgroundColor: '#fff', padding: '30px' }}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6} md={6}>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Warehouse name
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Description
                  </Box>
                  <TextareaAutosize className={classes.textAreaSize} />
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Manufacturer
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={Manufacturer}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Type
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={Manufacturer}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Unit of Material
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={Manufacturer}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Package Count
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Formal Name
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Size
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={Manufacturer}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Color
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={Manufacturer}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Unit Cost
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Count per Pallet
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Count per Pallet Package
                  </Box>
                  <TextField fullWidth variant="outlined" />
                </Box>
                <Box component="div" sx={{ marginBottom: '24px' }}>
                  <Box component="div" className={classes.labelSize}>
                    Product Family Association
                  </Box>
                  <FormControl fullWidth sx={{ marginBottom: '32px' }}>
                    <Select
                      value={Manufacturer}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <Select
                      value={Manufacturer}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Box>
              <ImageUpload heading="Upload Warehouse Image" previewImg={previewImg} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                columnGap: '20px',
                marginTop: '30px',
                marginBottom: '30px'
              }}
            >
              <MDButton size="large" color="primary" variant="outlined" onClick={handleClickOpen}>
                add custom fields
              </MDButton>
              <MDButton size="large" color="primary" variant="outlined">
                import
              </MDButton>
            </Box>
            <Box
              component="div"
              sx={{
                marginBottom: '30px',
                paddingBottom: '24px',
                borderBottom: '1px solid #C2C2C2',
                color: '#000'
              }}
            >
              Stock Level Triggers
            </Box>
            <Box sx={{ display: 'flex', width: '50%', columnGap: '24px', marginBottom: '30px' }}>
              <Box>
                <Box component="div" className={classes.labelSize}>
                  Under
                </Box>
                <TextField fullWidth variant="outlined" type="number" />
              </Box>
              <Box>
                <Box component="div" className={classes.labelSize}>
                  Over
                </Box>
                <TextField fullWidth variant="outlined" type="number" />
              </Box>
              <Box>
                <Box component="div" className={classes.labelSize}>
                  Alert
                </Box>
                <TextField fullWidth variant="outlined" type="number" />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                columnGap: '20px',
                marginTop: '72px',
                marginBottom: '30px'
              }}
            >
              <MDButton size="medium" color="error" variant="outlined">
                cancel
              </MDButton>
              <MDButton size="medium" color="primary" variant="contained">
                add ITem
              </MDButton>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>

      <Dialog
        keepMounted
        open={open}
        fullWidth={'lg'}
        maxWidth={'lg'}
        sx={{
          backgroundColor: 'rgb(0 0 0 / 5%)'
        }}
      >
        <Box
          sx={{
            textAlign: 'right',
            padding: '10px 20px'
          }}
        >
          <MDButton sx={{ padding: '0px', minWidth: '14px' }} onClick={handleClose}>
            <CrossIcon className={classes.cursorPointer} />
          </MDButton>
        </Box>
        <DialogContent>
          <Box
            sx={{
              paddingLeft: '48px',
              paddingRight: '48px',
              paddingBottom: '50px',
              marginTop: '-20px'
            }}
          >
            <Box
              component="label"
              sx={{
                color: '#000',
                fontSize: '18px',
                marginBottom: '32px',
                fontWeight: '500',
                display: 'block'
              }}
            >
              Add Custom Field
            </Box>
            <Box sx={{ width: '420px' }}>
              <Box component="div" sx={{ marginBottom: '24px' }}>
                <Box component="div" className={classes.labelSize}>
                  Field Name
                </Box>
                <TextField fullWidth variant="outlined" />
              </Box>
              <Box component="div" sx={{ marginBottom: '24px' }}>
                <Box component="div" className={classes.labelSize}>
                  Field Type
                </Box>
                <FormControl fullWidth>
                  <Select
                    value={Manufacturer}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Placeholder</em>;
                      }
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box component="div" sx={{ marginBottom: '24px' }}>
                <Box component="div" className={classes.labelSize}>
                  Add Enumerable List (if applicable)
                </Box>
                <FormControl fullWidth>
                  <Select
                    value={Manufacturer}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Placeholder</em>;
                      }
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                columnGap: '20px',
                marginTop: '40px',
                marginBottom: '60px'
              }}
            >
              <MDButton size="medium" color="error" variant="outlined">
                cancel
              </MDButton>
              <MDButton size="medium" color="primary" variant="outlined">
                Save
              </MDButton>
              <MDButton size="medium" color="primary" variant="contained">
                add field
              </MDButton>
            </Box>
            <Box
              component="div"
              sx={{
                background: '#E5E5E5',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
                fontSize: '16px',
                borderBottom: '1px solid #d9d9d9',
                padding: '8px 16px',
                color: '#000'
              }}
            >
              Custom Fields
            </Box>
            <Box sx={{ border: '3px solid #e5e5e5' }}>
              <Grid container>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '16px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      backgroundColor: '#E5E5E5',
                      textTransform: 'uppercase'
                    }}
                  >
                    Field name
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '16px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      backgroundColor: '#E5E5E5',
                      textTransform: 'uppercase'
                    }}
                  >
                    field type
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '16px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      backgroundColor: '#E5E5E5',
                      textTransform: 'uppercase'
                    }}
                  >
                    Enumerable list
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '14px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    Dummy data
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '14px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    Dummy data
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Box
                    sx={{
                      fontSize: '14px',
                      padding: '10px 0px',
                      textAlign: 'center',
                      color: '#000',
                      border: '1px solid #E5E5E5'
                    }}
                  >
                    Dummy data
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewProduct;
