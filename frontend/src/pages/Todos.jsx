import React, { useEffect, useState } from 'react'
import { FaTasks } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Todos = () => {

  const [name, setName] = useState(null)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("http://localhost:5000/todos", {
          method: "GET",
          credentials: "include",
        });


        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        const { name, todos } = await res.json();

        setName(name);
        setTodos(todos);
      } catch (err) {
        console.error(err);
      }
    };

    getTodos();
    console.log('Sent get request to api/todos')
  }, []);

  const deleteTodo = async (id) => {

    const res = await fetch(`http://localhost:5000/deleteTodo/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    setTodos(prev => prev.filter(todo => todo._id !== id))

    // window.location.reload()
  }
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white'>

      {/* Header */}
      <Navbar name={name} />

      <div className='flex'>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className='flex-1 p-8'>

          <div className='bg-slate-800 rounded-2xl p-8 shadow-lg'>

            <h2 className='text-3xl font-bold mb-8 flex items-center gap-3'>
              <FaTasks className='text-green-400' />
              My Todos
            </h2>

            <div className='space-y-4'>

              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className='bg-slate-700 rounded-xl p-5 flex justify-between items-center hover:bg-slate-600 transition'
                >

                  <h3 className='text-lg font-medium'>
                    {todo.desc}
                  </h3>

                  <div className='flex items-center gap-3'>

                    {todo.isDone && (
                      <span className='px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500/30'>
                        ✅ Completed
                      </span>
                    )}

                    {todo.isPriority && (
                      <span className='px-3 py-1 rounded-full text-sm font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30'>
                        🔥 Priority
                      </span>
                    )}

                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className='px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition cursor-pointer'
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Todos