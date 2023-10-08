import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import styles from "../Sidebar/Sidebar.module.css";
import { db } from "../../config/firebase.js";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";

const DisplayChats = () => {
  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext)
  const [chats, setChats] = useState();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  if (!chats) {
    return null;
  }

  const handleSelect = (user)=>{
        dispatch({type:"CHANGE_USER",payload:user})
  }
  return (
    <>
      {Object.entries(chats)?.map((chat) => (
        <div className={styles["users-div"]} key={chat[0]} onClick={(user)=>handleSelect(chat[1].userInfo)}>
          <div className={styles["users-list"]}>
            <div className={styles["user-image"]}>
              <img
                src={chat[1].userInfo?.photoURL}
                className={styles["navbar-imagDiv"]}
              />
            </div>
            <div className={styles["user-full-div"]}>
              <div className={styles["user-name"]}>
                {chat[1].userInfo?.displayName}
              </div>
              <div className={styles["user-message"]}>
                {chat[1].lastMessage?.text}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DisplayChats;
