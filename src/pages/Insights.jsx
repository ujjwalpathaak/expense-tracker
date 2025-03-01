import { useEffect, useState } from "react";
import { fetchExpenses } from "../firebase";
import ChartComponent from "../components/ChartComponent";

function Insights() {
  const currentMonth = new Date().toISOString().slice(0, 7); // Get current month in YYYY-MM format
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Set default month

  const handleMonthChange = async (e) => {
    setSelectedMonth(e.target.value)
    const data = await fetchExpenses(e.target.value);
    console.log(data);
    setExpenses(data);
  }

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses(currentMonth);
      setExpenses(data);
    };
    getExpenses();
  }, []);

  // Filter expenses based on selected month
  const filteredExpenses = expenses.filter(
    (exp) => exp.date.startsWith(selectedMonth) // Match YYYY-MM format
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Insights</h1>

      {/* Month Picker */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Display Expenses for Selected Month */}
      {filteredExpenses.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold">{selectedMonth}</h2>
          <ul className="mt-2">
            {filteredExpenses.map((exp) => (
              <li key={exp.id} className="p-2 border-b">
                {exp.category}: ₹{exp.amount}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No expenses for this month.</p>
      )}

      {/* Show Chart if Expenses Exist */}
      {expenses.length > 0 && <ChartComponent expenses={filteredExpenses} />}
    </div>
  );
}

export default Insights;