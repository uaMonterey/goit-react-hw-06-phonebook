import { combineReducers } from 'redux';

import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, changeFilter } from './contact-actions';
import intialContacts from 'data/contacts.json';

const items = createReducer(intialContacts, {
  [addContact]: (state, action) => [action.payload, ...state],
  [deleteContact]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
});
const filter = createReducer('', {
  [changeFilter]: (_, action) => action.payload,
});

export default combineReducers({
  items,
  filter,
});
