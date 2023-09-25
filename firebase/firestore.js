import { dbFire } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function getCategories() {
  const querySnapshot = await getDocs(collection(dbFire, "categories"));
  return await querySnapshot.docs.map((doc) => ({
    label: doc.data().category,
    value: doc.data().category,
  }));
}

export async function getAccounts() {
  const querySnapshot = await getDocs(collection(dbFire, "accounts"));
  return await querySnapshot.docs.map((doc) => ({
    label: doc.data().account,
    value: doc.data().account,
  }));
}

export async function addCategory(catName) {
  return await addDoc(collection(dbFire, "categories"), {
    category: catName,
    description: "",
  });
}

export async function addExpense(expense) {
  return await addDoc(collection(dbFire, "expenses"), expense);
}

export async function addAccount(accountName) {
  return await addDoc(collection(dbFire, "accounts"), {
    category: accountName
  });
}