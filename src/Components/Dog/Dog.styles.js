import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 100
  },
  link: {
    padding: 30,
    textTransform: 'capitalize',
    textAlign: 'end'
  },
  flex: {
    flex: 1
  }
}));

export default useStyles;
