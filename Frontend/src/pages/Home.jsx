import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-header-content">
          <h1 className="home-logo">ShareForge</h1>
          <nav className="home-nav">
            <button onClick={() => navigate('/login')} className="home-nav-button">
              Sign In
            </button>
            <button onClick={() => navigate('/signup')} className="home-signup-button">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-content">
            <h2 className="home-hero-title">Collaborate Seamlessly</h2>
            <p className="home-hero-subtitle">
              Share files, exchange messages, and manage projects with your team in password-protected groups
            </p>
            <div className="home-hero-cta">
              <button onClick={() => navigate('/signup')} className="home-primary-button">
                Get Started Free
              </button>
              <button onClick={() => navigate('/login')} className="home-secondary-button">
                Sign In
              </button>
            </div>
          </div>
        </section>

        <section className="home-features">
          <h3 className="home-features-title">Powerful Features</h3>
          <div className="home-feature-grid">
            <div className="home-feature-card">
              <div className="home-feature-icon">📁</div>
              <h4 className="home-feature-name">File Sharing</h4>
              <p className="home-feature-desc">
                Upload and share files instantly with your project team
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">💬</div>
              <h4 className="home-feature-name">Real-time Messaging</h4>
              <p className="home-feature-desc">
                Communicate with your team through instant messages
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">🔒</div>
              <h4 className="home-feature-name">Secure Groups</h4>
              <p className="home-feature-desc">
                Password-protected project groups ensure privacy and security
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">👥</div>
              <h4 className="home-feature-name">Team Collaboration</h4>
              <p className="home-feature-desc">
                Work together efficiently with your entire team in one place
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">⚡</div>
              <h4 className="home-feature-name">Lightning Fast</h4>
              <p className="home-feature-desc">
                Experience quick uploads and instant message delivery
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">📊</div>
              <h4 className="home-feature-name">Project Management</h4>
              <p className="home-feature-desc">
                Organize and track all your projects in one dashboard
              </p>
            </div>
          </div>
        </section>

        <section className="home-howitworks">
          <h3 className="home-work-title">How It Works</h3>
          <div className="home-steps">
            <div className="home-step">
              <div className="home-step-number">1</div>
              <h4 className="home-step-title">Create Account</h4>
              <p className="home-step-desc">Sign up with your email and set a password</p>
            </div>

            <div className="home-divider" />

            <div className="home-step">
              <div className="home-step-number">2</div>
              <h4 className="home-step-title">Create Project Group</h4>
              <p className="home-step-desc">Set up a new project with password protection</p>
            </div>

            <div className="home-divider" />

            <div className="home-step">
              <div className="home-step-number">3</div>
              <h4 className="home-step-title">Invite & Share</h4>
              <p className="home-step-desc">Invite team members and start collaborating</p>
            </div>

            <div className="home-divider" />

            <div className="home-step">
              <div className="home-step-number">4</div>
              <h4 className="home-step-title">Collaborate</h4>
              <p className="home-step-desc">Share files and message your team instantly</p>
            </div>
          </div>
        </section>

        <section className="home-cta">
          <h3 className="home-cta-title">Ready to Get Started?</h3>
          <p className="home-cta-desc">Join teams around the world collaborating on amazing projects</p>
          <button onClick={() => navigate('/signup')} className="home-cta-button">
            Create Your Account
          </button>
        </section>
      </main>

      <footer className="home-footer">
        <p className="home-footer-text">© 2026 ShareForge. All rights reserved.</p>
      </footer>
    </div>
  );
}
