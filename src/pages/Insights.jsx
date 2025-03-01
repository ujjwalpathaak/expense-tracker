import { useEffect, useState } from "react";
import { fetchExpenses } from "../firebase";
import ChartComponent from "../components/ChartComponent";

function Insights() {
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Store selected date

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
      if (data.length > 0) {
        setSelectedDate(data[0].date); // Set default date to the first expense's date
      }
    };
    getExpenses();
  }, []);

  // Extract unique dates from expenses
  const uniqueDates = [...new Set(expenses.map((exp) => exp.date))];

  // Filter expenses based on selected date
  const filteredExpenses = expenses.filter((exp) => exp.date === selectedDate);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Insights</h1>

      {/* Date Selection Dropdown */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Date:</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Display Expenses for Selected Date */}
      {filteredExpenses.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold">{selectedDate}</h2>
          <ul className="mt-2">
            {filteredExpenses.map((exp) => (
              <li key={exp.id} className="p-2 border-b">
                {exp.category}: ₹{exp.amount}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No expenses for this date.</p>
      )}

      {/* Show Chart if Expenses Exist */}
      {expenses.length > 0 && <ChartComponent expenses={expenses} />}
    </div>
  );
}

export default Insights;