import styles from "../styles/index.module.css";

export default function Avatar({ name }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return <div className={styles.avatar}>{initials}</div>;
}
