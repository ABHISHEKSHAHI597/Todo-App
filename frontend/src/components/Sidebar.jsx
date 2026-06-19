import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        < aside className="w-64 min-h-[calc(100vh-80px)] bg-slate-800 border-r border-slate-700 p-6" >

            <h2 className="text-lg font-semibold mb-6 text-slate-300">
                Navigation
            </h2>

            <ul className="space-y-3">

                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg transition ${isActive
                                ? 'bg-green-500 text-white pointer-events-none'
                                : 'hover:bg-slate-700 text-slate-200'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/todos"
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg transition ${isActive
                                ? 'bg-green-500 text-white pointer-events-none'
                                : 'hover:bg-slate-700 text-slate-200'
                            }`
                        }
                    >
                        My Todos
                    </NavLink>
                </li>

            </ul>

        </aside >
    )
}

export default Sidebar