import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, Typography, Link, CircularProgress } from '@material-ui/core';

import useStyles from './Dog.styles';
import { useRandomImage } from '../../Hooks';
import { Card } from '../../Components';
import { useDataLayer } from '../../Context/Context';
import { TYPES } from '../../Context/types';

const Dog = props => {
  const [{ dogInfo, allDogs }, dispatch] = useDataLayer();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [breed, setBreed] = useState('');
  const [type, setType] = useState('');
  const [next, setNext] = useState('');
  const { randomImage, loading } = useRandomImage(breed, type, 4);
  const { UPDATE_DOG } = TYPES;

  useEffect(() => {
    setBreed(pathname.split('/')[2]);
    setType(pathname.split('/')[3]);
  }, [pathname]);

  useEffect(() => {
    if (randomImage.length > 0) {
      const match = dogInfo.some(dog => dog.breed === breed);

      if (!match) {
        dispatch({
          type: UPDATE_DOG,
          payload: {
            breed,
            type: type ? type : null,
            images: randomImage
          }
        });
      }
    }
  }, [randomImage]);

  useEffect(() => {
    const array = Object.keys(allDogs).filter(dog => dog);
    const index = array.indexOf(breed);
    setNext(array[index + 1]);
  }, [allDogs, breed]);

  const handleClick = () => {
    history.push('/');
  };

  const handleNextClick = dog => {
    history.push(`/dog/${dog}`);
  };

  return (
    <Grid container>
      <Grid container justify="space-between">
        <Typography onClick={handleClick} className={classes.link}>
          Home
        </Typography>
        {next && (
          <Typography onClick={() => handleNextClick(next)} className={classes.link}>
            {`Next - ${next}`}
          </Typography>
        )}
      </Grid>
      <Grid container className={classes.container}>
        {loading && (
          <Grid container justify="center" alignItems="center">
            <CircularProgress size="100px" color="secondary" />
          </Grid>
        )}
        {randomImage.length > 0 &&
          randomImage.map((image, i) => {
            return <Card key={i} src={image} type={type} breed={breed} />;
          })}
      </Grid>
    </Grid>
  );
};

Dog.propTypes = {};

export default Dog;
