import { createContext, useReducer, useEffect } from "react";

import AppReducer from "./AppReducer";

// Initial state
const emptyState = {
  transactions: [],
};

// Create global context
export const GlobalContext = createContext(emptyState);

// Provider component (for other components acess the state)
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, emptyState);

  useEffect(() => {
    const getTransactions = async () => {
      const transactionsFromServer = await fetchTransactions();

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: transactionsFromServer,
      });
    };

    getTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:4000/transactions");
    const data = await response.json();

    return data;
  };

  // Actions
  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
