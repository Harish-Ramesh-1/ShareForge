import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthRedirect = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      credentials: "include"
    })
      .then(res => {
        if (res.status === 200) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      })
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="page-wrap">
        <div className="premium-card p-6 text-center">
          <p className="timer">Checking authentication...</p>
        </div>
      </main>
    );
  }

  // If user is already authenticated, redirect to app
  if (authorized) {
    return <Navigate to="/app" replace />;
  }

  // If not authenticated, render the public page
  return <Outlet />;
};

export default AuthRedirect;
