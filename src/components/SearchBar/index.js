import { TextField, InputAdornment, SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Search from 'assets/images/SearchIcon';

function SearchBar(props) {
  const { onChange } = props;

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
        onChange={onChange}
      />
    </>
  );
}

SearchBar.propTypes = {
  onChange: PropTypes.func
};
export default SearchBar;
