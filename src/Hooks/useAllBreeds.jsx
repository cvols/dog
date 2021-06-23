import { useState, useEffect } from 'react';
import axios from 'axios';

import { useDataLayer } from '../Context/Context';

const useAllBreeds = () => {
  const [allBreeds, setAllBreeds] = useState({});
  const [{ allDogs }] = useDataLayer();

  useEffect(() => {
    if (Object.keys(allDogs).length > 0) {
      return setAllBreeds(allDogs);
    }

    axios
      .get('https://dog.ceo/api/breeds/list/all')
      .then(({ data }) => setAllBreeds(data.message))
      .catch(console.error);
  }, []);

  return { allBreeds };
};

export default useAllBreeds;
