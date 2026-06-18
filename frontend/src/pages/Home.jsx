import React from 'react'
import { useForm } from "react-hook-form"

const Home = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitLogin = async (data) => {
    console.log('This form is showing data of login form')
    console.log(data)
  }

  const submitRegister = async (data) => {
    console.log('This form is showing data of register form')
    console.log(data)
  }

  return (
    <>
      <div className='bg-[#0F172A] min-h-screen flex flex-col'>

        {/* Header */}
        <div className='h-20 bg-[#111827] flex items-center justify-center text-[#22C55E] text-4xl'>
          <p>Welcome to my Todo App</p>
        </div>

        {/* Login and Register Cards */}
        <div className='min-w-screen flex flex-1 gap-40 justify-center mt-10'>

          {/* Login Card */}
          <div className='bg-[#1E293B] w-1/3 flex flex-col items-center rounded-3xl'>
            <p className='text-[#F8FAFC] text-3xl'>Login</p>

            {isSubmitting && <div className='text-green-500'>Submitting...</div>}

            <form onSubmit={handleSubmit(submitLogin)}>

              <input placeholder='Enter email' {...register("email", { required: { value: true, message: "Please enter your email" } })} type="email" className='block'/>
              {errors.email && <div className='text-red-600'>{errors.email.message}</div>}

              <input placeholder='Enter password' {...register("password", { required: { value: true, message: "Please enter your password" } })} type="email" className='block'/>
              {errors.password && <div className='text-red-600'>{errors.password.message}</div>}

              <input disabled={isSubmitting} type='submit' />

            </form>
          </div>

          {/* Register Card */}
          <div className='bg-[#1E293B] w-1/3 flex flex-col items-center rounded-3xl'>
            <p className='text-[#F8FAFC] text-3xl'>Register</p>

            {isSubmitting && <div className='text-green-500'>Submitting...</div>}

            <form onSubmit={handleSubmit(submitRegister)}>

              <input placeholder='Enter username' {...register("username", { required: { value: true, message: "Please enter your username" } })} type="text" className='block' />
              {errors.username && <div className='text-red-600'>{errors.username.message}</div>}

              <input placeholder='Enter email' {...register("email", { required: { value: true, message: "Please enter your email" } })} type="email" className='block'/>
              {errors.email && <div className='text-red-600'>{errors.email.message}</div>}

              <input placeholder='Enter password' {...register("password", { required: { value: true, message: "Please enter your password" }, minLength: { value: 8, message: "Min length is 8" }, maxLength: { value: 16, message: "Max length is 16" } })} type="password" className='block' />
              {errors.password && <div className='text-red-600'>{errors.password.message}</div>}

              <input disabled={isSubmitting} type='submit' />

            </form>
          </div>

        </div>

      </div>
    </>
  )
}

export default Home