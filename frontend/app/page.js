import styles from "./page.module.css";

import MealsList from "./components/MealsList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MealsList></MealsList>
      </main>
    </div>
  );
}
