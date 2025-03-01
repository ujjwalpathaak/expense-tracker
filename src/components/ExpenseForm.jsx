import { useState } from "react";
import { addExpense } from "../firebase";

function ExpenseForm({ setExpenses, setBalance }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("expense"); // Default: Expense
  const [categories, setCategories] = useState([
    "Lunch",
    "Food",
    "Transport",
    "Office Auto",
    "Wants",
  ]);
  const [customCategory, setCustomCategory] = useState("");

  // Convert date to "Tuesday 24" format
  const getFormattedDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-US", { weekday: "long", day: "numeric" });
  };

  const handleAddExpense = async () => {
    if (!amount || !date) return alert("Amount and Date are required");

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date,
      notes,
      type,
    };

    setExpenses((prev) => [...prev, newExpense]);
    setBalance((prev) => prev + (type === "credit" ? parseFloat(amount) : -parseFloat(amount)));

    await addExpense(newExpense);
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
  };

  // Handle custom category addition
  const handleAddCustomCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCategory(customCategory);
      setCustomCategory("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <input  
          type="number"
          placeholder="Amount"
          className="border py-1 px-2 rounded-full bg-transparent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Radio Buttons for Type Selection */}
        <div className="flex gap-3">
          <label className={`py-1 px-2 border rounded-full cursor-pointer ${type === "expense" ? "bg-red-500 text-white" : "bg-transparent"}`}>
            <input
              type="radio"
              name="type"
              value="expense"
              className="hidden"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            Expense
          </label>
          <label className={`py-1 px-2 border rounded-full cursor-pointer ${type === "credit" ? "bg-green-500 text-white" : "bg-transparent"}`}>
            <input
              type="radio"
              name="type"
              value="credit"
              className="hidden"
              checked={type === "credit"}
              onChange={() => setType("credit")}
            />
            Credit
          </label>
        </div>
      </div>

      {/* Radio Buttons for Category Selection */}
      <div className="flex mt-3 flex-wrap gap-3">
        {categories.map((cat) => (
          <label
            key={cat}
            className={`py-1 px-2 border rounded-full cursor-pointer ${
              category === cat ? "bg-blue-500 text-white" : "bg-transparent"
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

      {/* Custom Category Input */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          placeholder="Add Custom Category"
          className="border py-1 px-2 rounded-full bg-transparent w-full"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />
        <button
          onClick={handleAddCustomCategory}
          className="bg-blue-500 text-white py-1 px-3 rounded-full"
        >
          +
        </button>
      </div>

      {/* Display Formatted Date Above Date Picker */}
      <div className="text-center font-medium">
        Selected Date: <span className="text-blue-600">{getFormattedDate(date)}</span>
      </div>

      <input
        type="date"
        className="border mt-1 py-1 px-2 rounded-full bg-transparent"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleAddExpense} className="mt-3 bg-green-500 text-white py-1 px-2 rounded-full">
        Add Transaction
      </button>
    </div>
  );
}

export default ExpenseForm;