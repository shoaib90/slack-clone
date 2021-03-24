// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA5_DKGmyK79Kcu6MEwJO6HInfVO34OWpM",
    authDomain: "slack-clone-7706a.firebaseapp.com",
    projectId: "slack-clone-7706a",
    storageBucket: "slack-clone-7706a.appspot.com",
    messagingSenderId: "417112318263",
    appId: "1:417112318263:web:75ccf4681c272d6445fab2",
    measurementId: "G-W3QKNBHPNL"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth(); //To provide authentication
const provider = new firebase.auth.GoogleAuthProvider(); //To implement o-auth

export {auth,db, provider };