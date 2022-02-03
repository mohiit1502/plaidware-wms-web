import { TextField, InputAdornment, SvgIcon } from '@mui/material';
import Search from 'assets/images/SearchIcon';

// Note: please add props when integrating
function SearchKeyword() {
  return (
    <>
      <TextField
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SvgIcon fontSize="small" color="action">
                <Search />
              </SvgIcon>
            </InputAdornment>
          )
        }}
        placeholder="Search Keyword"
        variant="outlined"
      />
    </>
  );
}

export default SearchKeyword;
