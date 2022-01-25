import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import NextIcon from 'assets/images/NextIcon';
import PreviousIcon from 'assets/images/PreviousIcon';

function TablePagination() {
  return (
    <Stack spacing={2}>
      <Pagination 
        count={10} 
        shape="rounded" 
        color="primary" 
        size="large"  
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: PreviousIcon, next: NextIcon }}
            {...item}
            sx={{
              minWidth:'20px',
              fontWeight:'500',
              height: '30px'
            }}
          />
        )}
      />

    </Stack>
  );
}

export default TablePagination;
