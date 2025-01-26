import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = () => {
  const date = new Date().toLocaleDateString();
  return (
    <>
<nav class="bg-general  items-center justify-evenly min-h-16 lg:p-16  flex flex-col lg:flex-row">
  <div className='lg:w-[33%] w-full h-full p-2 flex items-center '>
  <h2 className='text-2xl lg:block hidden'>
          Islamabad <span className='font-light'>|</span> PK
        </h2>
  </div>
  <Link to={'/'} className='lg:w-[33%] text-center gap-2 lg:gap-0 h-full lg:flex flex-col items-center p-6 lg:p-2'>
    <h1 className='tracking-wide lg:text-4xl text-3xl text-center lg:mx-auto'>El Castillo Dorado</h1>
    <h3 className='text-sm border-t text-center'>Where every meal is a story and every stay is a memory.</h3>
    </Link>
  <div className='w-[33%] h-full hidden  text-2xl lg:flex items-center justify-end p-2'>
    <h2 className='lg:block hidden'>{date}</h2>
    </div>
  <div className='w-full flex lg:hidden items-center justify-between p-2 '>
  <h2 className='lg:hidden'>
          Islamabad <span className='font-light'>|</span> PK
        </h2>
        <h2 className=' lg:hidden'>{date}</h2>
  </div>
</nav>
  <div className='w-full bg-secondary'>
    <ul className='flex justify-around w-full flex-col lg:flex-row md:text-lg items-center'>
      <div className='flex w-full justify-evenly lg:justify-between items-center'>
      <Link to={'explore'} className='  hover:bg-[#c6c0ad] focus:bg-[#c6c0ad] hover:transition-all p-2 w-1/2  text-center'>Explore</Link>
      <Link to={'discussions'} className='hover:bg-[#c6c0ad] focus:bg-[#c6c0ad] p-2 text-center w-1/2  hover:transition-all '>Discussion</Link>
      </div>
      <div  className='flex w-full justify-evenly lg:justify-between items-center'>
      <Link to={'gallery'} className='hover:bg-[#c6c0ad] focus:bg-[#c6c0ad] p-2 text-center w-1/2  hover:transition-all'>Gallery</Link>
      <Link to={'about'} className='hover:bg-[#c6c0ad] focus:bg-[#c6c0ad] p-2 text-center w-1/2  hover:transition-all'>About</Link>
      </div>
    </ul>
  </div>
</>

  )
}

export default Navigation
