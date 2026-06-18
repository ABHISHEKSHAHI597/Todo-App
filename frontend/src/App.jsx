import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App