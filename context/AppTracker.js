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
    case "ADD_EXPENSE": {
      console.log(2);
      console.log(action.payload, "PAYLOAD##########");
      console.log(state.expenses, "CURRSTATE##########");
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case "UPDATE_ACCOUNTS": {
      console.log(3);
      const totalBalance = calculateTotalBalance(action.payload);
      const totalBudget = calculateTotalBudget(action.payload);
      if (totalBalance && totalBudget) {
        return {
          ...state,
          accounts: [...action.payload],
          balance: totalBalance,
          budget: totalBudget,
        };
      } else {
        break;
      }
    }
    case "ADD_ACCOUNT": {
      console.log(4);

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
      } else {
        break;
      }
    }

    case "ADD_INCOME": {
      console.log(5);
      break;

      // return console.log("Hello!!");
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
    }

    case "DELETE_ACCOUNT": {
      console.log(6);

      const totalBalance = calculateTotalBalance(action.payload);
      const totalBudget = calculateTotalBudget(action.payload);
      if (totalBalance && totalBudget) {
        return {
          ...state,
          accounts: [...action.payload],
          balance: totalBalance,
          budget: totalBudget,
        };
      } else {
        break;
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
