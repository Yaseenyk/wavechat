import React, { useState, useEffect, useContext } from "react";
import { onSnapshot, doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import ChatDisplay from "../chatdisplay/ChatDisplay";
import { ChatContext } from "../../context/ChatContext";
import { v4 as uuid } from 'uuid';
import { AuthContext } from "../../context/AuthContext";
import styles from './ChatView.module.css';
import SendChat from '../../assets/SendChat.png'
const Chatbox = () => {
  const[text,setText]=useState('');
  const [messages, setMessages] = useState([]);
  const {currentUser} = useContext(AuthContext)
  const { data } = useContext(ChatContext);
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);
  const handleSendData = async() => {
    await updateDoc(doc(db,'chats',data.chatId),{
      messages:arrayUnion({
        id:uuid(),
        text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
      })
    })
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']:serverTimestamp()
    });
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']:serverTimestamp()
    })
    setText('')
  };

  return (
    <div className={styles['main-chatbox-container']}>
      <div className={styles['chatbox-container']}>
      {messages.map((m) => (
        <ChatDisplay message={m} key={m.id}/>
      ))}
      </div>
      <div className={styles['input-block']}>
      <input type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
      <button onClick={handleSendData}><img src={SendChat}/></button>
      </div>
    </div>
  );
};

export default Chatbox;
