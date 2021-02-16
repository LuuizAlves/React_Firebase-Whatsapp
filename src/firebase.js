import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA8lIEIiCDeeVxivqPKuYUP7zMxNwZ_Z1k",
    authDomain: "whatsapp---clone-61473.firebaseapp.com",
    databaseURL: "https://whatsapp---clone-61473.firebaseio.com",
    projectId: "whatsapp---clone-61473",
    storageBucket: "whatsapp---clone-61473.appspot.com",
    messagingSenderId: "96422048440",
    appId: "1:96422048440:web:64c7342b9875f408cd3a4d",
    measurementId: "G-1EM82C4X1C"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;