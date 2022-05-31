import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyB-Kk22UbbzhO7_IRycD6ld31H6otntMmM",
    authDomain: "reactchat-65b1d.firebaseapp.com",
    projectId: "reactchat-65b1d",
    storageBucket: "reactchat-65b1d.appspot.com",
    messagingSenderId: "954252040648",
    appId: "1:954252040648:web:39b4d33468f0c58c6308fd",
    measurementId: "G-K7BGDXHPVC"
  }).auth();