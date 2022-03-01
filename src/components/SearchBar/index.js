import { TextField, InputAdornment, SvgIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Search from 'assets/images/SearchIcon';

function SearchBar() {

  const useStyles = makeStyles(() => ({
    textField: {
      '& legend': {
        width: 0
      }
    }
  }));

  const classes = useStyles();

  return (
    <>
      <TextField
        fullWidth
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <Search />
              </SvgIcon>
            </InputAdornment>
          )
        }}
        placeholder="Search"
        variant="outlined"
      />
    </>
  );
}
export default SearchBar;
