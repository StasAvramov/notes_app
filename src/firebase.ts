import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD816F_RsLNULSgNRV7BUmkKgJprQGeu-I',
  authDomain: 'notes-react-app-cd4a7.firebaseapp.com',
  projectId: 'notes-react-app-cd4a7',
  storageBucket: 'notes-react-app-cd4a7.appspot.com',
  messagingSenderId: '560531965265',
  appId: '1:560531965265:web:099ac5dba034152d8cbf70',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const gitHubProvider = new firebase.auth.GithubAuthProvider();
