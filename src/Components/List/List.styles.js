import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#282c34',
    color: 'white'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  list: {
    textTransform: 'capitalize',
    height: 48
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flex: 1,
    flexDirection: 'column',
    position: 'sticky',
    top: 0
  },
  logoText: {
    marginBottom: 50,
    color: '#61dafb'
  }
}));

export default useStyles;
