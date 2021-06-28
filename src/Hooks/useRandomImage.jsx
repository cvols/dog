import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { useDataLayer } from '../Context/Context';

const useRandomImage = (breed, type, number) => {
  const [randomImage, setRandomImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [{ dogInfo }] = useDataLayer();

  useEffect(() => {
    if (!breed || !number) return;

    // don't make api call if we have images for the dog already
    const found = dogInfo.find(dog => dog.breed === breed);
    if (found?.images.length === 4) return;

    if (breed && type && number) {
      setLoading(true);

      return axios
        .get(`https://dog.ceo/api/breed/${breed}/${type}/images/random/${number}`)
        .then(({ data }) => {
          const { message, status } = data;

          if (status === 'success') {
            setRandomImage(message);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }

    if (breed && number) {
      setLoading(true);

      return axios
        .get(`https://dog.ceo/api/breed/${breed}/images/random/${number}`)
        .then(({ data }) => {
          const { message, status } = data;

          if (status === 'success') {
            setRandomImage(message);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [breed, type, number]);

  return { randomImage, loading };
};

useRandomImage.propTypes = {
  breed: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default useRandomImage;
