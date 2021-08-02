import React from 'react';

const TopBar = ({user}) => {
  return (
    <div className='topbar'>
      <h1>Chat's So Raven</h1>
      <h2>{user ? 'Caw caw,  ' + user + '!': '...caw'}</h2>
    </div>
  );
}

export default TopBar;
