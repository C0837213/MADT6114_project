import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQJd-G9fm_dX3SZPwKRqUAsgRKfAWkSpI",
  authDomain: "mad6114-2.firebaseapp.com",
  projectId: "mad6114-2",
  storageBucket: "mad6114-2.appspot.com",
  messagingSenderId: "835037537039",
  appId: "1:835037537039:web:b1e745dfbe21de1886547a",
};

const app = initializeApp(firebaseConfig);

export default app;
