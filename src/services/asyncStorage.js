import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_DATA_KEY = "USERS";

export const storeUserData = async (user) => {
  try {
    const currentUserData = getData(USER_DATA_KEY);
    if (Array.isArray(currentUserData)) {
      currentUserData.push(user);
    }
    await AsyncStorage.setItem(USER_DATA_KEY, currentUserData);
  } catch (err) {
    console.log("Error in storeUserData", err);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error in getData", e);
  }
};
