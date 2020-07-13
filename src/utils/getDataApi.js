import firebase from "../../src/utils/config/firebase";

export const getCourseAction = async () => {
  console.log("Without Despatch");
  const firestore = firebase.firestore();
  return firestore
    .collection("course_cat")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    .catch(error => error)
    
};

//------ influencer 

export const getInfluencerAction = async () => {
   
    const firestore = firebase.firestore();
    return firestore
      .collection("influencer")
      .get()
      .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()
      ))
     
      .catch(error => error)
      
  };
