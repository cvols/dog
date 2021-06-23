import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { useDataLayer } from '../Context/Context';

const useRandomImage = (breed, type, number) => {
  const [randomImage, setRandomImage] = useState('');
  const [{ dogInfo }] = useDataLayer();

  useEffect(() => {
    if (!breed || !number) return;

    if (dogInfo.length > 0) {
      const match = dogInfo.filter(dog => dog.breed === breed);

      if (match.length > 0) {
        return setRandomImage(match[0].images);
      }
    }

    if (breed && type && number) {
      return axios
        .get(`https://dog.ceo/api/breed/${breed}/${type}/images/random/${number}`)
        .then(({ data }) => {
          const { message, status } = data;

          if (status === 'success') {
            setRandomImage(message);
          }
        })
        .catch(console.error);
    }

    if (breed && number) {
      return axios
        .get(`https://dog.ceo/api/breed/${breed}/images/random/${number}`)
        .then(({ data }) => {
          const { message, status } = data;

          if (status === 'success') {
            setRandomImage(message);
          }
        })
        .catch(console.error);
    }
  }, [breed, type, number]);

  return { randomImage };
};

useRandomImage.propTypes = {
  breed: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default useRandomImage;
