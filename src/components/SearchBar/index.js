import { TextField, InputAdornment, SvgIcon } from '@mui/material';
import Search from 'assets/images/SearchIcon';

function SearchBar() {
  return (
    <>
      <TextField
        fullWidth
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
