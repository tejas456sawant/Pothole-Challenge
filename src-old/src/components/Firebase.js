import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAMuASlils7V-68CRJuF0gThzeWceAHJ74",
    authDomain: "potholedata.firebaseapp.com",
    databaseURL: "https://potholedata.firebaseio.com",
    projectId: "potholedata",
    storageBucket: "potholedata.appspot.com",
    messagingSenderId: "493303262905",
    appId: "1:493303262905:web:357675d9566eaa29d3b568",
    measurementId: "G-79S49CNT6P"
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;