// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import  AuthContext  from '../context/AuthContext'
import Layout from "../components/layout"
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(){
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username,setUsername] = useState('')
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [business,setAsABusiness] = useState('False')

  const {register, error} = useContext(AuthContext)
 
  useEffect(() => {
    error && toast.error(error)
    }, [])

  async function submitHandler() {
    if(password != confirmPassword)
    {
        toast.error('Passwords not Matching')
        return
    }
    console.log(business)
    register(username, fname,lname, business, email, password)
  }

  const handleChange = (event) => {
    setUsername(event.target.value)
    setEmail(event.target.value)
  }

  const onOptionChange = e => {
    setAsABusiness(e.target.value)
  }

  return (
    <Layout title='Register User' keywords='{undefined}' description='{undefined}' >
       <div className='my-20 h-screen'>
        
        
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-cener items-center gap-2 sm:gap-4'>
         
            
              <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>Register</h1>
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"></div>
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                  <input id="bordered-radio-1" type="radio" value="True" checked={business === "True"} onChange={onOptionChange}  name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="bordered-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Set User as a Business</label>
              </div>
              <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder='First Name' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
              <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder='Last Name' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
              <input type="text" value={email} onChange={(e) => handleChange(e)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid boarder while focus:border-cyan-300' />
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid boarder while focus:border-cyan-300' />
              <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>SUBMIT</h2>
              </button>
          <p> Already Registered?<Link href='/login'>Login</Link></p>
        </div>
        
      </div>
    </Layout>
  )
}
