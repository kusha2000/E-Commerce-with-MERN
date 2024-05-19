import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <header className='h-16 shadow-md'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Logo w={90} h={50}/>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder="serach product here" className='w-full outline-none '/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
          <GrSearch />
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='text-3xl cursor-pointer'>
            <FaRegCircleUser />
          </div>
          <div className='text-2xl relative cursor-pointer'>
            <span><FaShoppingCart /></span>
            <div className='bg-red-600 rounded-full text-white w-5 h-5 pl-1.5 pt-0.5 items-center justify-center absolute -top-2 -right-3'>
              <p className='text-xs'>0</p>
            </div>
          </div>
          <div>
            <button className='px-2 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Login</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header