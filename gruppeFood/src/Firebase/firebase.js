import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAasIYdqF0Uq80AM47mD1y1AlbynvFczeM",
    authDomain: "gruppefood-aa32c.firebaseapp.com",
    projectId: "gruppefood-aa32c",
    storageBucket: "gruppefood-aa32c.appspot.com",
    messagingSenderId: "714299402280",
    appId: "1:714299402280:web:d994eb8ad22d6f3022ed1d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app); // Inicialize o módulo de armazenamento

export const auth = getAuth(app)
export { db, storage }