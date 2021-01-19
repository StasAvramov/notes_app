import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ROUTES } from './constants/routes';

const firebaseConfig = {
  apiKey: 'AIzaSyD816F_RsLNULSgNRV7BUmkKgJprQGeu-I',
  authDomain: 'notes-react-app-cd4a7.firebaseapp.com',
  projectId: 'notes-react-app-cd4a7',
  storageBucket: 'notes-react-app-cd4a7.appspot.com',
  messagingSenderId: '560531965265',
  appId: '1:560531965265:web:099ac5dba034152d8cbf70',
};

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: ROUTES.home,
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
