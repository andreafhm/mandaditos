import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

var firebaseConfig = {  
  apiKey: "AIzaSyBp1GOPdFk_BY83F9XIXYtWEmhbBrTOgj8",
  authDomain: "aplicativoventas-47fb6.firebaseapp.com",
  projectId: "aplicativoventas-47fb6",
  storageBucket: "aplicativoventas-47fb6.appspot.com",
  messagingSenderId: "263637688733",
  appId: "1:263637688733:web:73f9ae4b9d1f6edf118f74",
  measurementId: "G-1W7359G9DF"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};