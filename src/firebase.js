import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnR6NTfgJGFPmHtwd_ASTv2bZGiN1xmts",
    authDomain: "inventario-otto-klaus-bfe25.firebaseapp.com",
    projectId: "inventario-otto-klaus-bfe25",
    storageBucket: "inventario-otto-klaus-bfe25.appspot.com",
    messagingSenderId: "228799343370",
    appId: "1:228799343370:web:839e13b92a24743ba7a8f3",
    measurementId: "G-SKP6F9KKG3"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;