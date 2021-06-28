import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, Typography, CircularProgress } from '@material-ui/core';

import useStyles from './Dog.styles';
import { useRandomImage } from '../../Hooks';
import { Card, Preview } from '../../Components';
import { useDataLayer } from '../../Context/Context';
import { TYPES } from '../../Context/types';

const Dog = () => {
  const [{ dogInfo, allDogs }, dispatch] = useDataLayer();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [breed, setBreed] = useState('');
  const [type, setType] = useState('');
  const [nextDog, setNextDog] = useState('');
  const [dogs, setDogs] = useState([]);
  const { randomImage, loading } = useRandomImage(breed, type, 4);
  const { UPDATE_DOG } = TYPES;
  const [componentDidMount, setComponentDidMount] = useState(false);

  useEffect(() => {
    const breed = pathname.split('/')[2] || null;
    if (breed) {
      setBreed(breed);
    }
    const type = pathname.split('/')[3] || null;
    if (type) {
      setType(type);
    }
  }, [pathname]);

  useEffect(() => {
    if (randomImage.length > 0) {
      dispatch({
        type: UPDATE_DOG,
        payload: {
          breed,
          type: type ? type : null,
          images: randomImage
        }
      });

      if (!componentDidMount) {
        setDogs(randomImage);
        setComponentDidMount(true);
      }
    }
  }, [randomImage]);

  useEffect(() => {
    if (breed) {
      const array = Object.keys(allDogs).filter(dog => dog);
      const index = array.indexOf(breed);
      setNextDog(array[index + 1]);
    }
  }, [allDogs, breed]);

  useEffect(() => {
    const found = dogInfo.find(dog => dog.breed === breed);

    if (found) {
      setDogs(found.images);
    }
  }, [dogInfo, breed]);

  const handleClick = () => {
    history.push('/');
  };

  const handleNextClick = dog => {
    history.push(`/dog/${dog}`);
  };

  return (
    <Grid container>
      <Grid container justify="space-between">
        <Grid container className={classes.flex}>
          <Typography onClick={handleClick} className={classes.link}>
            Home
          </Typography>
        </Grid>
        {nextDog && (
          <Grid container justify="flex-end" className={classes.flex}>
            <Typography onClick={() => handleNextClick(nextDog)} className={classes.link}>
              {`Next - ${nextDog}`}
              <Preview breed={nextDog} type={type} />
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container className={classes.container}>
        {loading && (
          <Grid container justify="center" alignItems="center">
            <CircularProgress size="100px" color="secondary" />
          </Grid>
        )}
        {dogs.length > 0 &&
          dogs.map((image, i) => {
            return <Card key={i} src={image} type={type} breed={breed} />;
          })}
      </Grid>
    </Grid>
  );
};

Dog.propTypes = {};

export default Dog;
