import React, { Component } from 'react';

import '../styles/AddRoomForm.css'

class AddRoomForm extends Component {

  state = {
    roomTitle: ''
  }

  handleAddRoom = (e) => {
    e.preventDefault()
    this.props.addRoom(this.state.roomTitle)
    this.setState({roomTitle: ''})
  }

  render(){
    return (
      <div className={this.props.isLoggedIn ? 'display_room_form' : 'hide_room_form'} >
        <form onSubmit={this.handleAddRoom}>
          <h5 className='add_room_h'>Add Nest</h5>
          <div className='add_room_div'>
            <input type='text' placeholder='Room Name' onChange={(e) => this.setState({roomTitle: e.target.value})} className='add_room_input' value={this.state.roomTitle}></input>
          </div>
        </form>
      </div>
    )
  }
}

export default AddRoomForm