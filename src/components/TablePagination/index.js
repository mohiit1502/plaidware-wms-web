import * as React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import NextIcon from 'assets/images/NextIcon';
import PreviousIcon from 'assets/images/PreviousIcon';

function TablePagination({ count, page, setPage }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        shape="rounded"
        color="primary"
        size="large"
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: PreviousIcon, next: NextIcon }}
            {...item}
            sx={{
              minWidth: '20px',
              fontWeight: '500',
              height: '30px'
            }}
          />
        )}
        onChange={(event, value) => {
          setPage(value);
        }}
      />
    </Stack>
  );
}

TablePagination.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  setPage: PropTypes.any
};

export default TablePagination;
