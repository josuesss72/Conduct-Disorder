import Constants from "expo-constants";

export const firebaseConfig = {
  apiKey: Constants.manifest?.extra && Constants.manifest?.extra.apiKey,
  authDomain: Constants.manifest?.extra && Constants.manifest?.extra.authDomain,
  projectId: Constants.manifest?.extra && Constants.manifest?.extra.projectId,
  storageBucket:
    Constants.manifest?.extra && Constants.manifest?.extra.storageBucket,
  messagingSenderId:
    Constants.manifest?.extra && Constants.manifest?.extra.messagingSenderId,
  appId: Constants.manifest?.extra && Constants.manifest?.extra.appId,
};
