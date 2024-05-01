'use client'

import { motion, useAnimation } from 'framer-motion'
import { ChangeEvent, useEffect, useState } from 'react'

type Props = {}

const WeightToggleInput = (props: Props) => {
  const [inputValue, setInputValue] = useState(0)
  const controls = useAnimation()

  // Function to update input value
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value))
  }

  const decrement = () => {
    setInputValue((prev) => prev - 1)
  }

  const increment = () => {
    setInputValue((prev) => prev + 1)
  }

  // Function to calculate background color based on input value
  const calculateBackgroundColor = () => {
    if (inputValue >= -5 && inputValue <= 5) {
      const greenValue = Math.min((inputValue + 5) / 10, 1)
      const redValue = Math.min((5 - inputValue) / 10, 1)
      return `rgb(${Math.round(redValue * 255)}, ${Math.round(greenValue * 255)}, 0)`
    } else if (inputValue > 5) {
      return 'rgb(0, 255, 0)'
    } else {
      return 'rgb(255, 0, 0)'
    }
  }

  useEffect(() => {
    // Start background color animation after component has mounted
    controls.start({ backgroundColor: calculateBackgroundColor() })
  }, [inputValue]) // Re-run the effect whenever inputValue changes

  // Update background color animation
  //controls.start({ backgroundColor: calculateBackgroundColor() })

  /*
  import {motion, useMotionValue, useTransform, animate}  from 'framer-motionn';   

const Counter = ({ from, to, duration }) => {
 const count = useMotionValue(from);
 const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: duration });
    return controls.stop;
  }, []);

 return <motion.p>{rounded}</motion.p>;
};
*/
  return (
    <div className='relative flex items-center max-w-4[rem]'>
      <motion.button
        type='button'
        id='decrement-button'
        data-input-counter-decrement='quantity-input'
        onClick={decrement}
        className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
        whileTap={{
          scale: 0.8,
          borderTopLeftRadius: '90%',
          borderBottomLeftRadius: '90%',
          autoReverse: true,
        }}
      >
        <svg className='w-2 h-2 text-gray-900 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 2'>
          <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M1 1h16' />
        </svg>
      </motion.button>
      <motion.input
        type='text'
        id='quantity-input'
        data-input-counter
        value={inputValue}
        onChange={handleInputChange}
        className='bg-gray-50 border-x-0 border-gray-300 h-8 w-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='0'
        required
        animate={controls}
      />
      <motion.button
        type='button'
        id='increment-button'
        data-input-counter-increment='quantity-input'
        onClick={increment}
        className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
        whileTap={{
          scale: 0.8,
          borderTopRightRadius: '90%',
          borderBottomRightRadius: '90%',
          autoReverse: true,
        }}
      >
        <svg className='w-2 h-2 text-gray-900 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
          <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 1v16M1 9h16' />
        </svg>
      </motion.button>
    </div>
  )
}

export default WeightToggleInput
