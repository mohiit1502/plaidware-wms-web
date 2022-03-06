import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TableBody, TableCell, TableRow } from '@mui/material';
import BasicTable from 'components/BasicTable';
import TabPanel from 'components/Tabs';
import EditIcon from '@mui/icons-material/Edit';
import "./PwTablePanel.component.scss";

const PwTablePanel = props => {
  const {backgroundColor, classes, color, headCells, id, index, navUrl, records, table, value} = props;
  const navigate = useNavigate();

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  }));

  const rowRenders = ({records, headers, navUrl, table}) => {
    return records && records.map((record, keyouter) => {
      return <StyledTableRow key={record.id + '-' + keyouter}>
        {headers.map((columnConfig, key) => {
          const canEdit = columnConfig.isEditAnchor;
          const isAfter = columnConfig.placement && columnConfig.placement === 'after';
          const limitWidth = columnConfig.limitWidth;
          return <TableCell key={key} className={`${isAfter ? 'position-relative pe-5' : ''}${limitWidth ? ' overflow-auto ' + classes.limitWidth : ''}`}
            onClick={() => canEdit && navigate(navUrl, {state: {[table]: record}})}>
            {canEdit
              ? isAfter
                ? <span className={classes.iconwrap}>
                  {columnConfig.value(record)}
                  <EditIcon className={classes.iconSize + ' ' + classes.rightPlaced}/>
                </span>
                : <span className={classes.iconwrap}>
                  <EditIcon className={classes.iconSize}/>
                  {columnConfig.value(record)}
                </span>
              : <span>{columnConfig.value(record)}</span>}
          </TableCell>;
        }
        )}
      </StyledTableRow>;
    });
  };

  return <TabPanel id={`c-PwTablePanel-${index}`} value={value} index={index} className={classes.radialBorder}>
    <BasicTable
      id={id}
      headCells={headCells}
      backgroundColor={backgroundColor || '#007AFF'}
      color={color || '#fff'}
    >
      <TableBody>
        {records && records.length > 0 && rowRenders({records, headers: headCells, navUrl, table})}
      </TableBody>
    </BasicTable>
    {(!records || records.length === 0)
      && <p className="mx-3 my-5 d-flex justify-content-center align-items-center h4">No Records to Display</p>}
  </TabPanel>
};

PwTablePanel.propTypes = {
  backgroundColor: PropTypes.string,
  classes: PropTypes.string,
  color: PropTypes.string,
  headCells: PropTypes.array,
  id: PropTypes.string,
  index: PropTypes.number,
  navUrl: PropTypes.string,
  records: PropTypes.array,
  table: PropTypes.string,
  value: PropTypes.number
};

export default PwTablePanel;