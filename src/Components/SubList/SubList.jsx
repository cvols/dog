import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Grid, List as MuiList, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import useStyles from './SubList.styles';

const SubList = ({ breed, type }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (breed, dog) => {
    history.push(`/dog/${breed}/${dog}`);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleOpen}>
        <ListItemText className={classes.capitalize} primary={breed} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {type.map(dog => (
        <Collapse key={dog} in={open} timeout="auto" unmountOnExit onClick={() => handleClick(breed, dog)}>
          <MuiList component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <Grid container>
                <ListItemText className={classes.capitalize} primary={dog} />
              </Grid>
            </ListItem>
          </MuiList>
        </Collapse>
      ))}
    </React.Fragment>
  );
};

SubList.propTypes = {
  breed: PropTypes.string.isRequired,
  type: PropTypes.array.isRequired
};

export default SubList;
