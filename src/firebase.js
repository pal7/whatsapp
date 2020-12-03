/* import React, { Component }  from 'react';
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script> */
import firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyAtGT_MM9QZY_NYQoTZf-6rXY4bLqe5rXM",
  authDomain: "whatsapp-mern-bd832.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-bd832.firebaseio.com",
  projectId: "whatsapp-mern-bd832",
  storageBucket: "whatsapp-mern-bd832.appspot.com",
  messagingSenderId: "693686342765",
  appId: "1:693686342765:web:d0d80a065f38893b311b64",
  measurementId: "G-KHMZ4Y9RLT"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  //explicit import >>> read!!!
  export default db;