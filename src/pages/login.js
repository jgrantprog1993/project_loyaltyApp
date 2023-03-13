// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import AuthContext  from '../context/AuthContext'
import Layout from "../components/layout"
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImg from '../../public/images/pic5.jpg'

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
    <section class="flex flex-col md:flex-row h-screen items-center">

      <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="images/pic1.jpg" alt="" class="w-full h-full object-cover"/>
      </div>

      <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center">

      <div class="w-full h-100">
      <img src="images/playstore.png" alt="" className=" mx-auto w-1/2 h-1/2 "/>
        <h1 class="text-center text-xl font-bold">Loyalty App Login</h1>
        <h1 class="text-center text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

        <form class="mt-6" action="#" method="POST">
          <div>
            <label class="block text-gray-700">Email Address</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="" id="" placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required/>
          </div>
          <div class="mt-4">
            <label class="block text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required/>
          </div>
          <button onClick={handleSubmit} className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg  px-4 py-3 mt-6">
                    <h2 className='relative z-20'>SUBMIT</h2>
                  </button>
        </form>
        <hr class="my-6 border-gray-300 w-full"/>
              <p> Don't have an Account yet? <Link class="text-blue-500 hover:text-blue-700 font-semibold" href='/register'>Create an Account</Link></p>
          </div>

      </div>
  
  </section>
  </Layout>
  )
}
