import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 24px #0000000d'
  },
  hoverChange: {
    '&:hover': {
      backgroundColor: '#007aff',
      color: 'white',
      '& svg': {
        '& path': {
          fill: '#fff'
        }
      }
    }
  },
  row1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    textAlign: 'center',
    margin: '0 auto',
    '& svg': {
      marginBottom: '12px'
    }
  },
  column: {
    flexDirection: 'column'
  },
  row2: {
    display: 'grid',
    opacity: '1',
    gridTemplateColumns: ' repeat(2, 1fr)',
    gridTemplateRows: ' repeat(2, 1fr)',
    fontSize: '14px'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '13px 0 13px 10px',
    borderTop: '1px solid lightgray',
    '& svg': {
      opacity: '0'
    },
    '&:hover': {
      color: '#007aff',
      cursor: 'pointer',
      '& svg': {
        opacity: '1'
      }
    }
  },
  boxEven: {
    borderLeft: ' 1px solid lightgray'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '25px'
  },
  name: {
    marginLeft: '5px',
    fontSize: '20px'
  },
  row1Svg: {
    alignItems: 'unset',
    position: 'relative',
    top: '15px',
    '& svg': {
      width: '30px',
      height: '30px'
    }
  },
  fullHeight: {
    height: '230px'
  },
  remove: {
    display: 'none'
  }
});

export default useStyles;
