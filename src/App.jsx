import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Insights from "./pages/Insights";

function App() {
  return (
    <Router>
      <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg mt-10">
        <nav className="flex justify-between mb-6">
          <Link to="/" className="text-blue-500">Expense Tracker</Link>
          <Link to="/insights" className="text-blue-500">View Insights</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;