import React, { useState } from 'react';

function Banner() {
  const [show,setShow] = useState(true)

  const handleShow = ()=>{
    setShow((prev)=>!prev)
  }
  return (
<>
{
 show && ( 
<div id="bottom-banner" tabindex="-1" class="fixed bottom-0 start-0 z-50 flex justify-between w-full p-4  bg-[#d3ccb7]">
    <div class="flex items-center mx-auto">
        <p class="flex items-center text-sm font-normal md:text-base text-gray-700">
            <span>You are currently using the Beta Version of this Site. Please provide feedback in case of any bugs. <a href="/discussions" class="flex items-center ms-0 text-sm font-medium text-orange-600 md:ms-1 md:inline-flex  hover:underline">Provide Feedback <svg class="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg></a></span>
        </p>
    </div>
    <div class="flex items-center" onClick={handleShow}>
        <button data-dismiss-target="#bottom-banner" type="button" class="shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close banner</span>
        </button>
    </div>
</div>)
}
</>
  );
}

export default Banner;
