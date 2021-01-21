import { auth, googleProvider, gitHubProvider } from '../firebase';

type UserType = {
  email: string;
  password: string;
};

export const onFirebaseLogin = async ({ email, password }: UserType) => {
  try {
    return await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return await auth.createUserWithEmailAndPassword(email, password);
    } else {
      return console.error(error);
    }
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

export const onFirebaseGoogleLogin = async () => {
  try {
    return await auth.signInWithPopup(googleProvider).then(result => {
      /** @type {firebase.auth.OAuthCredential} */
      // const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // ...
      return result.user;
    });
  } catch (error) {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // const credential = error.credential;
    // ...
    return console.error(error);
  }
};

export const onFirebaseGitHubLogin = async () => {
  try {
    return await auth.signInWithPopup(gitHubProvider).then(result => {
      // This gives you a GitHub Access Token.
      // const token = result.credential.accessToken;
      // The signed-in user info.

      // const user = result.user;
      return result.user;
    });
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // const credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have signed up with a different provider for that email.');
      // Handle linking here if your app allows it.
    } else {
      return console.error(error);
    }
  }
};
