import React from 'react';
import { connect } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contact-actions';

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

const getCurrentContacts = (contacts, filter) => {
  const normalizeFilterRequest = filter.toLowerCase().trim();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilterRequest),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getCurrentContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onContactDelete: id => dispatch(deleteContact(id)),
});

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
