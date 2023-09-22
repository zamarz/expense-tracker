import { createContext, useReducer } from "react";

const initialState = {
  budget: 2000,
  expenses: [
    {
      id: 1,
      amount: 15.05,
      merchant: "Nero",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 2,
      amount: 6.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 3,
      amount: 18.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 4,
      amount: 108.24,
      merchant: "Restaurant",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 5,
      amount: 8.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
  ],
};

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useReducer(budget, initialState);

  return (
    <BudgetContext.Provider
      value={{
        budget: budget.budget,
        expenses: budget.expenses,
        setBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
