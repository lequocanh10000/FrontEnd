'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './chart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FlightStatusChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tình trạng các chuyến bay',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: ['Chưa Cất Cánh', 'Đang Bay', 'Đã Hạ Cánh'],
    datasets: [
      {
        data: [4, 2, 36],
        backgroundColor: '#15a3ef',
        barThickness: 40,
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <Bar options={options} data={data} />
    </div>
  );
}
