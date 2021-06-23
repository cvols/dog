import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

export const DataLayer = ({ initialState, reducer, children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>{children}</Context.Provider>
);

DataLayer.propTypes = {
  initialState: PropTypes.shape({}).isRequired,
  reducer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export const useDataLayer = () => useContext(Context);
