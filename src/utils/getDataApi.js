// import { firestore } from "../../src/utils/config/firebase";
// import firebase  from './firebase'
// import Firebase from 'firebase';
// import 'firebase/firestore' 

import firebase  from './config/firebase'
// const firestore = firebase.firestore();
const firestore = firebase.firestore()

export const getCourseAction = async () => {
  return firestore
    .collection("course_cat")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => console.log(error));
};

//------ influencer

export const getInfluencerAction = async () => {
  return firestore
    .collection("influencer")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => console.log(error));
};

