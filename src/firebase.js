import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBf9DLmMZZGxPQ-Mkyx9iQzkt5--7dgbKk",
  authDomain: "ema-jhon-simple-2.firebaseapp.com",
  databaseURL: "https://ema-jhon-simple-2-default-rtdb.firebaseio.com",
  projectId: "ema-jhon-simple-2",
  storageBucket: "ema-jhon-simple-2.appspot.com",
  messagingSenderId: "1034207369525",
  appId: "1:1034207369525:web:dc85e2e7de8ba4bed3947c",
});

export const auth = app.auth();
export default app;