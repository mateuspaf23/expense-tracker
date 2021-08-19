import { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";

// Initial state
const initalState = {
  transactions: [
    { id: 1, text: "Flowers", amount: -30 },
    { id: 2, text: "Salary", amount: 1100 },
    { id: 3, text: "Book", amount: -20 },
    { id: 4, text: "Camera", amount: -300 },
  ],
};

// Create global context
export const GlobalContext = createContext(initalState);

// Provider component (for other components acess the state)
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initalState);

  // Actions
  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{ transactions: state.transactions, deleteTransaction }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
