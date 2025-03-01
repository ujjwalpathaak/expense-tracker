import { FaTrash } from "react-icons/fa";
import { deleteExpense } from "../firebase";

function ExpenseList({ expenses, setExpenses, setBalance }) {
  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));

    const deletedExpense = expenses.find((exp) => exp.id === id);
    setBalance((prev) => prev - (deletedExpense.type === "credit" ? deletedExpense.amount : -deletedExpense.amount));
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter expenses to show only today's transactions
  const todayExpenses = expenses.filter((expense) => expense.date === today);

  return (
    <ul className="mt-4">
      {todayExpenses.length > 0 ? (
        todayExpenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center p-3 mt-2 rounded bg-gray-200">
            <span>{expense.type === "credit" ? "+" : "-"}₹{expense.amount} - {expense.category} ({expense.date})</span>
            <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteExpense(expense.id)} />
          </li>
        ))
      ) : (
        <li className="text-gray-500">No expenses recorded for today.</li>
      )}
    </ul>
  );
}

export default ExpenseList;