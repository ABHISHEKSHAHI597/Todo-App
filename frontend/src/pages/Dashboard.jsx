import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTasks, FaCheckCircle, FaClock, FaPlus, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Todo from './AddTodo'

const Dashboard = () => {

  const navigate = useNavigate()

  // const [todos, setTodos] = useState([])
  const [name, setName] = useState()
  const [total, setTotal] = useState()
  const [completed, setCompleted] = useState()
  const [pending, setPending] = useState()
  const [progress,setProgress] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:5000/dashboard', {
          credentials: 'include'
        })

        const data = await res.json()

        if (res.status === 401 || res.status === 404) {
          alert(`${data.message}\nReturning back to home page`)
          navigate('/')
          return
        }

        if (res.status === 200) {
          // setTodos(data.todos)
          setName(data.name)
          setTotal(data.total)
          setCompleted(data.completed)
          setPending(data.pending)
          setProgress(data.progress)
          return
        }
      }
      catch (error) {
        alert('Server not responding, returning back to home page')
        navigate('/')
      }
    }

    getData()
  }, [navigate])

  const handleLogout = () => {
    navigate("/")
  } 
  
  const handleAddNewTodo = () => {
    navigate("/dashboard/addTodo")
  }

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-slate-50">

        {/* Navbar */}
        <nav className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <FaTasks className="text-green-500 text-2xl" />
            <h1 className="text-2xl font-bold">Todo App</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>{name}</span>
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </nav>

        <div className="flex">

          {/* Sidebar */}
          <aside className="w-64 min-h-[calc(100vh-80px)] bg-slate-800 border-r border-slate-700 p-6">

            <h2 className="text-lg font-semibold mb-6 text-slate-300">
              Navigation
            </h2>

            <ul className="space-y-3">

              <li className="bg-green-500 text-white px-4 py-3 rounded-lg cursor-pointer">
                Dashboard
              </li>

              <li className="hover:bg-slate-700 px-4 py-3 rounded-lg cursor-pointer transition">
                My Todos
              </li>

              <li className="hover:bg-slate-700 px-4 py-3 rounded-lg cursor-pointer transition">
                Completed
              </li>

            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">

            {/* Hero Section */}
            <div className="bg-slate-800 rounded-2xl p-8 mb-8 shadow-lg">

              <h1 className="text-4xl font-bold mb-2">
                Welcome Back 👋
              </h1>

              <p className="text-slate-400 mb-6">
                Stay productive and keep track of your daily goals.
              </p>

              <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2" onClick={handleAddNewTodo}>
                <FaPlus />
                Add New Todo
              </button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

              <div className="bg-slate-800 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <FaTasks className="text-blue-500 text-xl" />
                  <h3 className="text-slate-400">Total Todos</h3>
                </div>
                <p className="text-4xl font-bold">{total}</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <h3 className="text-slate-400">Completed</h3>
                </div>
                <p className="text-4xl font-bold">{completed}</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-3">
                  <FaClock className="text-yellow-500 text-xl" />
                  <h3 className="text-slate-400">Pending</h3>
                </div>
                <p className="text-4xl font-bold">{pending}</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-3">
                  <FaCheckCircle className="text-purple-500 text-xl" />
                  <h3 className="text-slate-400">Progress</h3>
                </div>
                <p className="text-4xl font-bold">{progress}</p>
              </div>

            </div>

            {/* Tasks + Priority */}
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Tasks In Progress */}
              <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

                <h2 className="text-2xl font-bold mb-6">
                  🚀 Tasks In Progress
                </h2>

                <div className="space-y-4">

                  <div className="bg-slate-700 p-4 rounded-lg flex justify-between">
                    <span>Learn JWT Authentication</span>
                    <span className="text-yellow-400">Pending</span>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-lg flex justify-between">
                    <span>Complete DSA Practice</span>
                    <span className="text-yellow-400">Pending</span>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-lg flex justify-between">
                    <span>Build Dashboard UI</span>
                    <span className="text-green-400">Completed</span>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-lg flex justify-between">
                    <span>Setup Express Session</span>
                    <span className="text-green-400">Completed</span>
                  </div>

                </div>

              </div>

              {/* Priority Tasks */}
              <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

                <h2 className="text-2xl font-bold mb-6">
                  🔥 Priority Tasks
                </h2>

                <div className="space-y-4">

                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-semibold">
                      Deploy MERN Project
                    </h3>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-semibold">
                      Finish MongoDB Integration
                    </h3>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-semibold">
                      Add User Authentication
                    </h3>
                  </div>

                </div>

              </div>

            </div>

          </main>

        </div>

        {/* Floating Button */}
        <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-xl flex items-center justify-center text-2xl transition" onClick={handleAddNewTodo}>
          <FaPlus />
        </button>

      </div>
    </>
  )
}

export default Dashboard