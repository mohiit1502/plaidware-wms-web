import styles from './breadcrumbs.module.css';
import React from 'react';

export default function Breadcrumbs() {
  return (
    <div className={styles.breadcrumbs}>
      breadcrumbs {'>'} are {'>'} here
    </div>
  );
}
