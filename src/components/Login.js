import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
  marginTop: 50,
  width: 300,
  height: 260,
  margin: 20,
  padding: 20,
  textAlign: 'center',
  display: 'block',
  alignSelf: 'center',
};

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleEmailOnChange = this.handleEmailOnChange.bind(this);
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.props.handleLogin({
      email: this.email.input.value,
      password: this.password.input.value,
    });
  }

  handleEmailOnChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordOnChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <Paper style={style} zDepth={2}>
        <form onSubmit={this.handleOnSubmit}>
          <TextField
            floatingLabelText="Email"
            ref={input => this.email = input}
            value={this.state.email}
            onChange={this.handleEmailOnChange}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            ref={input => this.password = input}
            value={this.state.password}
            onChange={this.handlePasswordOnChange}
          />
          <RaisedButton primary fullWidth type="submit" style={{ marginTop: 30 }}>
            <span style={{ color: '#fff' }}>Login</span>
          </RaisedButton>
        </form>
      </Paper>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
