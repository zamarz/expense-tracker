import { createContext, useMemo, useReducer } from "react";
import { calculateTotalBalance, calculateTotalBudget } from "../utils/helpers";

export const AppTracker = createContext();

const initialValues = { balance: 0, budget: 0, expenses: [], accounts: [] };

function reducer(state, action) {
  console.log(state, action);
  const { type } = action;
  switch (type) {
    case "UPDATE_EXPENSES": {
      return {
        ...state,
        expenses: [...action.payload],
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
    // case "UPDATE_BUDGET": {
    //   return {
    //     ...state,
    //     budget: state.budget + action.payload,
    //   };
    // }
    // case "UPDATE_BALANCE": {
    //   return {
    //     ...state,
    //     balance: state.balance + action.payload,
    //   };
    // }
    case "DELETE_ACCOUNT": {
      return {
        ...state,
        accounts: action.payload,
      };
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
