import { TYPES } from './types';

export const initialState = {
  allDogs: {},
  dogInfo: []
};

/* eslint import/no-anonymous-default-export: */
export default (state, action) => {
  const { UPDATE_DOG, UPDATE_ALL, PREVIEW_DOG } = TYPES;
  const { breed, type, images, allBreeds } = action.payload;
  let { dogInfo } = state;

  switch (action.type) {
    case UPDATE_DOG:
      const index = dogInfo.findIndex(dog => dog.breed === breed);

      // find the existing dog with one preview image and add 3 images
      if (index >= 0) {
        let copy = [...dogInfo];
        const oldImage = copy[index].images;
        const newImages = images.slice(0, 3);
        const combinedImages = [...oldImage, ...newImages];
        copy[index] = {
          ...copy[index],
          images: combinedImages
        };

        dogInfo = copy;
      } else {
        dogInfo.push({ breed, type, images });
      }

      return {
        ...state,
        dogInfo
      };
    case UPDATE_ALL:
      return {
        ...state,
        allDogs: allBreeds
      };
    case PREVIEW_DOG:
      // add one dog from preview
      dogInfo.push({ breed, type, images });

      return {
        ...state
      };
    default:
      return state;
  }
};
