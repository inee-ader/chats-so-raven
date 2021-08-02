import React, { Component } from 'react';

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
      <form onSubmit={this.handleAddRoom}>
        <div className='control'>
          <input type='text' placeholder='Room Name' onChange={(e) => this.setState({roomTitle: e.target.value})} className='input' value={this.state.roomTitle}></input>
        </div>
      </form>
    )
  }
}

export default AddRoomForm