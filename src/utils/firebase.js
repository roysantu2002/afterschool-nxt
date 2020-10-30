import Firebase from 'firebase';

/* TODO: For integration, update firebase configuration here */
const config = {
    apiKey: "AIzaSyC5hGKOYXuCMpuU4zDvUc4HdUEx7VhHSE4",
    authDomain: "login-app-firebase-bfc88.firebaseapp.com",
    databaseURL: "https://login-app-firebase-bfc88.firebaseio.com",
    projectId: "login-app-firebase-bfc88",
    storageBucket: "login-app-firebase-bfc88.appspot.com",
    messagingSenderId: "908855165800",
    appId: "1:908855165800:web:33f107221701fab3324cdd"
}
export const firebase = Firebase.apps.length
    ? Firebase.app()
    : Firebase.initializeApp(config);

// export const db = firebase.firestore()

export default (firebase);