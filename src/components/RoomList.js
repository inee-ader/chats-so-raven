import React from 'react';
import AddRoomForm from './AddRoomForm'

import '../styles/RoomList.css'

const Room = ({ room, selectedRoom, setRoom }) => {
  const roomStyles = selectedRoom === room.id ? 
    'active_room' : 'room_li'

  return (
    <li className='li_wrapper'>
      <a href='#0' className={roomStyles} onClick={() => setRoom(room.id)}>
        {room.title}
      </a>
    </li>
  )
}

const RoomList = ({ rooms, selectedRoom, setRoom, addRoom, isLoggedIn }) => {

  const roomListStyle = isLoggedIn ? <h2 className='room_menu_title'>NESTS</h2> 
                                  : <h2 className='room_menu_title'>Welcome to the flock...</h2>

  return (
    <div className='room_menu_container'>
      {roomListStyle}
      <ul className='room_ul'>
        {Object.keys(rooms)
               .map(roomKey => ({ ...rooms[roomKey], id: roomKey}))
               .map(roomObj => <Room key={roomObj.id} room={roomObj} selectedRoom={selectedRoom} setRoom={setRoom}/>)
        }
      </ul>
      <div>
        <AddRoomForm addRoom={addRoom} isLoggedIn={isLoggedIn}/>
      </div>
    </div>
  );
}

export default RoomList;
