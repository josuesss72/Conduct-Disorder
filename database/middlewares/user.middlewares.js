import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { KEY_TOKEN } from "../../utils/keyStorage";
import { db } from "../firebase";

export const VerifyToken = async () => {
  const token = await AsyncStorage.getItem(KEY_TOKEN);
  return new Promise((resolve, reject) => {
    if (token) {
      resolve(true);
    }
    reject(false);
  });
};

export const setTokenStorage = async (token) => {
  await AsyncStorage.setItem(KEY_TOKEN, token);
};

export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  return res.exists();
}
