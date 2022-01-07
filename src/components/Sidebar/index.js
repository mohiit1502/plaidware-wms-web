import { NavLink } from 'react-router-dom';
import XIcon from '../../assets/icons/X-close-icon';
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
      link: '/',
    },
    {
      text: 'Sub links',
      link: '/',
    },
    {
      text: 'Sub links',
      link: '/',
    },
    {
      text: 'Sub links',
      link: '/',
    },
    {
      text: 'Sub links',
      link: '/',
    },
  ],
};

const NavGroupItems = ({ list }) => (
  <div className={styles.sidebarGroup}>
    <NavLink to={list.title.link}>
      <div className={styles.sidebarMainItem}>
        <XIcon />
        {list.title.text}
      </div>
    </NavLink>
    {list.subs.map((subLink) => (
      <NavLink to={subLink.link}>
        <div className={styles.sidebarSubItem}>{subLink.text}</div>
      </NavLink>
    ))}
  </div>
);

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
