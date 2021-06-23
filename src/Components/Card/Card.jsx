import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card as MuiCard, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

import useStyles from './Card.styles';
import funFacts from '../../funFacts';

const getFunFact = () => {
  const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return funFact;
};

const Card = ({ src, type, breed }) => {
  const classes = useStyles();
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    setFunFact(getFunFact());
  }, []);

  return (
    <MuiCard className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={src} title={type} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.capitalize}>
            {type ? type : breed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {funFact}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </MuiCard>
  );
};

Card.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default Card;
