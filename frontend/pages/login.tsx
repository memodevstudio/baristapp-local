import LoginForm from '../components/LoginForm';
import styles from '../styles/LoginPage.module.css';

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
}
