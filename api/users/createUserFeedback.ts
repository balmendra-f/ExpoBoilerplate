import { app } from "@/firebase";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const createUserFeedback = (description: string) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const userId = user?.uid;
  const db = getFirestore(app);
  const feedbacksCollection = collection(db, "userFeedbacks");
  const newDocRef = doc(feedbacksCollection);
  const documentId = newDocRef.id;

  setDoc(newDocRef, {
    description,
    userId,
    createdAt: serverTimestamp(),
  }).catch((error) => {
    console.error(error);
  });

  return documentId;
};

export default createUserFeedback;
