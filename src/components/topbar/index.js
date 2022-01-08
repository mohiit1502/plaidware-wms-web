import React from 'react';
import HamburgerIcon from '../../assets/icons/Hamburger-icon';
import styles from './topbar.module.css';

export default function TopBar({ isMobileScreen, isSidebarOpen, setSidebarOpen }) {
  return (
    <div className={styles.topBar}>
      <div
        onClick={() => {
          setSidebarOpen(true);
        }}
      >
        {isSidebarOpen ? null : <HamburgerIcon color="#000" />}
      </div>
      <div>Right side icons here</div>
    </div>
  );
}
