import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../../redux/contacts/contact-actions';
import PropTypes from 'prop-types';

import s from './ContactForm.module.css';

const initialState = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    number: PropTypes.string,
  };

  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { contactList, onSubmit } = this.props;

    if (
      contactList.some(
        contact => name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    if (contactList.some(contact => number === contact.number)) {
      alert(`${number} is already in contacts.`);
      return;
    }

    onSubmit(this.state);
    // this.setState({ name: '', number: '' });
    this.reset();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <form className={s.form__contact} onSubmit={this.handleSubmit}>
        <label className={s.label} htmlFor="input name">
          <p className={s.title}>Name</p>
          <input
            className={s.input}
            value={this.state.name}
            onChange={this.handleInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={s.label} htmlFor="input number">
          <p className={s.title}>Number</p>
          <input
            className={s.input}
            value={this.state.number}
            onChange={this.handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button className={s.button} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contactList: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => dispatch(addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
