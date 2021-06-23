import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, Typography, Link } from '@material-ui/core';

import useStyles from './Dog.styles';
import { useRandomImage } from '../../Hooks';
import { Card } from '../../Components';
import { useDataLayer } from '../../Context/Context';
import { TYPES } from '../../Context/types';

const Dog = props => {
  const [{ dogInfo }, dispatch] = useDataLayer();
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = history.location;
  const [breed, setBreed] = useState('');
  const [type, setType] = useState('');
  const { randomImage } = useRandomImage(breed, type, 4);
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

  const handleClick = () => {
    history.push('/');
  };

  return (
    <Grid container xl={6}>
      <Typography onClick={handleClick} className={classes.link}>
        Home
      </Typography>
      <Grid container className={classes.container}>
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
