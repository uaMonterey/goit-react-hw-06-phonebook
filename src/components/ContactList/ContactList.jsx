import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ contacts, onContactDelete }) => {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, id, number }) => (
        <li className={s.item} key={id}>
          <div className={s.wrap}>
            <span className={s.name}>
              {name} : {number}
            </span>
            <button
              className={s.button}
              onClick={() => onContactDelete(id)}
              type="button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default ContactList;
