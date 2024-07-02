import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCcdRIMGBSbw8vfsx_E9UfmNkAHhaRobrc",
  authDomain: "application1-nextjs.firebaseapp.com",
  projectId: "application1-nextjs",
  storageBucket: "application1-nextjs.appspot.com",
  messagingSenderId: "529007515947",
  appId: "1:529007515947:web:0764e9f223c50815bf0d6e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const database = app.firestore();

export default database;
