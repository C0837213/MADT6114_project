import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
} from "@firebase/firestore";
import app from "../../firebaseConfig";

const db = getFirestore(app);

const USER_DB_KEY = "users";

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDoc(collection(db, USER_DB_KEY));
    const res = [];
    querySnapshot.forEach((doc) => {
      const item = { ...doc.data(), id: doc.id };
      res.push(item);
    });
    return res;
  } catch (e) {
    console.error("Error in getAllUsers: ", e);
  }
};

export const storeUser = async (user) => {
  try {
    const docRef = await addDoc(collection(db, USER_DB_KEY), user);
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error in storeUser: ", e);
  }
};
