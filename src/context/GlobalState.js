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

  // Fetch transactions
  const fetchTransactions = async () => {
    const response = await fetch("http://localhost:4000/transactions");
    const data = await response.json();

    return data;
  };

  // Add transaction
  const addTransaction = async (transaction) => {
    if (transaction?.text === "" || transaction?.amount === 0) {
      alert("There are info missing!");
      return;
    }

    await fetch("http://localhost:4000/transactions", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(transaction),
    });

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    await fetch(`http://localhost:4000/transactions/${id}`, {
      method: "DELETE",
    });

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
