import XIcon from '../../assets/icons/X-close-icon';
import styles from './sidebar.module.css';

export default function Sidebar({ isMobileScreen, isOpen, setOpen }) {
  if (!isMobileScreen && isOpen) {
    return (
      <div className={styles.navSidebar}>
        <div className={styles.sidebarBrandingHeader}>
          <div className={styles.sidebarBranding}>Plaidware</div>
          <div
            onClick={() => {
              setOpen(false);
            }}
          >
            <XIcon />
          </div>
        </div>
        <div className={styles.sidebarNav}></div>
      </div>
    );
  }
  return null;
}
