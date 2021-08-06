import React from 'react';
import MessageList from './MessageList'
// import SendMessageForm from './SendMessageForm'

import '../styles/ChatPanel.css'

const ChatPanel = (props) => {
  return (
    <div className='chat_panel_container'>
      <MessageList messages={props.messages} /> 
    </div>
  );
}

export default ChatPanel;
