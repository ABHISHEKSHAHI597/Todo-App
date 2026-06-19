import React from 'react'
import { FaTasks } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Todos = () => {

  const todos = [
    {
      _id: 1,
      desc: 'Learn JWT Authentication',
      isDone: false,
      isPriority: true
    },
    {
      _id: 2,
      desc: 'Complete DSA Practice',
      isDone: true,
      isPriority: false
    },
    {
      _id: 3,
      desc: 'Build Dashboard UI',
      isDone: true,
      isPriority: true
    },
    {
      _id: 4,
      desc: 'Setup Express Session',
      isDone: false,
      isPriority: false
    }
  ]

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

                  <div className='flex gap-2'>

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