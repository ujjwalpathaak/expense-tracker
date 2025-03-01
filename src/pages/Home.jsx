import { useEffect, useState } from "react";
import { fetchExpenses } from "../firebase";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Home() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
    };
    getExpenses();
  }, []);

  return (
    <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>
      <ExpenseForm setExpenses={setExpenses} expenses={expenses} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}

export default Home;