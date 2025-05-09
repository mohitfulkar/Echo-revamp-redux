import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ poll, labels, dataValues, label }) => {
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ height: "250px", width: "280px" }}>
      {labels.length > 0 && dataValues.length > 0 ? (
        <Doughnut data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DoughnutChart;
