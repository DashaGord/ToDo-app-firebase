// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig2 = {
    apiKey: "AIzaSyBfkI40o2z9uHdtC4AE2fv5jucxJHK6NLI",
    authDomain: "todo-app-firebase-a28cd.firebaseapp.com",
    projectId: "todo-app-firebase-a28cd",
    storageBucket: "todo-app-firebase-a28cd.appspot.com",
    messagingSenderId: "548265311569",
    appId: "1:548265311569:web:ae6b0f7225d123f48b2770"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig2, 'app2');
export const db = getFirestore(firebaseApp);

