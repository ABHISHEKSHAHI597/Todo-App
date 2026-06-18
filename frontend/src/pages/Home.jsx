import React from 'react'
import { useForm } from "react-hook-form"

const Home = () => {

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

  const submitLogin = async (data) => {

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
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
    
    if (statusCode == 401){
      alert(result.message);
    }

    if(statusCode == 200){
      // Code after user is logged in
      console.log(result.message)
    }
  }

  const submitRegister = async (data) => {
    const { confirmPassword, ...userData } = data

    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })

    const statusCode = res.status

    const result = await res.json()

    if (statusCode == 409){
      alert(result.message);
    }

    if(statusCode == 201){
      // Code after user is registered
      console.log(result.message)
    }
    
  }

  return (
    <>
      <div className='bg-[#0F172A] min-h-screen flex flex-col'>

        {/* Header */}
        <div className='h-20 bg-[#111827] flex items-center justify-center text-[#22C55E] text-4xl font-semibold shadow-lg'>
          <p>Welcome to my Todo App</p>
        </div>

        {/* Login and Register Cards */}
        <div className='flex flex-1 gap-12 justify-center items-center px-10'>

          {/* Login Card */}
          <div className='bg-[#1E293B] w-full max-w-md rounded-3xl p-8 shadow-2xl'>

            <h2 className='text-[#F8FAFC] text-3xl font-bold text-center mb-8'>
              Login <span className='text-slate-400 text-xl font-medium'>(Existing User)</span>
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
                  className='w-full p-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-[#22C55E]'
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
                  className='w-full p-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-[#22C55E]'
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
                className='bg-[#22C55E] text-white py-3 rounded-xl font-semibold cursor-pointer hover:bg-green-600 transition duration-200 disabled:opacity-50'
              />

            </form>

          </div>

          {/* Register Card */}
          <div className='bg-[#1E293B] w-full max-w-md rounded-3xl px-8 py-8 shadow-2xl'>

            <h2 className='text-[#F8FAFC] text-3xl font-bold text-center mb-8'>
              Register <span className='text-slate-400 text-xl font-medium'>(New user)</span>
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
                  className='w-full p-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-[#22C55E]'
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
                  className='w-full p-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-[#22C55E]'
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
                  className='w-full p-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-[#22C55E]'
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
                  className='w-full p-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-[#22C55E]'
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
                className='bg-[#22C55E] text-white py-3 rounded-xl font-semibold cursor-pointer hover:bg-green-600 transition duration-200 disabled:opacity-50'
              />

            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default Home