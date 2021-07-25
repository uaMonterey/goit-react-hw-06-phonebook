import React from 'react';
import { connect } from 'react-redux';
import { changeFilter } from '../../redux/contacts/contact-actions';

import PropTypes from 'prop-types';

import s from './Filter.module.css';

const Filter = ({ getFilter, filter }) => {
  return (
    <label className={s.label}>
      <p className={s.title}>Find contact by name</p>
      <input
        className={s.input}
        onChange={getFilter}
        value={filter}
        type="text"
        name="name"
        required
      />
    </label>
  );
};

const mapStateToProps = state => ({
  value: state.filter,
});

const mapDispatchToProps = dispatch => ({
  getFilter: e => dispatch(changeFilter(e.target.value)),
});

Filter.propTypes = {
  getFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
