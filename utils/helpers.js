import { authFire } from "../firebaseConfig";

export const getCurrentUserId = () => {
  return authFire.currentUser.uid;
};
export const calculateTotalBalance = (accountsData) => {
  let totalBalance = 0;
  for (const account of accountsData) {
    const amount = parseFloat(account.balance);
    totalBalance += amount;
  }
  return totalBalance;
};

export const calculateTotalBudget = (accountsData) => {
  let totalBudget = 0;
  for (const account of accountsData) {
    if (
      account.budget !== null &&
      account.budget !== undefined &&
      account.budget !== ""
    ) {
      const amount = parseFloat(account.budget);
      totalBudget += amount;
    }
  }
  return totalBudget;
};
