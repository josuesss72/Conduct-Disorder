import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const VerifyUserLoggedAfter = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user);
        //setUserCredent(user);
      } else {
        reject("not Logged User");
        //setLoad(false);
      }
    });
  });
};
