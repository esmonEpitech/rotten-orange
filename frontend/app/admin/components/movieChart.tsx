"use client";

import React from "react";
import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Movie {
  _id: string;
  title: string;
  averageRating: number;
}

interface MovieChartProps {
  top5Movies: Movie[];
}

export default function MovieChart({
  top5Movies,
}: MovieChartProps) {
  const data = {
    labels: top5Movies.map((movie) => movie.title),

    datasets: [
      {
        label: "Note moyenne du public (/10)",
        data: top5Movies.map((movie) => movie.averageRating),

        backgroundColor: "#000080",
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Top 5 des films les mieux notés",

        font: {
          size: 16,
          weight: "bold" as const,
          family: "sans-serif",
        },

        color: "#1f2937",
        align: "start" as const,

        padding: {
          bottom: 20,
        },
      },
    },

    scales: {
      y: {
        min: 0,
        max: 5,

        grid: {
          color: "#f3f4f6",
        },

        ticks: {
          color: "#9ca3af",
        },
      },

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#9ca3af",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
}