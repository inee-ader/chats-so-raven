import React, { useEffect, useRef } from 'react';
import moment from 'moment';

import '../styles/MessageList.css'

const Message = ({ message }) => {
  
  const username = message.email.substring(0, message.email.indexOf('@')).toUpperCase()

  return(
    <li className='list_li'>
      <div className='list_content'>
        <p className='list_text'>{message.text}</p>
        <p className='list_time'>
          {username} @ {moment(message.created).format('h:mm a')}
        </p>
      </div>
    </li>
  )
}

const MessageList = ({ messages }) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

    return(
      <div className='ul_div'>
        <ul className='list_ul'>
          {Object.keys(messages)
                  .map(messageKey => ({...messages[messageKey], id: messageKey}))
                  .map(message => <Message key={message.id} message={message}/>)
          }
        </ul>
        <div ref={messagesEndRef} />
      </div>
    )
}

export default MessageList;
