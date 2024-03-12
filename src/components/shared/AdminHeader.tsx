import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {}

const AdminHeader = async (props: Props) => {
  return (
    <div className='navbar bg-primary'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
            </svg>
          </label>
          <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 hidden md:block'>
            <li>
              <Link href='/'>Vragenlijst</Link>
            </li>
            <li>
              <Link href='/overons'>Afbeeldingen</Link>
            </li>
            <li>
              <Link href='/meedoen'>Gebruikers</Link>
            </li>
          </ul>
        </div>
        <Image src={'/oogned.png'} alt='Sunbelt logo' width={50} height={50} />
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal menu-md px-1 text-primary-content font-semibold text-lg'>
          <li>
            <Link href='/'>Vragenlijst</Link>
          </li>
          <li>
            <Link href='/overons'>Afbeeldingen</Link>
          </li>
          <li>
            <Link href='/meedoen'>Gebruikers</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'></div>
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

export default AdminHeader
