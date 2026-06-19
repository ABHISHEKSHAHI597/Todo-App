import React from 'react'
import { FaTasks, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate = useNavigate()
    const handleLogout = () => {
    navigate("/")
  }
    return (
        <nav className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">
            <div className="flex items-center gap-3">
                <FaTasks className="text-green-500 text-2xl" />
                <h1 className="text-2xl font-bold">Todo App</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <FaUser />
                    <span>{props.name}</span>
                </div>

                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition">
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar