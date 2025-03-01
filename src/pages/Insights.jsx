import { useEffect, useState } from "react";
import { fetchExpenses } from "../firebase";
import ChartComponent from "../components/ChartComponent";

function Insights() {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses(selectedMonth);
      setExpenses(data);
    };
    getExpenses();
  }, [selectedMonth]);

  const handleMonthChange = async (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDate(""); // Reset date when month changes
    const data = await fetchExpenses(e.target.value);
    setExpenses(data);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Filter expenses based on the selected month
  const filteredExpenses = expenses.filter((exp) => exp.date.startsWith(selectedMonth));

  // Extract unique available dates from filtered expenses
  const availableDates = [...new Set(filteredExpenses.map((exp) => exp.date))];

  // Filter expenses by selected date
  const dailyExpenses = selectedDate ? filteredExpenses.filter((exp) => exp.date === selectedDate) : [];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Insights</h1>

      {/* Month Picker */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border p-2 rounded w-full"
        />
      </div>
      {/* Show Chart if Expenses Exist for Selected Date */}
      {expenses.length > 0 && <ChartComponent expenses={filteredExpenses} />}

      {filteredExpenses.length > 0 && (
        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 rounded w-full"
          />
        </div>
      )}
      {/* Display Expenses for Selected Date */}
      {selectedDate ? (
        dailyExpenses.length > 0 ? (
          <div>
            <ul className="mt-2">
              {dailyExpenses.map((exp) => (
                <li key={exp.id} className="p-2 border-b">
                  {exp.category}: ₹{exp.amount}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No expenses for this date.</p>
        )
      ) : (
        <p className="text-gray-500">Select a date to view expenses.</p>
      )}

    </div>
  );
}

export default Insights;