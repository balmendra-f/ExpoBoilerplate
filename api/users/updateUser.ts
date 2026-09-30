import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const updateUser = async (
  uid: string,
  data: Partial<{
    name: string;
    email: string;
    language: string;
  }>
) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};
