import {
  addDoc,
  collection,
  deleteDoc,
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
const PRO_KEY = "products";

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

const removeData = async (key, item) => {
  try {
    const id = item.id;
    const ref = await doc(db, key, id);
    await deleteDoc(ref, item);
    return true;
  } catch (e) {
    console.error(`Error in removeData-${key}`, e);
  }
};

const updateData = async (key, item) => {
  try {
    const id = item.id;
    const ref = await doc(db, key, id);
    await updateDoc(ref, item);
    return true;
  } catch (e) {
    console.error(`Error in updateData-${key}`, e);
  }
};

const saveData = async (key, val) => {
  try {
    const docRef = await addDoc(collection(db, key), val);
    if (docRef.id) {
      const item = { ...val, id: docRef.id };
      await updateDoc(docRef, item);
      return true;
    }
    return false;
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

export const getAllCats = async () => {
  return await getData(CAT_KEY);
};

export const removeCat = async (item) => {
  return await removeData(CAT_KEY, item);
};

export const updateCat = async (item) => {
  return await updateData(CAT_KEY, item);
};

export const storeNewPro = async (pro) => {
  return await saveData(PRO_KEY, pro);
};
