import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    margin: '10px auto'
  },
  media: {
    height: 300
  },
  capitalize: {
    textTransform: 'capitalize'
  }
}));

export default useStyles;
