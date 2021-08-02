import React, { Component } from 'react';

class SignUpForm extends Component {
  state = {
    email: '',
    password: '', 
    // displayName: ''
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
  // updateDisplayName = (e) => {
  //   this.setState({
  //     displayName: e.target.value
  //   })
  // }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSignUp(this.state)
    this.setState({
      email: '', 
      password: '',
      // displayName: ''
    })
  }
  render(){

    return(
      <div className='box column is-half'>
        <h2 className='title'>SIGN UP </h2>
        <form onSubmit={this.onSubmit}>
          <div className='field'>
            <div className='control'>
              <input 
                className='input'
                type='text' placeholder='Email' 
                value={this.state.email}
                onChange={this.updateEmail}
              />
            </div>
          </div>
          {/* <input 
            type='text'
            placeholder='Display Name'
            value={this.state.displayName}
            onChange={this.updateDisplayName}
          /> */}
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
          <button className='button is-fullwidth is-primary' type='submit'>Sign Up</button>
        </form>
        <button className='button is-text' onClick={this.props.goToLogin}>Already have an account? Go login!</button>
      </div>
    )
  }
}

export default SignUpForm;