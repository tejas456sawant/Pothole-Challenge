import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDNYbYQzKwhsPZ1OY_nhoEB_jH3gqHaVA4",
  authDomain: "pothole-4423a.firebaseapp.com",
  databaseURL: "https://pothole-4423a.firebaseio.com",
  projectId: "pothole-4423a",
  storageBucket: "pothole-4423a.appspot.com",
  messagingSenderId: "751017735585",
  appId: "1:751017735585:web:05fd720141dfca1e6807e0",
  measurementId: "G-HJ11C09MC6"
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;