import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Breadcrumbs from '../../components/breadcrumbs';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/topbar';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMobileScreen } = useWindowDimensions();

  return (
    <div className={styles.dashboardGrid}>
      <Sidebar isMobileScreen={isMobileScreen} isOpen={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={styles.mainContent}>
        <TopBar isMobileScreen={isMobileScreen} isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Breadcrumbs />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
