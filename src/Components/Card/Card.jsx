import React from 'react';
import PropTypes from 'prop-types';
import { Card as MuiCard, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import useStyles from './Card.styles';

const Card = ({ src, type, breed }) => {
  const classes = useStyles();

  return (
    <MuiCard className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={src} title={type} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.capitalize}>
            {type ? type : breed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
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
  type: PropTypes.string.isRequired
};

export default Card;
