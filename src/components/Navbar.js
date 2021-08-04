import React from 'react';
// import ravenHead from '../images/ravenWhite.png'
import ravenMagic from '../images/ravenMagic.png'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar' role='navigation'>
      <div className='navbar_content'>
        <img className='navbar_icon' alt='raven icon' src={ravenMagic}/>
        <h1 className='navbar_title'>CHAT'S SO RAVEN</h1>
      </div>
    </nav>
  );
}

export default Navbar;
