// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import AuthContext  from '../context/AuthContext'
import Layout from "../components/layout"
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [error, setError] = useState('')
  const {login, error} = useContext(AuthContext)
  // @ts-ignore
  const router = useRouter();
  
  useEffect(() => {
  error && toast.error(error)
  }, [])

 const handleSubmit = (e) => {
  e.preventDefault()
  login({email,password})
 }


  return (
    <Layout title='Login' keywords='{undefined}' description='{undefined}' >
       <div className='my-20 h-screen'>
       
      
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-cener items-center gap-2 sm:gap-4'>
       
            
              <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>Login</h1>
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"></div>
             
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid boarder while focus:border-cyan-300' />
              <button onClick={handleSubmit} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>SUBMIT</h2>
              </button>
          <p> Don't have an Account yet? <Link href='/register'>Register</Link></p>
        </div>
      </div>
    </Layout>
  )
}
