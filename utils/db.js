import { collection, getDocs, query, where } from "firebase/firestore";
import { dbFire } from "../firebaseConfig";

export const fetchExpensesData = async (userId) => {
  console.log(userId);
  const expensesQuery = query(
    collection(dbFire, "expenses"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(expensesQuery);
  const expensesData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return expensesData;
};
