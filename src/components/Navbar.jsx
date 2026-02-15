import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-blue-900 text-white py-2'>
        <div className="logo mx-2">
            <span className='font-bold text-2xl'>iTask</span>
        </div>
        <ul className="flex gap-3 text-xl mx-3">
            <li className='hover:font-bold cursor-pointer transition-all'>Home</li>
            <li className='hover:font-bold cursor-pointer transition-all'>Your Todo</li>
        </ul>
    </nav>
  )
}

export default Navbar
