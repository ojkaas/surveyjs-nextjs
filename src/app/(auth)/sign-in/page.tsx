'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function Signin() {
  const [email, setEmail] = useState('')

  return (
    <main>
      <div className='container px-5 py-24 mx-auto flex justify-center'>
        <div className='bg-slate-100 rounded-lg p-8 flex flex-col w-1/2 mt-10 md:mt-0 relative z-10 shadow-md'>
          <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>🌐 Magic Link</h2>
          <p className='leading-relaxed mb-5 text-gray-600'>Sign in by clicking a link in the email</p>
          <div className='relative mb-4'>
            <label className='leading-7 text-sm text-gray-600'>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              id='email'
              name='email'
              className='w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <button onClick={() => signIn('email', { email, callbackUrl: '/' })} className='text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
            Log in / Sign up
          </button>
        </div>
      </div>
    </main>
  )
}
