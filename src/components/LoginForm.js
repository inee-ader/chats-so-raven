import React, { Component } from 'react';

import '../styles/Forms.css'

class LoginForm extends Component {

  state = {
    email: '',
    password: ''
  }

  updateEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  updatePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  login = (e) => {
    e.preventDefault()
    this.props.onLogin(this.state)
    this.setState({
      email: '', 
      password: ''
    })
  }

  render() {
    return (
      <div className='form_container'>
        <h2 className='form_title'>LOGIN</h2> 
        <form onSubmit={this.login}>
          <div className='input_div'>
            <input 
              className='form_input'
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.updateEmail}
            />
          </div>
          <div className='input_div'>
            <input 
              className='form_input'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.updatePassword}
            />
          </div>

          <button className='form_button' type='submit'>Login</button>
        </form>
        <button className='form_toggle' onClick={this.props.goToSignUp}>Don't have an account? Go signup!</button>
      </div>
    );
  }
}

export default LoginForm;
