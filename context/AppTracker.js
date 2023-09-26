import { createContext, useMemo, useReducer } from "react";

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

    default:
      return state;
  }
}

export const AppTrackerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const value = { state, dispatch };
  return <AppTracker.Provider value={value}>{children}</AppTracker.Provider>;
};
