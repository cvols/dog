import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, List as MuiList, ListItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './List.styles';
import { SubList } from '../../Components';
import { useAllBreeds } from '../../Hooks';

const List = () => {
  const { allBreeds } = useAllBreeds({});
  const history = useHistory();
  const classes = useStyles();

  const handleClick = breed => {
    history.push(`/dog/${breed}`);
  };

  return (
    <Grid container>
      <MuiList className={classes.root}>
        {Object.entries(allBreeds).map((entry, i) => {
          const breed = entry[0];
          const type = entry[1];

          if (type.length > 0) {
            return <SubList key={breed} breed={breed} type={type} />;
          }

          return (
            <ListItem className={classes.capitalize} key={breed} onClick={() => handleClick(breed)}>
              {breed}
            </ListItem>
          );
        })}
      </MuiList>
    </Grid>
  );
};

List.propTypes = {};

export default List;
