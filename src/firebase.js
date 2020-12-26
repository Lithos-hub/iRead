const firebase = require("firebase/app");


require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

// var firebaseConfig = {                                   ==> Cambiar
//   apiKey: "AIzaSyCtuZi57ADofGwxSdsPt7ANIE5s5v1kgR0",
//   authDomain: "login-with-andfacebook.firebaseapp.com",
//   databaseURL: "https://login-with-andfacebook.firebaseio.com",
//   projectId: "login-with-andfacebook",
//   storageBucket: "login-with-andfacebook.appspot.com",
//   messagingSenderId: "625649514324",
//   appId: "1:625649514324:web:97fde37d5adf27ad543ac1"
// };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  ////////////////////////////////////////////////////
  
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  

  //////////////////////////////////
  
  export {firebase, db, auth, storage}