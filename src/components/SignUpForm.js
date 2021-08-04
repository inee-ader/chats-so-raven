import React, { Component } from 'react';

import '../styles/Forms.css'

class SignUpForm extends Component {
  state = {
    email: '',
    password: '', 
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

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSignUp(this.state)
    this.setState({
      email: '', 
      password: '',
    })
  }
  render(){

    return(
      <div className='form_container'>
        <h2 className='form_title'>SIGN UP </h2>
        <form onSubmit={this.onSubmit}>
          <div className='input_div'>
            <input 
              className='form_input'
              type='text' placeholder='Email' 
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
          <button className='form_button' type='submit'>Sign Up</button>
        </form>
        <button className='form_toggle' onClick={this.props.goToLogin}>Already have an account? Go login!</button>
      </div>
    )
  }
}

export default SignUpForm;