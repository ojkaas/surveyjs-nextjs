import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {}

const Header = async (props: Props) => {
  return (
    <div className='navbar bg-primary'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden text-base-100'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
            </svg>
          </label>
          <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/overons'>Over ons</Link>
            </li>
            <li>
              <Link href='/meedoen'>Meedoen</Link>
            </li>
          </ul>
        </div>
        <Image src={'/oogned.png'} alt='Sunbelt logo' width={200} height={50} />
        <Link href='/' className='btn btn-ghost text-xl'>
          OogNed
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal menu-md px-1 text-primary-content font-semibold text-lg'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/overons'>Over ons</Link>
          </li>
          <li>
            <Link href='/meedoen'>Meedoen</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <Link className='btn btn-secondary' href='/sign-in'>
          Inloggen
        </Link>
      </div>
    </div>
  )
}

/*
if you want a submenu 
            <details>
              <summary>Rent</summary>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>*/

export default Header
