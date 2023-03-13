// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import  AuthContext  from '../context/AuthContext'
import Layout from "../components/layout"
import Link from 'next/link';
import { toast } from 'react-toastify';
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
  

  const submitHandler =(e) => {
  if(password != confirmPassword)
  {
      toast.error('Passwords not Matching')
      return
  }
  e.preventDefault()
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
       <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img src="images/pic4.jpg" alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center">

        <div className="w-full h-100">
          <h1 className="text-center text-xl font-bold">Loyalty App Registration</h1>
            <h1 className="text-center text-xl md:text-2xl font-bold leading-tight mt-4">Register an account</h1>
              <form className="mt-6" action="#" method="POST"> 
                  <input id="bordered-radio-1" type="radio" value="True" checked={business === "True"} onChange={onOptionChange}  name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="bordered-radio-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Set User as a Business</label>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700">First Name</label>
                    <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder='Jane' className='"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block text-gray-700">Last Name</label>
                      <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder='Doe' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                    </div>
                  </div>
                  <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input type="text" value={email} onChange={(e) => handleChange(e)} placeholder='Email Address' className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Password
                  </label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Confirm Password
                  </label>
                  <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
                </div>
              
              
              <button onClick={submitHandler} className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg  px-4 py-3 mt-6">
                <h2 className='relative z-20'>SUBMIT</h2>
              </button>
          
        
          </form>
              <hr className="my-6 border-gray-300 w-full"/>
              <p> Already Have an Account?  <Link className="text-blue-500 hover:text-blue-700 font-semibold" href='/login'> Login</Link>
              </p>
          </div>
          </div>
      </section>
    </Layout>
  )
}
