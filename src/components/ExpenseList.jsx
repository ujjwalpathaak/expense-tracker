import { FaTrash } from "react-icons/fa";
import { deleteExpense } from "../firebase";

function ExpenseList({ expenses, setExpenses, setBalance }) {
  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));

    const deletedExpense = expenses.find((exp) => exp.id === id);
    setBalance((prev) => prev - (deletedExpense.type === "credit" ? deletedExpense.amount : -deletedExpense.amount));
  };

  const today = new Date().toISOString().split("T")[0];
  const todayExpenses = expenses.filter((expense) => expense.date === today);
  
  return (
    <>
      <hr />
      <p className="font-semibold mb-3 mt-2">Today's Expenses</p>
      <div className="max-h-60 overflow-y-auto border border-gray-300 rounded p-2">
        <ul className="mt-4">
          {todayExpenses.length > 0 ? (
            todayExpenses.map((expense) => (
              <li key={expense.id} className="flex justify-between items-center p-3 mt-2 rounded bg-gray-200">
                <span>₹{expense.amount} - {expense.category}</span>
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteExpense(expense.id)} />
              </li>
            ))
          ) : (
            <li className="text-gray-500">No expenses recorded for today.</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default ExpenseList;