import React from 'react';
import PropTypes from 'prop-types';
import Login from '../components/Login';

const Main = ({ handleLogin }) => (
  <div>
    <Login handleLogin={handleLogin} />
  </div>
);

Main.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Main;
