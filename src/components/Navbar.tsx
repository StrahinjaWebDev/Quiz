import React from 'react'
import SignOutBtn from '../components/SignOutBtn'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center'>
    <nav className='w-[90vw] h-[10vw] flex items-center justify-between '>
      <h1 className='text-6xl text-secondary font-semibold'>Quizzy</h1>
<SignOutBtn label='Sign Out' primary />
    </nav>
  </div>
  )
}

export default Navbar