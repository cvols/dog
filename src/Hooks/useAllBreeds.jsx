import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllBreeds = () => {
  const [allBreeds, setAllBreeds] = useState({});

  useEffect(() => {
    axios
      .get('https://dog.ceo/api/breeds/list/all')
      .then(({ data }) => setAllBreeds(data.message))
      .catch(console.error);
  }, []);

  return { allBreeds };
};

export default useAllBreeds;
