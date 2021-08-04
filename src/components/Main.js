import React from 'react';

import '../styles/Main.css'

const Main = ({ children, isLoggedIn }) => {

  const backgroundStyle = isLoggedIn ? 'background_loggedIn' : 'background_notLoggedIn'
  
  return (
    <div className={backgroundStyle}>
        { children }
    </div>
  )
}

export default Main