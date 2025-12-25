import { useState, useEffect } from "react";
import styles from "../styles/index.module.css";

export default function Sidebar() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.setAttribute("data-theme", "system");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>ATS</h2>

      <nav>
        <a className={styles.navItem}>🏠 Home</a>
        <a className={styles.navItem}>📊 Rank Candidates</a>
      </nav>

      <div className={styles.themeToggle}>
        <p>Theme Mode</p>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </aside>
  );
}
