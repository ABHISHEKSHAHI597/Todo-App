import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTasks, FaCheckCircle, FaClock, FaPlus, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Todo from './AddTodo'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Dashboard = () => {

  const navigate = useNavigate()

  // const [todos, setTodos] = useState([])
  const [name, setName] = useState()
  const [total, setTotal] = useState()
  const [completed, setCompleted] = useState()
  const [pending, setPending] = useState()
  const [progress, setProgress] = useState()
  const [inProgressTodos, setInProgressTodos] = useState([])
  const [isPriorityTodos, setIsPriorityTodos] = useState([])

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
          setIsPriorityTodos(data.isPriorityTodos)
          setInProgressTodos(data.inProgressTodos)
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
        <Navbar name={name}/>

        <div className="flex">

          {/* Sidebar */}
          <Sidebar />

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

                  {inProgressTodos.map((todo) => {
                    return (<div key={todo._id} className="bg-slate-700 p-4 rounded-lg flex justify-between">
                      <span>{todo.desc}</span>
                      <span className="text-yellow-400">{todo.isPriority && "⭐ Priority"}</span>
                    </div>)
                  })}

                </div>

              </div>

              {/* Priority Tasks */}
              <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

                <h2 className="text-2xl font-bold mb-6">
                  🔥 Priority Tasks
                </h2>

                <div className="space-y-4">

                  {isPriorityTodos.map((todo) => {
                    return (
                      <div
                        key={todo._id}
                        className="bg-slate-700 p-4 rounded-lg flex justify-between items-center"
                      >
                        <h3 className="font-semibold">
                          {todo.desc}
                        </h3>

                        <span
                          className={`${todo.isDone ? "text-green-400" : "text-yellow-400"
                            }`}
                        >
                          {todo.isDone ? "✅ Completed" : "⏳ Not Completed"}
                        </span>
                      </div>
                    )
                  })}

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