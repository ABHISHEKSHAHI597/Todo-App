import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddTodo from './pages/AddTodo'
import Todos from './pages/Todos'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/dashboard/addTodo",
      element: <AddTodo />
    },
    {
      path: "/todos",
      element: <Todos />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App