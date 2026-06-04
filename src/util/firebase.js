import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { appConfig } from "../../config";
const firebaseConfig = {
  apiKey: appConfig.apiKey,
  authDomain: appConfig.authDomain,
  projectId: appConfig.projectId,
  storageBucket: appConfig.storageBucket,
  messagingSenderId: appConfig.messagingSenderId,
  appId: appConfig.appId,
  measurementId: appConfig.measurementId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
