import { useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/Signup.jsx'
import { Layout1 } from './Layouts/Layout1.jsx'
import { Main } from './pages/Main.jsx'
import Share from './pages/Share.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AuthRedirect from './components/AuthRedirect.jsx'

function App() {
  const [count, setCount] = useState(0)

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthRedirect />,
      children: [
        {
          index: true,
          element: <Home />,
        }
      ]
    },
    {
      path: '/login',
      element: <AuthRedirect />,
      children: [
        {
          index: true,
          element: <Login />,
        }
      ]
    },
    {
      path: '/signup',
      element: <AuthRedirect />,
      children: [
        {
          index: true,
          element: <Signup />,
        }
      ]
    },
    {
      path: '/app',
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout1 />,
          children: [
            {
              index: true,
              element: <Main />,
            },
            {
              path: '/app/shareshort',
              element: <Share />,
            }
          ]
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
