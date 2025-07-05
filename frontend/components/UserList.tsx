import styles from './UserList.module.css'
import { User } from '../types/User'



interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Usuarios registrados</h2>
      {users.map((user) => (
        <div key={user.id} className={styles.card}>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ))}
    </div>
  )
}
