'use client';

import TopCards from '../../../components/admin/TopCards/topCard';
import FlightStatusChart from '../../../components/admin/Charts/flightStatusChart';
import AircraftChart from '../../../components/admin/Charts/aircraftChart';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <TopCards />
      
      <div className={styles.chartsSection}>
        <div className={styles.chartsGrid}>
          <FlightStatusChart />
          <AircraftChart />
        </div>
      </div>
    </div>
  );
}
