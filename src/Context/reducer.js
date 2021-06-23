import { TYPES } from './types';

export const initialState = {
  dogInfo: []
};

/* eslint import/no-anonymous-default-export: */
export default (state, action) => {
  const { DOGS } = TYPES;

  switch (action.type) {
    case DOGS:
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
    default:
      return state;
  }
};
