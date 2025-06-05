'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './chart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AircraftChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Các loại máy bay hiện có',
      },
    },
  };

  const data = {
    labels: ['Airbus A320', 'Airbus A330', 'Boeing 767', 'Boeing 777'],
    datasets: [
      {
        data: [15, 12, 8, 7],
        backgroundColor: [
          '#4285F4',
          '#EA4335',
          '#34A853',
          '#00BCD4',
        ],
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <Pie options={options} data={data} />
    </div>
  );
}
