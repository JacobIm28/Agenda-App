import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styles/Login.css'

function Login({ socket }) {
  const handleSubmit = (e) => {
    const username = e.target.elements.username.value
    socket.emit('join', { username })
  }

  return (
    <div className="container">
      <div className="center-form">
        <div className="form-box">
          <h1>Enter your information</h1>
          <form onSubmit={handleSubmit} className='login-form'>
            <label>Username</label>
            <br />
            <input type="text" name="username" placeholder="Enter your display name" required />
            <br />
            <button>Join</button>
          </form>

          <div className="links">
            <Link className="link" to="/agenda">Go to the agenda</Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Login
