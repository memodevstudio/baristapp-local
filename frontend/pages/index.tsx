import { useEffect, useState } from 'react'
import UserForm from '../components/UserForm'
import UserList from '../components/UserList'
import { User } from '../types/User'

import styles from './Home.module.css'


export default function Home() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Usuario</h1>
      <UserForm onSuccess={fetchUsers} />
      <UserList users={users} />
    </div>
  )
}
