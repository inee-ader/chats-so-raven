import React, { useState } from 'react'

import useSound from 'use-sound';
import crowSound from '../sounds/crowSound.mp3'

import '../styles/SendMessageForm.css'

function SendMessageForm(props) {
  const soundClip = crowSound
  const [ play ] = useSound(soundClip)

  const [ text, setText ] = useState()
  const handleTextChange = (e) => setText(e.target.value)

  const onMessageSend = (e) => {
    e.preventDefault()
    
    const message={
      created: Date.now(),
      text: text,
      author: props.uid,
      roomId: props.roomId,
      email: props.email
    }
    props.sendMessage(message)
    play()
    setText('')
  }

    return(
      <form className='message_form_container' onSubmit={onMessageSend}>
        <div>
          <input type='text' 
          value={text}
          onChange={handleTextChange}
          className='message_input' placeholder='Caw caw! What is the message?' />
        </div>
      </form>
    )
  }

export default SendMessageForm;
