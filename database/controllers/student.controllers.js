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

export async function createNewStudent(data) {
  try {
    await addDoc(collection(db, "student"), data);
  } catch (error) {
    console.log(error);
  }
}

export async function getStudents(Uid, value) {
  try {
    const collectionRef = collection(db, "student");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    return new Promise((resolve, reject) => {
      onSnapshot(q, (snap) => {
        const arr = snap.docs.map((doc) => {
          const {
            name,
            lastName,
            gender,
            age,
            grade,
            institution,
            note,
            userUid,
          } = doc.data();
          if (
            doc.data().userUid === Uid &&
            institution.toLowerCase().trim() === value.toLowerCase().trim()
          ) {
            return {
              id: doc.id,
              name,
              lastName,
              gender,
              age,
              grade,
              institution,
              note,
              userUid,
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

export async function deleteStudent(id) {
  try {
    const docRef = doc(db, "student", id);
    deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
}
