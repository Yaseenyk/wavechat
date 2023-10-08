import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

const ChatDisplay = ({message}) => {
  
    const {currentUser} =useContext(AuthContext);
    const{data} = useContext(ChatContext)
    console.log(message.text)
  return (
    <div>
      <div>{message.text}</div>
    </div>
  )
}

export default ChatDisplay;
