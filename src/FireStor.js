// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig1 = {
    apiKey: "AIzaSyAPbYxhhQfUHcu9QQclYdByVwGwkxc6JlA",
    authDomain: "test-js-file-1499c.firebaseapp.com",
    projectId: "test-js-file-1499c",
    storageBucket: "test-js-file-1499c.appspot.com",
    messagingSenderId: "27191205509",
    appId: "1:27191205509:web:3f866e1326d6c8fe9793ec"
};

// Initialize Firebase
const appFireStore = initializeApp(firebaseConfig1, 'app1');
export const storage = getStorage(appFireStore);


