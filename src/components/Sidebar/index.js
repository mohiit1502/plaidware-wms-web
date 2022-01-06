import styles from './sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.navSidebar}>
      <div className={styles.sidebarBranding}>Plaidware</div>
    </div>
  );
}
