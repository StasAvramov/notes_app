import { auth } from '../firebase';
import firebase from 'firebase/app';
import { UserLoginSuccessPayloadType } from '../types/auth';

type UserType = {
  email: string;
  password: string;
};

export const currentUser = auth.currentUser;

export const onFirebaseRegister = ({ email, password }: UserType) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      return user;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        return;
      }
      throw error;
    });

export const onFirebaseLogin = ({ email, password }: UserType) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      return user;
    })
    .catch(error => {
      throw error;
    });

export const onFirebaseLogout = () => {
  return auth
    .signOut()
    .then(() => {
      console.log('Logout success');
    })
    .catch(error => {
      throw error;
    });
};

export function onAuthStateChange(callback: Function) {
  return auth.onAuthStateChanged(user => {
    if (user) {
      callback({ email: user.email, id: user.uid });
    } else {
      callback(null);
    }
  });
}
