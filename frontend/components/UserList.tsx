import styles from './UserList.module.css';
import { User } from '../types/User';

interface UserListProps {
  users: User[] | null | undefined; // aceptamos null/undefined para mayor seguridad
}

export default function UserList({ users }: UserListProps) {
  // Si no hay usuarios o el array está vacío
  if (!users || users.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Usuarios registrados</h2>
        <p className={styles.status}>No hay usuarios registrados.</p>
      </div>
    );
  }

  // Si hay usuarios
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Usuarios registrados</h2>
      {users.map((user) => (
        <div key={user.id} className={styles.card}>
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}
