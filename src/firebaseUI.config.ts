import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { auth } from './firebase';
import { ROUTES } from './constants/routes';

export const ui = new firebaseui.auth.AuthUI(firebase.auth());
export const config = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      customParameters: {
        prompt: 'select_account',
      },
    },
  ],
};
export const uiRoot = '#firebaseui-auth-container';

// export const uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: (authResult:any, redirectUrl:string) => {
//       console.log(authResult);
//       console.log(redirectUrl)
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: () => {
//       // The widget is rendered.
//       // Hide the loader.
//       // document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: ROUTES.home,
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
// };
// ui.start('#firebaseui-auth-container', uiConfig);
