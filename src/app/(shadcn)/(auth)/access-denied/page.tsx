import React from 'react'

type Props = {}

function Page({}: Props) {
  return (
    <>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Toegang geweigerd</h1>
            <p className='py-6'>U heeft geen toegang tot het OogNed systeem.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
