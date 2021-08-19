// import { useState, useEffect } from "react";
import { GlobalProvider } from "./context/GlobalState";

import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";

function App() {
  // const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   const getTransactions = async () => {
  //     const transactionsFromServer = await fetchTransactions();
  //     setTransactions(transactionsFromServer);
  //   };

  //   getTransactions();
  // }, []);

  // const fetchTransactions = async () => {
  //   const response = await fetch("http://localhost:4000/transactions");
  //   const data = await response.json();

  //   return data;
  // };

  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
