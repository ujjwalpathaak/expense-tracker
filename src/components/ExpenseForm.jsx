import { useState } from "react";
import { addExpense } from "../firebase";

function ExpenseForm({setExpenses, expenses}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [categories, setCategories] = useState([
    "Lunch",
    "Food",
    "Auto",
    "Gift",
    "Medicine",
    "Subs",
    "Wants",
  ]);

  const handleAddExpense = async () => {
    if (!amount || !date) return alert("Amount and Date are required");


    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date,
      notes
    };

    setExpenses([...expenses, newExpense])
    await addExpense(newExpense);
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full gap-3 flex justify-center items-baseline">
        <input
          type="number"
          placeholder="Amount"
          className="border py-1 px-2 rounded-full bg-transparent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          />      <input
          type="date"
          className="border mt-1 py-1 px-2 rounded-full bg-transparent"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
          </div>

      {/* Category Selection */}
      <div className="flex mt-3 flex-wrap gap-3">
        {categories.map((cat) => (
          <label
            key={cat}
            className={`py-1 px-2 border rounded-full cursor-pointer ${category === cat ? "bg-blue-500 text-white" : "bg-transparent"
              }`}
          >
            <input
              type="radio"
              name="category"
              value={cat}
              className="hidden"
              checked={category === cat}
              onChange={() => setCategory(cat)}
            />
            {cat}
          </label>
        ))}
      </div>
      <button onClick={handleAddExpense} className="mt-3 mb-6 bg-green-500 text-white py-1 px-2 rounded-full">
        Add Transaction
      </button>
    </div>
  );
}

export default ExpenseForm;