import { firebase } from "../../src/utils/config/firebase";

export const getCourseAction = async () => {
  console.log("Without Despatch");
  const firestore = firebase.firestore();
  return firestore
    .collection("course_cat")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
    // .then(function(querySnapshot) {
    //         const data = querySnapshot.docs.map(doc => doc.data())
    //     })
    // .then(querySnapshot)
    //.docs.map(doc => doc.data()))
    // .then(res => res)
    // console.log(querySnapshot)
    // .then(data => querySnapshot)
    // .then(function(querySnapshot) {
    //     const data = querySnapshot.docs.map(doc => doc.data()
    //     )
    //     console.log(data)
    // })
    // .then(data => data)
    // .then(querySnapshot => querySnapshot.docs)
  

    .catch(error => error)
    
};
