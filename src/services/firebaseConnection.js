import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyADc1VT10WlqynHQdLTV5_vUGbvtE7mUhc",
    authDomain: "chamados-be299.firebaseapp.com",
    projectId: "chamados-be299",
    storageBucket: "chamados-be299.appspot.com",
    messagingSenderId: "65541900394",
    appId: "1:65541900394:web:ad8bdd7a73ad118ff76213",
    measurementId: "G-7B96KJHY3V"
  };
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
  