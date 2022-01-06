export default function Dashboard({ children }) {
  return (
    <div className={styles.dashboardGrid}>
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
