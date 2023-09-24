import { dbFire } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function getCategories() {
  const querySnapshot = await getDocs(collection(dbFire, "categories"));
  return await querySnapshot.docs.map((doc) => ({
    label: doc.data().category,
    value: doc.data().category,
  }));
}

export async function addCategory(catName) {
  await addDoc(collection(dbFire, "categories"), {
    category: catName,
    description: "",
  });
}
