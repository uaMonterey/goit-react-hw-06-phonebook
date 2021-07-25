import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import initialContacts from './data/contacts.json';
import PropTypes from 'prop-types';
import './App.css';

//components
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

class App extends Component {
  static propTypes = {
    initialContacts: PropTypes.array,
  };

  state = {
    contacts: initialContacts,
    filter: '',
  };

  onFormContact = ({ name, number }) => {
    const { contacts } = this.state;

    const contact = {
      name: name,
      number: number,
      id: uuidv4(),
    };

    contacts.some(
      ({ name }) => contact.name.toLowerCase() === name.toLowerCase(),
    )
      ? alert('go home')
      : contacts.some(
          ({ number }) => contact.number.toLowerCase() === number.toLowerCase(),
        )
      ? alert('go home suckers')
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };
  suckers;

  onContactDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onContactFilter = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    const currentContacts = this.onContactFilter();
    const { filter } = this.state;

    return (
      <Container title="Phonebook">
        <ContactForm onSubmit={this.onFormContact} />

        {currentContacts.length > 0 && (
          <Filter filter={filter} getFilter={this.getFilter} />
        )}

        {currentContacts.length > 0 && (
          <ContactList
            onContactDelete={this.onContactDelete}
            contacts={currentContacts}
          />
        )}
      </Container>
    );
  }
}

export default App;
