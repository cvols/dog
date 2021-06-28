import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';

import { useRandomImage } from '../../Hooks/';
import { useDataLayer } from '../../Context/Context';
import { TYPES } from '../../Context/types';

const Preview = ({ breed, type }) => {
  const [{ dogInfo }, dispatch] = useDataLayer();
  const { randomImage, loading } = useRandomImage(breed, null, 1);
  const { PREVIEW_DOG } = TYPES;
  const [previewDog, setPreviewDog] = useState('');

  useEffect(() => {
    if (randomImage.length > 0) {
      dispatch({
        type: PREVIEW_DOG,
        payload: {
          breed,
          type,
          images: randomImage,
          preview: true
        }
      });

      setPreviewDog(randomImage[0]);
    }
  }, [randomImage]);

  useEffect(() => {
    const found = dogInfo.find(dog => dog.breed === breed);

    if (found) {
      setPreviewDog(found.images);
    }
  }, [dogInfo, breed]);

  useEffect(() => {
    if (previewDog.length === 4) {
      setPreviewDog(previewDog[0]);
    }
  }, [previewDog]);

  if (loading) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress size="20" color="secondary" />
      </Grid>
    );
  }

  return (
    <Grid container justify="flex-end">
      <img src={previewDog} alt={`${breed} Preview`} height="100px" />
    </Grid>
  );
};

Preview.propTypes = {
  breed: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Preview;
