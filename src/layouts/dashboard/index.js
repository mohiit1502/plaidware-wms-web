import styles from './dashboard.module.css';
import Sidebar from './Sidebar';

export default function Dashboard({ children }) {
  return (
    <div className={styles.dashboardGrid}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.topBar}>search comes here</div>
        <div className={styles.breadcrumbs}>
          breadcrumbs {'>'} are {'>'} here
        </div>
        <div className={styles.content}>rest content comes here</div>
      </div>
    </div>
  );
}
