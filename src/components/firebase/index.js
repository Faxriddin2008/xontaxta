import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCJP1RXtz6o6WGgW97TqrVN1-k_SNdUclw",
    authDomain: "xontaxta-47ee1.firebaseapp.com",
    projectId: "xontaxta-47ee1",
    storageBucket: "xontaxta-47ee1.appspot.com",
    messagingSenderId: "122637356885",
    appId: "1:122637356885:web:d1d75e5e79ad9e6f99e9dc",
    measurementId: "G-Q8LR34R76T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);


export {db ,storageRef, storage}
