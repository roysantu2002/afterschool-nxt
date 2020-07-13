import firebase from "firebase";
// import "firebase/storage";
// import "firebase/firestore";

/* TODO: For integration, update firebase configuration here */
var config = {
  apiKey: "AIzaSyAbipgg-cCFdio-GnQ95fAhlko1C7UpiDY",
  authDomain: "react-19b73.firebaseapp.com",
  databaseURL: "https://react-19b73.firebaseio.com",
  projectId: "react-19b73",
  storageBucket: "react-19b73.appspot.com",
  messagingSenderId: "915146599372",
  appId: "1:915146599372:web:bc739d75171174faf24b69",
  measurementId: "G-K7PXT2RFQF",
}

// firebase.initializeApp(config)

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
export default firebase
// // export default firebase;

// const firestore = firebase.firestore();

// const loginAction = (email, password) => async dispatch => {

// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// // const defaultProject = firebase.initializeApp(config);

// export const auth = firebase.auth()
// export const firestore = firebase.firestore();

// export const storage = firebase.storage();
// export const provider = new firebase.auth.GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   auth.signInWithPopup(provider);
// };

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;
//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();
//   if (!snapshot.exists) {
//     const { email, displayName, photoURL } = user;
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         photoURL,
//         ...additionalData
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// const getUserDocument = async uid => {
//   if (!uid) return null;
//   try {
//     const userDocument = await firestore.doc(`users/${uid}`).get();
//     return {
//       uid,
//       ...userDocument.data()
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };

// export {storage, provider as default };
