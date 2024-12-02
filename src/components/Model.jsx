import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Model = ({onClose,isOpen,children}) => {
  return createPortal (
	<>
		  {isOpen && (<div className='grid place-items-center absolute top-0 z-40 h-screen w-screen backdrop-blur'>
			  <div className='relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white p-4'>
				  <div className='flex justify-end'>
					  <AiOutlineClose className='cursor-pointer text-2xl' onClick={onClose}/>
				  </div>
				  {children}
			  </div>
			  <div className='absolute top-0 z-40 h-screen w-screen backdrop-blur' />
		  </div>)}
	  </>,
	  document.getElementById('modal-root')
  )
}

export default Model
