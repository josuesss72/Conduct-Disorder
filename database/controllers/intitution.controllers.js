import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

export async function postNewInstition(data) {
  try {
    await addDoc(collection(db, "institution"), data);
  } catch (error) {
    console.log(error);
  }
}

export async function getInstitution(uid) {
  try {
    const collectionRef = collection(db, "institution");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    return new Promise((resolve, reject) => {
      onSnapshot(q, (snap) => {
        const arr = snap.docs.map((doc) => {
          if (doc.data().userUid === uid) {
            return {
              id: doc?.id,
              name: doc.data().name,
              userUid: doc.data().userUid,
              createdAt: doc.data().createdAt,
            };
          }
        });
        resolve(arr);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteInstitution(id) {
  try {
    const docRef = doc(db, "institution", id);
    deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
}
