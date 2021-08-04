import React from 'react';
import RoomList from './RoomList'

import '../styles/SideBar.css'

const SideBar = ({ rooms, logout, selectedRoom, setRoom, addRoom, isLoggedIn }) => {

  const logoutStyles = isLoggedIn === false ? 
    'hidden_button' : 'sidebar_logout_button'

  return (
    <div className='sidebar' style={{ padding: '10px' }}>
      <RoomList rooms={rooms} selectedRoom={selectedRoom} setRoom={setRoom} addRoom={addRoom} isLoggedIn={isLoggedIn}/>
      
      <div className='sidebar_logout_button_container'>
        <button className={logoutStyles} onClick={logout} >Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
