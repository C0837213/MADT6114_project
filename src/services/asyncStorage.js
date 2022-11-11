import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_DATA_KEY = "USERS";

export const storeLocalUserData = async (user) => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    return true;
  } catch (err) {
    console.log("Error in storeLocalUserData", err);
  }
};

export const clearLocalUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
    return true;
  } catch (e) {
    console.log("Error in clearLoadUserData: ", e);
  }
};

export const getLocalUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error in getData", e);
  }
};
