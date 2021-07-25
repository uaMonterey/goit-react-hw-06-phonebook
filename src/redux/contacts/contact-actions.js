import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/add', ({ name, number }) => ({
  payload: {
    name,
    number,
    id: uuidv4(),
  },
}));

export const deleteContact = createAction('contacts/delete');
export const changeFilter = createAction('contacts/changeFilter');
