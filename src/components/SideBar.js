import React from 'react';
import RoomList from './RoomList'

const SideBar = ({ rooms, logout, selectedRoom, setRoom, addRoom }) => {
  return (
    <div className='column is-3 hero is-primary' style={{ padding: '10px' }}>
      <RoomList rooms={rooms} selectedRoom={selectedRoom} setRoom={setRoom} addRoom={addRoom}/>
      
      <div className='control'>
        <button className='button is-fullwidth is-info' onClick={logout} >Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
