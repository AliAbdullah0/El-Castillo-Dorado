import React from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
  // const date = new Date().toLocaleHuString();

  return (
    <div className='w-full bg-general justify-between lg:text-base text-sm lg:items-center lg:gap-0 gap-3 p-5 min-h-56 lg:flex-row flex-col flex '>
      <div className='flex flex-col w-[30%] text-xl '>
        <div className='text-base lg:text-xl'>
        <Link>El Castillo Dorado</Link>
        <span className='font-light text-orange-700'> | </span>
        <Link>PK</Link>
        </div>
        <div className='text-base text-orange-500 lg:text-xl'>
        <Link to={'discussions'}>Discussions</Link>
        <span className='font-light text-orange-700'> | </span>
        <Link>+923197055066</Link>
        </div>
        <p className='text-base'>
            <span>&copy; Copyright 2025 <br /><span className='mr-1'> |</span>All Rights Reserved <br /></span>
            <span className='font-extralight '><span className='mr-1'> |</span>Developed By Genix Labs</span>
          </p>
      </div>   
      <div className='flex w-[70%] gap-6 lg:flex-row flex-col justify-end lg:p-3'>
        {/* <div className='flex flex-col'>
        <h4 className='text-start text-xl'>Branches</h4>
          <div className='flex flex-col'>
            <Link>California</Link>
            <Link>Houstan</Link>
            <Link>Florida</Link>
            <Link>Albarqarque</Link>
          </div>
        </div> */}
        <div className='flex flex-col '>
        <h4 className='text-start text-xl'>Follow Us</h4>
          <div className='flex flex-col'>
            <a className='hover:text-orange-600 hover:transition-all' href="https://www.instagram.com/genixresourcelab/">Instagram</a>
            <a className='hover:text-orange-600 hover:transition-all' href="https://github.com/AliAbdullah0">Github</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
