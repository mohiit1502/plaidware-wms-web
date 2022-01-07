import { NavLink } from 'react-router-dom';
import SidebarDownIcon from '../../assets/icons/SidebarDown-icon';
import HomeIcon from '../../assets/icons/Home-icon';
import XIcon from '../../assets/icons/X-close-icon';
import combineClasses from '../../utils/combineCssClasses';
import styles from './sidebar.module.css';

const items = {
  title: {
    icon: '',
    text: 'Main link',
    link: '/',
  },
  subs: [
    {
      text: 'Sub links',
      link: '/login',
    },
    {
      text: 'Sub links',
      link: '/login',
    },
    {
      text: 'Sub links',
      link: '/login',
    },
    {
      text: 'Sub links',
      link: '/',
    },
    {
      text: 'Sub links',
      link: '/login',
    },
  ],
};

const NavGroupItems = ({ list }) => {
  return (
    <div className={styles.sidebarGroup}>
      <div className={combineClasses(styles.sidebarMainItem)}>
        <NavLink className={combineClasses(styles.alink, styles.mainItemContent)} to={list.title.link}>
          <HomeIcon className={styles.mainItemIcon} />
          <div>{list.title.text}</div>
        </NavLink>
        <SidebarDownIcon className={styles.dropdownIcon} />
      </div>
      {list.subs.map((subLink, idx) => (
        <NavLink key={idx} className={styles.alink} to={subLink.link}>
          {({ isActive }) => (
            <div className={combineClasses(styles.sidebarSubItem, [isActive, styles.subActive])}>{subLink.text}</div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

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
        <div className={styles.sidebarList}>
          <NavGroupItems list={items} />
          <NavGroupItems list={items} />
        </div>
      </div>
    );
  }
  return null;
}
