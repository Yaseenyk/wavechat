
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDOlQuE4qJFXjsIXu4q8k3qallHnYO8CVQ",
  authDomain: "wavechat-daf87.firebaseapp.com",
  projectId: "wavechat-daf87",
  storageBucket: "wavechat-daf87.appspot.com",
  messagingSenderId: "53436666159",
  appId: "1:53436666159:web:41f607502baf491af911da",
  databaseURL: "https://wavechat-daf87-default-rtdb.asia-southeast1.firebasedatabase.app",

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app; 
export { db };
export const storage = getStorage();