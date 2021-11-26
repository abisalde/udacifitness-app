import {RECEIVE_ENTRIES, ADD_ENTRY} from './actionTypes';

export const receiveEntries = entries => {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  };
};

export const addEntry = entry => {
  return {
    type: ADD_ENTRY,
    entry,
  };
};
