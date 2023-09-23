import { createContext, useEffect, useReducer } from "react";
import { fetchExpensesData } from "./db";

export const Tracker = createContext();

const initialState = {
  user: {},
  accounts: [],
  balance: 0,
  budget: 0,
  expenses: [],
};

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case "ADD_BALANCE": {
      const newBalance = Number(state.balance + action.payload.increase);
      return { ...state, balance: newBalance };
    }
    case "FETCH_EXPENSES": {
      // console.log(action.payload);
      const userId = action.payload;
      console.log(userId);

      const data = fetchExpensesData(userId).then((res) => {
        console.log(res);
        return res;
      });
      return { ...state, expenses: data };
    }
    default:
      return state;
  }
}

export function TrackerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Tracker.Provider value={value}>{children}</Tracker.Provider>;
}
