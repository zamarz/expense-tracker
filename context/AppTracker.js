import { createContext, useReducer } from "react";
import { calculateTotalBalance, calculateTotalBudget } from "../utils/helpers";

export const AppTracker = createContext();

const initialValues = { balance: 0, budget: 0, expenses: [], accounts: [] };

function reducer(state, action) {
  // console.log(state, action);
  const { type } = action;
  switch (type) {
    case "UPDATE_EXPENSES": {
      return {
        ...state,
        expenses: [...action.payload],
      };
    }
    case "ADD_EXPENSES": {
      return {
        ...state,
        expenses: [...state.expenses, ...action.payload],
      };
    }
    case "UPDATE_ACCOUNTS": {
      const totalBalance = calculateTotalBalance(action.payload);
      const totalBudget = calculateTotalBudget(action.payload);
      if (totalBalance && totalBudget) {
        return {
          ...state,
          accounts: [...action.payload],
          balance: totalBalance,
          budget: totalBudget,
        };
      }
    }
    case "ADD_ACCOUNT": {
      const newAccountArray = state.accounts.concat(action.payload);
      const totalBalance = calculateTotalBalance(newAccountArray);
      const totalBudget = calculateTotalBudget(newAccountArray);
      if (totalBalance && totalBudget) {
        return {
          ...state,
          accounts: [...newAccountArray],
          balance: totalBalance,
          budget: totalBudget,
        };
      }
    }
    // case "ADD_INCOME": {
    //   return console.log("Hello!!");
    // console.log(action.payload);
    // const newAccountArray = state.accounts.concat(action.payload);
    // console.log(newAccountArray);
    // const totalBalance = calculateTotalBalance(newAccountArray);
    // const totalBudget = calculateTotalBudget(newAccountArray);
    // if (totalBalance && totalBudget) {
    //   return {
    //     ...state,
    //     accounts: [...newAccountArray],
    //     balance: totalBalance,
    //     budget: totalBudget,
    //   };
    // }
    // }
    case "DELETE_ACCOUNT": {
      const totalBalance = calculateTotalBalance(action.payload);
      const totalBudget = calculateTotalBudget(action.payload);
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
