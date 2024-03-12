'use client'
import React, { useState } from 'react'

const NewUser: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Add your logic to handle form submission here
    console.log('Name:', name)
    console.log('Email:', email)
  }

  return (
    <>
      <button className='btn' onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
        </svg>
        Gebruiker toevoegen
      </button>
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <h3 className='font-bold text-lg'>Hello!</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' value={name} onChange={handleNameChange} />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' value={email} onChange={handleEmailChange} />
            </div>
            <button className='btn' type='submit'>
              Gebruiker toevoegen
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default NewUser
