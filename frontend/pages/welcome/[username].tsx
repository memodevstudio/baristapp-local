import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import styles from '../../styles/WelcomePage.module.css';
import { authJson } from '../../utils/api';

type User = {
  name: string;
  username: string;
  email: string;
};

export default function WelcomePage() {
  const router = useRouter();
  const qUsername = router.query.username;
  const username = Array.isArray(qUsername) ? qUsername[0] : qUsername; // normaliza
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      if (!username) return; // espera el parámetro dinámico

      try {
        // Verifica sesión real en el backend (authJson agrega Authorization y baseURL)
        const me = await authJson<User>('/api/me');

        // Si la URL no coincide con el usuario autenticado, corrige la ruta
        if (me.username !== username) {
          router.replace(`/welcome/${encodeURIComponent(me.username)}`);
          return;
        }

        setUser(me); // usuario validado por backend
      } catch {
        // authJson ya redirige a /login si hay 401; por si acaso:
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [username, router]);

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.muted}>Cargando…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1>¡Bienvenido, {user.name}!</h1>
      <p>
        Correo: <b>{user.email}</b>
      </p>
      <LogoutButton />
    </div>
  );
}
