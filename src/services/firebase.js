import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";

import {
  uploadBytesResumable,
  getStorage,
  ref,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebaseConfig";
import { storeUserData } from "./asyncStorage";

const db = getFirestore(app);
const storage = getStorage(app);

const USER_DB_KEY = "users";
const CAT_KEY = "categories";
const PRO_KEY = "products";
const ORDER_KEY = "orders";
const CART_KEY = "carts"

export const uploadImage = async (uri) => {
  try {
    const type = uri.split(".")[1];
    const fileName = Date.now() + type;
    const response = await fetch(uri);
    const blobFile = await response.blob();
    const storage = getStorage(app);
    const fileRef = ref(storage, fileName);
    await uploadBytesResumable(fileRef, blobFile);
    return await getDownloadURL(fileRef);
  } catch (e) {
    console.error(`Error in updateImage-${uri}`, e);
  }
};

const getData = async (key) => {
  try {
    const querySnapshot = await getDocs(collection(db, key));
    const res = [];
    querySnapshot.forEach((doc) => {
      const item = { ...doc.data() };
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

export const getUserOrders = async (uid) => {
  try {
    const q = query(collection(db, ORDER_KEY), where("uid", "==", uid));
    const snap = await getDocs(q);
    const res = [];
    snap.forEach((doc) => {
      const item = { ...doc.data() };
      res.push(item);
    });
    return res;
  } catch (error) {
    console.error(`Error in getUserOrders- ${uid}`, error);
  }
};

export const getProductById = async (id) => {
  try {
    const q = query(collection(db, PRO_KEY), where("id", "==", id));
    const snap = await getDocs(q);
    let item;
    snap.forEach((doc) => {
      item = { ...doc.data() };
    });
    return item;
  } catch (error) {
    console.error(`Error in getProductById- ${id}`, error);
  }
};

export const getUserOrderByOrderId = async (id) => {
  try {
    const q = query(collection(db, ORDER_KEY), where("id", "==", id));
    const snap = await getDocs(q);
    let order;
    snap.forEach((doc) => {
      order = { ...doc.data() };
    });
    return order;
  } catch (error) {
    console.error(`Error in getUserOrderByOrderId - ${id}`, error);
  }
};

export const getUserData = async (id) => {
  try {
    const q = query(collection(db, USER_DB_KEY), where("id", "==", id));
    const snap = await getDocs(q);
    let user;
    snap.forEach((doc) => {
      user = { ...doc.data() };
    });
    return user;
  } catch (error) {
    console.error(`Error in getUserData-${id}`, error);
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

export const getAllProds = async () => {
  return await getData(PRO_KEY);
};

export const removeProd = async (item) => {
  return await removeData(PRO_KEY, item);
};

export const updateProd = async (item) => {
  return await updateData(PRO_KEY, item);
};

export const updateOrder = async (item) => {
  return await updateData(ORDER_KEY, item);
};

export const createNewOrder = async (item) => {
  return await saveData(ORDER_KEY, item);
};

export const addToCart = async (item) => {
  return await saveData(CART_KEY, item)
}

export const updateCart = async (item) => {
  return await updateData(CART_KEY, item)
}

export const getCart = async () => {
  return await getData(CART_KEY)
}

export const getOrder = async () => {
  return await getData(ORDER_KEY)
}