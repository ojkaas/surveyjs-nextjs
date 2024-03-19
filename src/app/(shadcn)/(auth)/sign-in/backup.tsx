'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function Signin() {
  const [email, setEmail] = useState('')

  return (
    <main>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>Inloggen</h1>
            <p className='leading-relaxed mb-5 text-gray-600'>Als u een account heeft bij Oogned.nl kunt u hier een inlog link aanvragen.</p>
          </div>
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' id='email' name='email' placeholder='email' className='input input-bordered' required />
              </div>
              <div className='form-control mt-6'>
                <button onClick={() => signIn('email', { email, callbackUrl: '/logged-in' })} className='btn btn-primary'>
                  Email link aanvragen
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
