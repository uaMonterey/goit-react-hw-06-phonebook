import React from 'react';
import { connect } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contact-actions';

import PropTypes from 'prop-types';

import s from './ContactList.module.css';

const ContactList = ({ allContacts, onContactDelete }) => {
  return (
    <ul className={s.list}>
      {allContacts.map(({ name, id, number }) => (
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
  const normalizedFilter = filter.toLowerCase().trim();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  allContacts: getCurrentContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onContactDelete: id => dispatch(deleteContact(id)),
});

ContactList.propTypes = {
  allContacts: PropTypes.array.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
