import React from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'

const Admin = () => {
  return (
    <>
    <Navbar />
    <div className='w-screen h-[90vh]'>
    <div className='flex justify-evenly items-center'>
      <button className='text-white'>Create new quiz</button>
      <button className='text-white'>Edit Users</button>
    </div>
    <div className='flex w-screen h-[10vh] items-center pl-12 gap-12'>
    <button>Create new quizz</button>
    <Input label='Search quiz' placeholder='Search quiz...' />
    </div>

    </div>
    </>
  )
}

export default Admin