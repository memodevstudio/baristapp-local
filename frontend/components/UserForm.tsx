import { useState } from 'react'
import styles from './UserForm.module.css'

interface UserFormProps {
  onSuccess?: () => void
}

export default function UserForm({ onSuccess }: UserFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!name.trim() || !email.trim() || !password.trim() ){
      setMessage('⚠️ Por favor, completa todos los campos.')
      return
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage('⚠️ Ingresa un correo electrónico válido.')
      return
    }

    try {
      const res = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) {
        setMessage('✅ Usuario creado exitosamente.')
        setName('')
        setEmail('')
        setPassword('')
        onSuccess?.()
      } else {
        setMessage('❌ Error al crear el usuario.')
      }
    } catch (error) {
      setMessage('❌ Error de conexión con el servidor.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Nombre</label>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className={styles.label}>Correo Electrónico</label>
      <input
        className={styles.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

       <label className={styles.label}>Password</label>
       <input
         className={styles.input}
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="Contraseña"
         required
/>

      <button type="submit" className={styles.button}>Crear</button>
      <p className={styles.message}>{message}</p>
    </form>
  )
}
