import { auth } from '../firebase';

type UserType = {
  email: string;
  password: string;
};

export const onFirebaseRegister = async ({ email, password }: UserType) => {
  try {
    return await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return;
    }
    throw error;
  }
};

export const onFirebaseLogin = async ({ email, password }: UserType) => {
  try {
    return await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('LOG', error.code);
    throw error;
  }
};

export const onFirebaseLogout = async () => {
  try {
    return auth.signOut();
  } catch (error) {
    throw error;
  }
};

export const onFirebaseAuthStateChange = (callback: Function) => {
  return auth.onAuthStateChanged(user => {
    if (user) {
      callback({ email: user.email, id: user.uid });
    } else {
      callback(null);
    }
  });
};
