import { makeStyles } from "@material-ui/core";

export default makeStyles({
  table: {

  },
  ratingPage: {
    padding: '20px',
    boxSizing: 'border-box',
  },
  childTable: {
    width: '100%',
    paddingBottom: '20px',
  },
  place: {
    padding: '10px',
    backgroundColor: 'gray',
    borderRadius: '5px',
    '&.first': { color: 'yellow' },
    '&.second': { color: 'silver' },
    '&.third': { color: 'orange' },
  },
  row: {
    paddingBottom: '20px',
    borderBottom: '2px blak solid',
    '&:nth-child(2n)': {
      backgroundColor: '#dadada',
    }
  },
}, { index: 1 });
