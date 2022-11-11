import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";
import app from "../../firebaseConfig";
import { storeUserData } from "./asyncStorage";

const db = getFirestore(app);

const USER_DB_KEY = "users";
const CAT_KEY = "categories";

const getData = async (key) => {
  try {
    const querySnapshot = await getDocs(collection(db, key));
    const res = [];
    querySnapshot.forEach((doc) => {
      const item = { ...doc.data(), id: doc.id };
      res.push(item);
    });
    return res;
  } catch (e) {
    console.error(`Error in getData-${key}`, e);
  }
};

const saveData = async (key, val) => {
  try {
    const docRef = await addDoc(collection(db, key), val);
    const item = { ...val, id: docRef.id };
    const ref = doc(db, CAT_KEY, item.id);
    await updateDoc(ref, item);
    return true;
  } catch (e) {
    console.error(`Error in saveData- ${key}: `, e);
  }
};

export const getAllUsers = async () => {
  return await getData(USER_DB_KEY);
};

export const storeUser = async (user) => {
  return saveData(USER_DB_KEY, user);
};

export const storeNewCat = async (cat) => {
  return await saveData(CAT_KEY, cat);
};
