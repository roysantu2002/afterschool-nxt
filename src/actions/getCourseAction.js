import {firebase} from "../utils/config/firebase"

const getCourseAction = () => async dispatch => {

  console.log("This is from getCourse")
    const firestore = firebase.firestore()
  firestore
    .collection("course_cat").get()
    .then(function(querySnapshot) {
      const data = querySnapshot.docs.map(doc => doc.data())
      console.log(data)
      dispatch({ type: "course"});
    })
    .catch(function(error) {
        const errorCode = error.code
        dispatch({ type: "course"});
      })
  }

  export default getCourseAction;
  