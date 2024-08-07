import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboardUser = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("awsToken");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/api/expenses/admin/expenses",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setTransactions(response.data);

      const totalBalance = response.data.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      );
      setBalance(totalBalance);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (index) => {
    const transactionToDelete = transactions[index];
    const token = localStorage.getItem("awsToken");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/${transactionToDelete._id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const updatedTransactions = [...transactions];
      updatedTransactions.splice(index, 1);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleBack = () => {
    setTransactions([]);
    setBalance(0);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      <div className='flex items-center justify-between mb-4'>
        <button
          onClick={fetchExpenses}
          className="bg-[#3b82f6] text-white px-4 py-2 rounded hover:bg-slate-700 transition-all duration-300"
        >
          Get Expenses
        </button>
        <button
          onClick={handleBack}
          className={`bg-[#3b82f6] text-white px-2 py-1 lg:px-4 lg:py-2 rounded hover:bg-slate-700 transition-all duration-300 ${(transactions.length === 0) ? 'hidden' : 'block'}`}
        >
          BACK
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl">Total Balance: ${balance.toFixed(2)}</h2>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-3 gap-3 md:gap-80 font-semibold text-lg border-b border-gray-300 pb-2 mb-4 ">
          <span>Expense Name</span>
          <span className='ml-11'>Date</span>
          <span className='ml-14'>Actions</span>
        </div>
        <ul className="space-y-2">
          {transactions.map((transaction, index) => (
            <li
              key={transaction._id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm"
            >
              <span className='flex-1 font-semibold uppercase'>
                {transaction.description}
              </span>
              <span className="flex-1 text-gray-600 text-sm">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="bg-slate-500 hover:bg-slate-700 text-white py-1 px-2 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardUser;
