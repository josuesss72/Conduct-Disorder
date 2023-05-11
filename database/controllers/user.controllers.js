import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// CONSULTAS A LA BASE DE DATOS DE FIREBASE
export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  return res.exists();
}

export async function registerNewUser(user) {
  try {
    console.log(user);
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.id);
    await setDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
}

export async function getInfoUser(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (err) {
    console.log(err);
  }
}
