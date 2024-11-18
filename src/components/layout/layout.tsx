import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";

export function Layout() {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
}
