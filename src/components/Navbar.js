import React from 'react';
import ravenHead from '../images/ravenHead.png'

const Navbar = () => {
  return (
    <nav className='navbar is-black' role='navigation'>
      <div className='navbar-brand'>
        <img alt='raven head icon' src={ravenHead}/>
        <p className='title is-1'>Chat's so Raven</p>
      </div>
        <p className='subtitle is-3'>Caw caw!</p>
    </nav>
  );
}

export default Navbar;
