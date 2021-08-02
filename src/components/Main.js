import React from 'react';

const Main = ({ children }) => {
  return (
    <div className='column hero'>
      <div className='hero-body'>
        <div className='columns is-centered'>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Main