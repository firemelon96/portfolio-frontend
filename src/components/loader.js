import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
        <div className='flex gap-5 text-6xl text-semibold'>
            <h1 className='text-tertiary t'>T</h1>
            <h1 className='text-fourth e'>E</h1>
            <h1 className='text-tertiary k'>K</h1>
            <h1 className='text-fourth a'>A</h1>
        </div>
    </div>
  )
}

export default Loader