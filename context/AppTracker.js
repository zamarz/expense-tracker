import { createContext, useReducer } from "react";
import { calculateTotalBalance, calculateTotalBudget } from "../utils/helpers";

export const AppTracker = createContext();

const initialValues = { balance: 0, budget: 0, expenses: [], accounts: [] };

function reducer(state, action) {
  // console.log(state, action);
  const { type } = action;
  switch (type) {
    case "UPDATE_EXPENSES": {
      console.log(1);
      return {
        ...state,
        expenses: [...action.payload],
      };
    }

    case "UPDATE_ACCOUNTS": {
      try {
        console.log(2);
        let totalBalance = calculateTotalBalance(action.payload);
        let totalBudget = calculateTotalBudget(action.payload);
        if (totalBalance && totalBudget) {
          return {
            ...state,
            accounts: [...action.payload],
            balance: totalBalance,
            budget: totalBudget,
          };
        }
      } catch (err) {
        console.log(err);
      }
    }

    case "ADD_EXPENSE": {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case "ADD_ACCOUNT": {
      console.log(4);

      let newAccountArray = state.accounts.concat(action.payload);
      let totalBalance = calculateTotalBalance(newAccountArray);
      let totalBudget = calculateTotalBudget(newAccountArray);
      if (totalBalance && totalBudget) {
        return {
          ...state,
          accounts: [...newAccountArray],
          balance: totalBalance,
          budget: totalBudget,
        };
      }
    }

    case "ADD_INCOME": {
      console.log(5);
      // return state;

      // return console.log("Hello!!");
      // console.log(action.payload);
      const newAccountArray = state.accounts.concat(action.payload);
      console.log(newAccountArray);
      const totalBalance = calculateTotalBalance(newAccountArray).then(
        (bal) => {
          return {
            ...state,
            accounts: [...newAccountArray],
            balance: totalBalance + state.balance,
          };
        }
      );
    }

    case "DELETE_ACCOUNT": {
      console.log(6);

      let totalBalance = calculateTotalBalance(action.payload);
      let totalBudget = calculateTotalBudget(action.payload);
      if (totalBalance && totalBudget) {
        return {
          ...state,
          accounts: [...action.payload],
          balance: totalBalance,
          budget: totalBudget,
        };
      }
    }
    default:
      return state;
  }
}

export const AppTrackerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const value = { state, dispatch };
  return <AppTracker.Provider value={value}>{children}</AppTracker.Provider>;
};
