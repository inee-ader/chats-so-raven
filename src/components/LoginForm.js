import React, { Component } from 'react';

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
      <div className='box column is-half'>
        <h2 className='title'>LOGIN</h2> 
        <form onSubmit={this.login}>
          <div className='field'>
            <div className='control'>
              <input 
                className='input'
                type='email'
                placeholder='Email'
                value={this.state.email}
                onChange={this.updateEmail}
              />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <input 
                className='input'
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.updatePassword}
              />
            </div>
          </div>

          <button className='button is-primary is-fullwidth' type='submit'>Login</button>
        </form>
        <button className='button is-text' onClick={this.props.goToSignUp}>Don't have an account? Go signup!</button>
      </div>
    );
  }
}

export default LoginForm;
