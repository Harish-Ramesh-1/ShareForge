import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Main = () => {
  const navigate = useNavigate(); 
  return (
    <div className="main-container">
      <section className="main-hero">
        <div className="main-card">
          <div className="main-left">
            <h1 className="main-title">Welcome to ShareForge</h1>
            <p className="main-desc">Easily share files and snippets with secure codes. Fast, private, and simple.</p>
            <div className="main-actions">
              <button className="main-button primary" onClick={() => navigate('/app/shareshort')}>Share Now</button>
              <button className="main-button ghost" onClick={() => navigate('/signup')}>Create Account</button>
            </div>
          </div>
          <div className="main-right">
            <div className="feature-list">
              <div className="feature-item">⚡ Fast uploads</div>
              <div className="feature-item">🔒 Secure groups</div>
              <div className="feature-item">📁 File history</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
