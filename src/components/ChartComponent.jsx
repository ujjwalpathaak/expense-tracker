import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent({ expenses }) {
    useEffect(() => {
        return () => {
          ChartJS.getChart("my-chart")?.destroy();
        };
      }, []);
  const data = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return <Pie data={{ labels: Object.keys(data), datasets: [{ data: Object.values(data), backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ff9800"] }] }} />;
}

export default ChartComponent;