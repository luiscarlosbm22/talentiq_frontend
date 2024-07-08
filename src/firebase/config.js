
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDSr1QfWkzG9jKZQk_IRN7oUJDsl8Yk6mk",
  authDomain: "cafetin-mern.firebaseapp.com",
  projectId: "cafetin-mern",
  storageBucket: "cafetin-mern.appspot.com",
  messagingSenderId: "721451031455",
  appId: "1:721451031455:web:0984376f6952ca7bc5fbaa"
};

const generarId = () => {
    const random = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return random + fecha;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(file) {
    const storageRef = ref(storage, generarId())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}