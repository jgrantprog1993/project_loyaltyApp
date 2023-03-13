// @ts-nocheck
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'


export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => setIsBrowser(true))

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center md:inset-0 h-[calc(100%-1rem)] md:h-full">
        
      <div className='relative w-full h-full max-w-md md:h-auto'>
        <div className='flex justify-end text-2xl'>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className=''>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('portal')
    )
  } else {
    return null
  }
}
