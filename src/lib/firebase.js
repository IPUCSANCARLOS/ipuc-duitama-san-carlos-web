import { initializeApp } from "firebase/app";
import { 
    getAuth,
    GoogleAuthProvider
} from "firebase/auth";

import {
    getFirestore
} from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyDelh_fpbOlwJcSYyeFeznKobKYzxSdzTQ",

    authDomain:
    "emerald-oath-487422-p5.firebaseapp.com",

    projectId:
    "emerald-oath-487422-p5",

    storageBucket:
    "emerald-oath-487422-p5.firebasestorage.app",

    messagingSenderId:
    "879356556095",

    appId:
    "1:879356556095:web:777f35fad45d63190ed98a"

};


// Inicializar Firebase

const app = initializeApp(firebaseConfig);


// Autenticación

export const auth = getAuth(app);


// Proveedor Google

export const googleProvider =
new GoogleAuthProvider();


// Base de datos

export const db =
getFirestore(app);