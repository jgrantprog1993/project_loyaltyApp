import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import error from 'next/error'
import { signInWithEmailAndPassword } from 'firebase/auth'


export default function Login(){
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(true)
  
  const {login, register, currentUser, logout} = useAuth()
  console.log(currentUser)

  async function submitHandler() {
    if (!email || !password){
      setError("Please enter Email and Password")
      return
    }
    if (isLoggingIn){
      try {
        await login(email, password)
        console.log('logged in')
      } catch (err){
        setError("Incorrect Email and Password")
      }
      console.log('logged in')
      return 
    }
    try {
      await register(email, password)
    }catch (err){
      setError("Unable to Register")
    }
  }

  async function submitHandlerLogout() {
    console.log('logged Out Attempt')
    try {
      await logout()
      console.log('logged Out')
      console.log(currentUser)
      
    }catch (err){
      setError("Unable Logout")
    }
  }


  return (
    <>
        {currentUser ? (
                  <button onClick={submitHandlerLogout} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                  <h2 className='relative z-20'>
                    Log Out
                  </h2>
                </button>
        )
        
         :
        (
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-cener items-center gap-2 sm:gap-4'>
          <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>{isLoggingIn ? 'Login': 'Register'}</h1>
          {error && <div className='w-fill max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error} </div>}
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid boarder while focus:border-cyan-300' />
          <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
            <h2 className='relative z-20'>
              SUBMIT
            </h2>
          </button>
          <h2 className='duration-300 hover:scale-110 cursor-pointer' onClick={() => setIsLoggingIn(!isLoggingIn)}>{!isLoggingIn ? 'Login' : 'Register'}</h2>
        </div>
        )

      }
    </>
  )
}