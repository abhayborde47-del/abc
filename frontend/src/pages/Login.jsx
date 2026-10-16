import React, { useState } from 'react'
import axios from 'axios'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      // TODO: point to backend endpoint /api/auth/login (will implement)
      await axios.post('/api/auth/login', { username, password })
      // on success redirect to dashboard
      window.location.href = '/dashboard'
    }catch(err){
      setError(err?.response?.data?.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={submit}>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        {error && <div style={{color:'red',marginBottom:10}}>{error}</div>}
        <button className="btn" disabled={loading}>{loading? 'Logging in...':'Login'}</button>
      </form>
    </div>
  )
}
