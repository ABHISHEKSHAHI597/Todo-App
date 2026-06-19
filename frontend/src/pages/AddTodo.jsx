import React from 'react'
import { useForm } from 'react-hook-form'
import { FaPlusCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AddTodo = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm()

  const submitTodo = async (data) => {

    const res = await fetch('http://localhost:5000/dashboard/addTodo', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        desc: data.desc.trim(),
        isDone: data.isDone,
        isPriority: data.isPriority
      })
    })

    const result = await res.json()

    alert(result.message)

    navigate('/dashboard')
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 flex justify-center items-center p-6'>

      <div className='w-full max-w-2xl bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-[0_0_40px_rgba(34,197,94,0.08)]'>

        <div className='flex items-center justify-center gap-3 mb-8'>
          <FaPlusCircle className='text-green-500 text-4xl' />
          <h1 className='text-4xl font-bold text-white'>
            Add New Todo
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(submitTodo)}
          className='space-y-6'
        >

          {/* Description */}

          <div>
            <label className='block text-slate-300 mb-2 font-medium'>
              Description
            </label>

            <textarea
              rows='1'
              placeholder='Describe your task...'
              {...register('desc', {
                required: 'Description is required'
              })}
              className='w-full px-4 py-3 rounded-xl bg-slate-700/80 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 resize-none'
            />

            {errors.desc && (
              <p className='text-red-400 mt-2 text-sm'>
                {errors.desc.message}
              </p>
            )}
          </div>

          {/* Completed */}

          <div>
            <label className='block text-slate-300 mb-2 font-medium'>
              Is this task completed?
            </label>

            <select
              {...register('isDone', {
                required: 'Please select an option'
              })}
              className='w-full px-4 py-3 rounded-xl bg-slate-700/80 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500'
            >
              <option value=''>Select</option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>

            {errors.isDone && (
              <p className='text-red-400 mt-2 text-sm'>
                {errors.isDone.message}
              </p>
            )}
          </div>

          {/* Priority */}

          <div>
            <label className='block text-slate-300 mb-2 font-medium'>
              Mark as high priority?
            </label>

            <select
              {...register('isPriority', {
                required: 'Please select an option'
              })}
              className='w-full px-4 py-3 rounded-xl bg-slate-700/80 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500'
            >
              <option value=''>Select</option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>

            {errors.isPriority && (
              <p className='text-red-400 mt-2 text-sm'>
                {errors.isPriority.message}
              </p>
            )}
          </div>

          {/* In Progress */}

          <div>
            <label className='block text-slate-300 mb-2 font-medium'>
              Is this task currently in progress?
            </label>

            <select
              {...register('isInProgress', {
                required: 'Please select an option'
              })}
              className='w-full px-4 py-3 rounded-xl bg-slate-700/80 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500'
            >
              <option value=''>Select</option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>

            {errors.isInProgress && (
              <p className='text-red-400 mt-2 text-sm'>
                {errors.isInProgress.message}
              </p>
            )}
          </div>

          {/* Submit Button */}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50'
          >
            {isSubmitting ? 'Creating Todo...' : 'Create Todo'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddTodo