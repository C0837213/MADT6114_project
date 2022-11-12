import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
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

export const uploadImage = async (uri) => {
  try {
    const fileName = Date.now() + ".jpg";
    const response = await fetch(uri);
    const blobFile = await response.blob();
    const storage = getStorage(app);
    const fileRef = ref(storage, fileName);
    await uploadBytesResumable(fileRef, blobFile);
    return await getDownloadURL(fileRef);
    // const uploadTask = st.uploadBytesResumable(fileRef, blobFile);

    // // Listen for state changes, errors, and completion of the upload.
    // await uploadTask;
    // const url = await st.getDownloadURL(uploadTask.snapshot.ref);
    // return url;
    // .on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //     }
    //   },
    //   (error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case "storage/unauthorized":
    //         console.log("User doesn't have permission to access the object");
    //         break;
    //       case "storage/canceled":
    //         console.log("User canceled the upload");
    //         break;
    //       case "storage/unknown":
    //         console.log("Unknown error occurred, inspect error.serverResponse");
    //         break;
    //     }
    //   },
    //   () => {
    //     // Upload completed successfully, now we can get the download URL
    //     st.getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //       //perform your task
    //       return downloadURL;
    //     });
    //   }
    // );
  } catch (e) {
    console.error(`Error in updateImage-${uri}`, e);
  }
};

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
