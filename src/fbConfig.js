import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
firebase.initializeApp(firebaseConfig);

// firebase.firestore();
firebase.analytics();

export default firebase;
export const firestore = firebase.firestore()