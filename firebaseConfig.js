import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//second
const firebaseConfig = {
  apiKey: "AIzaSyCQJd-G9fm_dX3SZPwKRqUAsgRKfAWkSpI",
  authDomain: "mad6114-2.firebaseapp.com",
  projectId: "mad6114-2",
  storageBucket: "mad6114-2.appspot.com",
  messagingSenderId: "835037537039",
  appId: "1:835037537039:web:b1e745dfbe21de1886547a",
};

//old
const _firebaseConfig = {
  apiKey: "AIzaSyAdAMhVfSXzeMWS9MUMLo3ZoP61m3xDG7g",
  authDomain: "mad6114project.firebaseapp.com",
  projectId: "mad6114project",
  storageBucket: "mad6114project.appspot.com",
  messagingSenderId: "931245656338",
  appId: "1:931245656338:web:ae90eaf4a25cbaf3d20bcb",
};

const app = initializeApp(_firebaseConfig);

export default app;
