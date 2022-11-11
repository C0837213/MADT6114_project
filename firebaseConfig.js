import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdAMhVfSXzeMWS9MUMLo3ZoP61m3xDG7g",
  authDomain: "mad6114project.firebaseapp.com",
  projectId: "mad6114project",
  storageBucket: "mad6114project.appspot.com",
  messagingSenderId: "931245656338",
  appId: "1:931245656338:web:ae90eaf4a25cbaf3d20bcb"
};

const app = initializeApp(firebaseConfig);

export default app;
