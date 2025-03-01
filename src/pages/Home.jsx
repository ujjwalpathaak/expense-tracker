import { useEffect, useState } from "react";
import { addExpense, fetchExpenses, deleteExpense } from "../firebase";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data);

      const totalBalance = data.reduce((acc, exp) => acc + (exp.type === "credit" ? exp.amount : -exp.amount), 0);
      setBalance(totalBalance);
    };
    getExpenses();
  }, []);

  return (
    <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>
      <ExpenseForm setExpenses={setExpenses} setBalance={setBalance} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} setBalance={setBalance} />
    </div>
  );
}

export default Home;