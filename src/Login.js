import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles/Login.css'

function Login({ socket }) {
  const [joined, toggleJoined] = useState(null)
  const [username, setUsername] = useState("")

  return (
    <div className="container">
      <div className="center-form">
        <div className="form-box">
          <h1>Welcome! Choose a display name to view the agenda</h1>
          <form className="login-form">
            <br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your display name" disabled={joined ? 'disabled' : ''} required />
            <br />
            <Link to={`/agenda/${username}`} params={{ username }}>
              <button>Join</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
