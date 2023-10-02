import { dbFire } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export async function getCategories(uid) {
  const querySnapshot = await getDocs(collection(dbFire, "categories"));
  return await querySnapshot.docs.map((doc) => ({
    label: doc.data().category,
    value: doc.data().category,
    id: doc.id,
  }));
}

export async function getMerchants() {
  const querySnapshot = await getDocs(collection(dbFire, "merchants"));
  return await querySnapshot.docs.map((doc) => ({
    label: doc.data().merchant,
    title: doc.data().merchant,
    id: doc.id,
  }));
}

export async function addMerchant(merchName) {
  return await addDoc(collection(dbFire, "merchants"), {
    merchant: merchName,
  });
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
    category: accountName,
  });
}

export async function fetchExpensesData(userId) {
  const expensesQuery = query(
    collection(dbFire, "expenses"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(expensesQuery);
  const expensesData = await querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  if (expensesData) {
    return { message: "Success", expenses: expensesData };
  }
}

export async function fetchAccountsData(userId) {
  const accountsQuery = query(
    collection(dbFire, "account"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(accountsQuery);
  const accountsData = await querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  if (accountsData) {
    return {
      message: "Success",
      accounts: accountsData,
    };
  }
}
