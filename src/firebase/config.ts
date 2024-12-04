import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCozgCWeQ974l3UqxU2D82iNmtr-aFBBmU",
    authDomain: "virtual-tree-2e904.firebaseapp.com",
    projectId: "virtual-tree-2e904",
    storageBucket: "virtual-tree-2e904.firebasestorage.app",
    messagingSenderId: "145886426654",
    appId: "1:145886426654:web:08be535853060738f4a00f",
    measurementId: "G-Z9DT9SXX4Y"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 