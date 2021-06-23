import { TYPES } from './types';

export const initialState = {
  allDogs: {},
  dogInfo: []
};

/* eslint import/no-anonymous-default-export: */
export default (state, action) => {
  const { UPDATE_DOG, UPDATE_ALL } = TYPES;

  switch (action.type) {
    case UPDATE_DOG:
      const { breed, type, images } = action.payload;
      const newDog = initialState.dogInfo.push({
        breed,
        type,
        images
      });

      return {
        ...state,
        newDog
      };

    case UPDATE_ALL:
      const { allBreeds } = action.payload;

      return {
        ...state,
        allDogs: allBreeds
      };
    default:
      return state;
  }
};
