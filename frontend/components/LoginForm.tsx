// frontend/components/LoginForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push(`/welcome/${data.user.username}`);
      } else {
        setMessage(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setMessage('Error del servidor');
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.formContainer}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>
        Ingresar
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
