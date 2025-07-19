import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import styles from '../../styles/WelcomePage.module.css';

const WelcomePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.username === username) {
          setUser(parsedUser);
        } else {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [username]);

  if (!user) return null; // Previene renderizado antes de tiempo

  return (
    <div className={styles.container}>
      <h1>¡Bienvenido, {user.name}!</h1>
      <p>Correo: {user.email}</p>
      <LogoutButton />
    </div>
  );
};

export default WelcomePage;
