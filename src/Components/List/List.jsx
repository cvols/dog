import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, List as MuiList, ListItem, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './List.styles';
import { SubList } from '../../Components';
import { useAllBreeds } from '../../Hooks';
import { useDataLayer } from '../../Context/Context';
import { TYPES } from '../../Context/types';
import dogLogo from '../../assets/dog-api-logo.svg';

const List = () => {
  const [{ allDogs }, dispatch] = useDataLayer();
  const { allBreeds } = useAllBreeds({});
  const history = useHistory();
  const classes = useStyles();
  const { UPDATE_ALL } = TYPES;

  const handleClick = breed => {
    history.push(`/dog/${breed}`);
  };

  useEffect(() => {
    if (Object.keys(allDogs).length > 0) return;

    if (Object.keys(allBreeds).length > 0) {
      return dispatch({
        type: UPDATE_ALL,
        payload: {
          allBreeds
        }
      });
    }
  }, [allBreeds]);

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
            <ListItem className={classes.list} key={breed} onClick={() => handleClick(breed)}>
              {breed}
            </ListItem>
          );
        })}
      </MuiList>
      <Grid className={classes.container}>
        <Typography variant="h1" className={classes.logoText}>Dog API</Typography>
        <img src={dogLogo} alt="Dog API" />
      </Grid>
    </Grid>
  );
};

List.propTypes = {};

export default List;
