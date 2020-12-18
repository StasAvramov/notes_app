import React from 'react';

import 'modern-normalize/modern-normalize.css';
import './styles/style.css';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Notes App</h1>
    </div>
  );
}

export default App;
