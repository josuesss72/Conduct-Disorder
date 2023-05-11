import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

export async function createNewStudent(data) {
  try {
    await addDoc(collection(db, "student"), data);
  } catch (error) {
    console.log(error);
  }
}

export async function getStudents(Uid) {
  try {
    const collectionRef = collection(db, "student");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    return new Promise((resolve, reject) => {
      onSnapshot(q, (snap) => {
        const arr = snap.docs.map((doc) => {
          if (doc.data().userUid === Uid) {
            return {
              id: doc.id,
              name: doc.data().name,
              lastName: doc.data().lastName,
              gender: doc.data().gender,
              age: doc.data().age,
              grade: doc.data().grade,
              institution: doc.data().institution,
              note: doc.data().note,
              userUid: doc.data().userUid,
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
