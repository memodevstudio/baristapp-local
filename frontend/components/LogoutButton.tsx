// frontend/components/LogoutButton.tsx
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} style={{ backgroundColor: '#e63946', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '5px' }}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
