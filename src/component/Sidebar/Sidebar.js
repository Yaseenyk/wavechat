import React, { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "./Sidebar.module.css";
import NoImg from "../../assets/NoImg.png";
import { AuthContext } from "../../context/AuthContext";
import { query, where } from "firebase/firestore";
import DisplayChats from "../displayChats/DisplayChats";
const Sidebar = () => {
  const auth = getAuth();
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [showData, setShowData] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser)

  //fetching chats

  //  console.log(Object.entries(chats));

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      const searchByName = query(
        collection(db, "users"),
        where("name", ">=", username),
        where("name", "<=", username)
      );
      const querySnapshot = await getDocs(searchByName);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUser(doc.data());
        setShowData(true);
      });
    } catch (err) {}
  };
  const handleKey = (e) => {
    e.code == "Enter" && handleSubmit();
  };

  const HandleChats = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    const response = await getDoc(doc(db, "chats", combinedId));

    if (!response.exists()) {
      // Create an initial chat document
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      // Create user chats
      const currentUserChatInfo = {
        uid: user.uid,
        displayName: user.name,
        photoURL: user.photoURL,
      };

      const otherUserChatInfo = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };

      const userChatsUpdate = {
        [combinedId + ".userInfo"]: currentUserChatInfo,
        [combinedId + ".Date"]: serverTimestamp(),
      };

      const otherUserChatsUpdate = {
        [combinedId + ".userInfo"]: otherUserChatInfo,
        [combinedId + ".Date"]: serverTimestamp(),
      };

      // Update the userChats for both users
      await updateDoc(doc(db, "userChats", currentUser.uid), userChatsUpdate);
      await updateDoc(doc(db, "userChats", user.uid), otherUserChatsUpdate);
    }
    setShowData(false);
    setUsername("");
  };
  return (
    <div className={styles["main-container"]}>
      <div className={styles["navbar-container"]}>
        <div className={styles["navbar-image"]}>
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              className={styles["navbar-profile"]}
            />
          ) : (
            <img src={NoImg} className={styles["navbar-imagDiv"]} />
          )}
        </div>
        <div className={styles["navbar-name"]}>{currentUser.displayName}</div>
        <button onClick={handleSignOut} className={styles["navbar-btn"]}>
          Sign Out
        </button>
      </div>
      <div className={styles["input-search"]}>
        <input
          type="text"
          className={styles["search-block"]}
          placeholder="Search Your Friend"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {showData ? (
        <div className={styles["users-div"]} onClick={HandleChats}>
          <div className={styles["users-list"]}>
            <div className={styles["user-image"]}>
              <img src={user.photoURL} className={styles["navbar-imagDiv"]} />
            </div>
            <div className={styles["user-full-div"]}>
              <div className={styles["user-name"]}>{user.name}</div>
              <div className={styles["user-message"]}>Last Message</div>
            </div>
          </div>
        </div>
      ) : currentUser?.uid ? (
        <DisplayChats />
      ) : (
        <>No Users Found</>
      )}
    </div>
  );
};

export default Sidebar;
