import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBGa-CF50A5Im_WBjPWcXgx-A3x5HYqQf0",
    authDomain: "daily-moments-925b4.firebaseapp.com",
    projectId: "daily-moments-925b4",
    storageBucket: "daily-moments-925b4.appspot.com",
    messagingSenderId: "483870380838",
    appId: "1:483870380838:web:7d8876aa37bed5722f27e7",
    measurementId: "G-T9QXR0G1KV"
  };

  const app = firebase.initializeApp(firebaseConfig);


  export const auth = app.auth()
  export const firestore = app.firestore()
  export const storage = app.storage();
