import { doc, setDoc } from "firebase/firestore";
import { db } from ".";
import { collection, addDoc } from "firebase/firestore";

// Add a new document in collection "cities"
export async function SetNewUser(userData) {
  console.log("helllooo");
  console.log(userData);
  const {userName, email, password, tokenExpiredDate, id} = userData;
  try {
    const docRef = await setDoc(doc(db, "users", email), {
      userName: userName,
      email: email,
      password: password,
      tokenExpiredDate: tokenExpiredDate,
      id: id,
    });
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
