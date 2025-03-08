import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Register the plugin

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

  const colors = [
    "#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ff9800", 
    "#8e44ad", "#2ecc71", "#f39c12", "#e74c3c", "#3498db"
  ];

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: $${value}`; // Show category and amount
        },
        color: (context) => {
          return context.dataset.backgroundColor[context.dataIndex]; // Use slice color
        },
        font: {
          weight: "bold",
        },
        align: "center",
        anchor: "center",
      },
    },
  };

  return <Pie id="my-chart" data={chartData} options={options} />;
}

export default ChartComponent;
