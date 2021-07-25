import React from 'react';

//styles
import './App.css';

//components
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const App = () => {
  return (
    <Container title="Phonebook">
      <ContactForm />
      <Filter />
      <ContactList />
    </Container>
  );
};

export default App;
