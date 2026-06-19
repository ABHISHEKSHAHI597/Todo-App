import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'

const Home = () => {

  const navigate = useNavigate()

  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: {
      errors: loginErrors,
      isSubmitting: loginSubmitting,
    },
  } = useForm()

  // Register Form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: {
      errors: registerErrors,
      isSubmitting: registerSubmitting,
    },
  } = useForm()

  const password = watch("password")

  // Login function

  const submitLogin = async (data) => {

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })

    const statusCode = await res.status

    const result = await res.json()

    if (statusCode == 401) {
      alert(result.message);
    }

    if (statusCode == 200) {
      // Code after user is logged in
      navigate('/dashboard')
      console.log(result.message)
    }
  }

  // Register function

  const submitRegister = async (data) => {
    const { confirmPassword, ...userData } = data

    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.username,
        email: data.email,
        password: data.password
      })
    })

    const statusCode = res.status

    const result = await res.json()

    if (statusCode == 409) {
      alert(result.message);
    }

    if (statusCode == 201) {
      // Code after user is registered
      navigate('/dashboard')
      console.log(result.message)
    }

  }

  const inputStyles = 'w-full px-4 py-3 rounded-xl bg-slate-700/80 text-white border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all duration-300'

  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col'>

        {/* Header */}
        <div className='h-24 bg-slate-950/70 backdrop-blur-md border-b border-slate-800 flex items-center justify-center shadow-2xl'>
          <h1 className='text-5xl font-extrabold bg-linear-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent'>
            Todo App
          </h1>
        </div>

        {/* Login and Register Cards */}
        <div className='flex flex-col lg:flex-row flex-1 gap-10 justify-center items-center px-6 py-12'>

          {/* Login Card */}
          <div className='w-full max-w-md rounded-3xl p-8 bg-slate-800/60 backdrop-blur-xl border border-slate-700 shadow-[0_0_40px_rgba(34,197,94,0.08)] hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] transition-all duration-300'>

            <h2 className='text-slate-50 text-4xl font-bold text-center mb-8'>
              Login <span className='block text-slate-400 text-base mt-2 font-normal'>(For existing user)</span>
            </h2>

            {loginSubmitting && (
              <div className='text-green-500 text-center mb-4'>
                Submitting...
              </div>
            )}

            <form
              onSubmit={handleLoginSubmit(submitLogin)}
              className='flex flex-col gap-5'
            >

              <div>
                <input
                  placeholder='Enter email'
                  {...loginRegister("email", {
                    required: {
                      value: true,
                      message: "Please enter your email"
                    }
                  })}
                  type="email"
                  className={inputStyles}
                />

                {loginErrors.email && (
                  <div className='text-red-500 mt-1 text-sm'>
                    {loginErrors.email.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  placeholder='Enter password'
                  {...loginRegister("password", {
                    required: {
                      value: true,
                      message: "Please enter your password"
                    }
                  })}
                  type="password"
                  className={inputStyles}
                />

                {loginErrors.password && (
                  <div className='text-red-500 mt-1 text-sm'>
                    {loginErrors.password.message}
                  </div>
                )}
              </div>

              <input
                disabled={loginSubmitting}
                type='submit'
                value='Login'
                className='bg-green-500 text-white py-3 rounded-xl font-semibold cursor-pointer hover:bg-green-600 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg'
              />

            </form>

          </div>

          {/* Register Card */}
          <div className='w-full max-w-md rounded-3xl p-8 bg-slate-800/60 backdrop-blur-xl border border-slate-700 shadow-[0_0_40px_rgba(34,197,94,0.08)] hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] transition-all duration-300'>

            <h2 className='text-slate-50 text-4xl font-bold text-center mb-8'>
              Register <span className='block text-slate-400 text-base mt-2 font-normal'>(For new user)</span>
            </h2>

            {registerSubmitting && (
              <div className='text-green-500 text-center mb-2'>
                Submitting...
              </div>
            )}

            <form
              onSubmit={handleRegisterSubmit(submitRegister)}
              className='flex flex-col gap-5'
            >

              <div>
                <input
                  placeholder='Enter username'
                  {...registerRegister("username", {
                    required: {
                      value: true,
                      message: "Please enter your username"
                    }
                  })}
                  type="text"
                  className={inputStyles}
                />

                {registerErrors.username && (
                  <div className='text-red-500 mt-1 text-sm'>
                    {registerErrors.username.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  placeholder='Enter email'
                  {...registerRegister("email", {
                    required: {
                      value: true,
                      message: "Please enter your email"
                    }
                  })}
                  type="email"
                  className={inputStyles}
                />

                {registerErrors.email && (
                  <div className='text-red-500 mt-1 text-sm'>
                    {registerErrors.email.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  placeholder='Enter password'
                  {...registerRegister("password", {
                    required: {
                      value: true,
                      message: "Please enter your password"
                    },
                    minLength: {
                      value: 8,
                      message: "Min length is 8"
                    },
                    maxLength: {
                      value: 16,
                      message: "Max length is 16"
                    }
                  })}
                  type="password"
                  className={inputStyles}
                />

                {registerErrors.password && (
                  <div className='text-red-500 mt-1 text-sm'>
                    {registerErrors.password.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  placeholder='Confirm password'
                  {...registerRegister("confirmPassword", {
                    required: {
                      value: true,
                      message: "Please confirm your password"
                    },
                    validate: (value) =>
                      value === password || "Passwords do not match"
                  })}
                  type="password"
                  className={inputStyles}
                />

                {registerErrors.confirmPassword && (
                  <div className='text-red-500 mt-1 text-sm'>
                    {registerErrors.confirmPassword.message}
                  </div>
                )}
              </div>

              <input
                disabled={registerSubmitting}
                type='submit'
                value='Register'
                className='bg-green-500 text-white py-3 rounded-xl font-semibold cursor-pointer hover:bg-green-600 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg'
              />

            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default Home