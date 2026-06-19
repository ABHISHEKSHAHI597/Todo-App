import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()

  // const [todos, setTodos] = useState([])
  const [name, setName] = useState(null)

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
          return
        }

        alert('Internal server error\nRedirecting back to home page')
        navigate('/')
      }
      catch (error) {
        alert('Server not responding')
        navigate('/')
      }
    }

    getData()
  }, [navigate])

  return (
    <>
      {/* Header */}
      <div className='h-20 bg-[#111827] flex items-center justify-center text-[#22C55E] text-4xl font-semibold shadow-lg'>
        <p>Welcome {name}</p>
      </div>
    </>
  )
}

export default Dashboard