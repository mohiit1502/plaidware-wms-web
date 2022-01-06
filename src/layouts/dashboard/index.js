import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/topbar';
import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboardGrid}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />
        <Breadcrumbs />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
