import firebase from "../../src/utils/config/firebase";
import 'firebase/firestore' 

const firestore = firebase.firestore();

export const getCourseAction = async () => {
  return firestore
    .collection("course_cat")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => error);
};

//------ influencer

export const getInfluencerAction = async () => {
  return firestore
    .collection("influencer")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => error);
};
