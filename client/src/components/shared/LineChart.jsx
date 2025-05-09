import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Filler,
  LineElement,
  Legend,
} from "chart.js";
import { purple, purpleLight } from "../../constants/color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Filler,
  LineElement,
  Legend
);

// Function to get last 6 months including the current month
const getLast6Months = () => {
  const currentDate = moment();
  const last6Months = [];

  for (let i = 5; i >= 0; i--) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMM YYYY"); // Example: "Jan 2024"
    last6Months.push(monthName);
  }

  return last6Months;
};

const labels = getLast6Months();

export const LineChart = ({ value = [], label }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: label,
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

export default LineChart;
