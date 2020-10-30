// import { firestore } from "../../src/utils/config/firebase";
import firebase  from './firebase'
// import Firebase from 'firebase';
// import {db} from './firebase'
import randomstring from 'randomstring'

// import firebase  from './config/firebase'
// // const firestore = firebase.firestore();
const db = firebase.firestore()

export const getInquiry = async (email) => {
  // console.log(randomstring.generate(10))
  return db
  .collection("inquiry")
  // .doc(randomstring.generate(10))
  .doc('tesxt').set({email: email, date: ''})
  // .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
  .catch((error) => console.log(error));
};
export const getCourseAction = async () => {
  return db
    .collection("course_cat")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => console.log(error));
};

//------ influencer

export const getInfluencerAction = async () => {
  return db
    .collection("influencer")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => console.log(error));
};

