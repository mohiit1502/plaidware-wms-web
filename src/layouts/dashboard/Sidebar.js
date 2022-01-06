import styles from './dashboard.module.css';

export default function Sidebar() {
  return (
    <div className={styles.navSidebar}>
      <div className={styles.sidebarBranding}>Plaidware</div>
    </div>
  );
}
