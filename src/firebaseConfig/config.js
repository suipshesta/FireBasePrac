import firebase from "firebase";
// import 'firebase/firestore';
// const settings={timestampsInSnapshots:true}

const firebaseConfig = {
    apiKey: "AIzaSyCsbIOy1h0HrXjqu0QnD1xR4Tve5NtUoxo",
    authDomain: "fir-crud-d27d1.firebaseapp.com",
    databaseURL: "https://fir-crud-d27d1-default-rtdb.firebaseio.com",
    projectId: "fir-crud-d27d1",
    storageBucket: "fir-crud-d27d1.appspot.com",
    messagingSenderId: "881849985823",
    appId: "1:881849985823:web:548f9c75b92694a2bf5e2a",
    measurementId: "G-YY30FC9JDT"
  };
  firebase.initializeApp(firebaseConfig);
//   firebase.firestore().settings(settings);
  export default firebase