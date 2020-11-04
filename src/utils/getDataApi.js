// import { firestore } from "../../src/utils/config/firebase";
import Firebase from "./config/firebase";
// import Firebase from 'firebase';
// import {db} from './firebase'
import randomstring from "randomstring";

// import firebase  from './config/firebase'
// // const firestore = firebase.firestore();
const Firestore = Firebase.firestore();

export const getInquiry = async (email) => {
 const db = Firestore.collection("inquiry")
  const refInquiry = await db.where("email", "==", email).get()
  const refToken = await db.where("token", "!=", "").get()

  let doList = []
  let tokenValue = ""

  refToken.forEach(doc => {
    if(doc)
    // tokenList.push(doc.data())
    tokenValue = doc.data().token
  });

  refInquiry.forEach(doc => {
      if(doc)
      doList.push(doc.data())
      
    });

  // const doc = refInquiry.data
  // console.log(tokenList.token)
  let querySnapshot = "Email Exists,"+""
  
  if(doList.length < 1){
  return db
          .doc(randomstring.generate(10))
          .set({ email: email, date: Date.now() })
          .then((querySnapshot) => "NA,"+tokenValue)
    .catch((querySnapshot) => "Email Exists, ")
  }else{return querySnapshot}

  // console.log(randomstring.generate(10))
  // const refInquiry = Firestore.collection("inquiry").where("email", "==", email)
  // const res = await refInquiry.get()
  // res.then((res) => {if(res===null){return "email exists"}})
  // .then(
  // if(res===null){
  //   return "email exists"
  // })
  // .catch((error) => console.log(error))
  // res.forEach(doc => {
  //   if(doc)
  //   console.log(doc.id, ' => ', doc.data());
  // });

  // console.log(refInquiry.date)
  // if (refInquiry === null) {
  //   return (
  //     Firestore.collection("inquiry")
  //       // .doc(randomstring.generate(10))
  //       .doc(randomstring.generate(10))
  //       .set({ email: email, date: "" })
  //       // .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
  //       .catch((error) => console.log(error))
  //   )
  // }
};
export const getCourseAction = async () => {
  return Firestore.collection("course_cat")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => console.log(error));
};

//------ influencer

export const getInfluencerAction = async () => {
  return Firestore.collection("influencer")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => console.log(error));
};
