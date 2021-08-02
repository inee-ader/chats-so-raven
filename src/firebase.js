import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDuqJqJHET3r-ua0x9TB4HzKwsoMXs6C90",
  authDomain: "chats-so-raven.firebaseapp.com",
  projectId: "chats-so-raven",
  storageBucket: "chats-so-raven.appspot.com",
  messagingSenderId: "186198831766",
  appId: "1:186198831766:web:f1f0c7f0f1b8137c8e08b7",
  measurementId: "G-2ZDLPWPKVZ"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebaseApp.auth()
export const messageRef = firebaseApp.database().ref('messages')
export const roomRef = firebaseApp.database().ref('rooms')
export default firebaseApp