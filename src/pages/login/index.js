import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
import error from 'next/error'
import { getDatabase, ref, set } from "firebase/database";
import {auth, app, db, dbFs, doc, setDoc, onAuthStateChanged} from "../../utils/firebase"
//import { setDoc } from 'firebase/firestore'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isABusiness, setIsABusiness] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [LoggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const {login, register, currentUser, setCurrentUser, logout} = useAuth()
  //console.log(currentUser)
  //const router = useRouter();
  
  // useEffect(() => {
  //  console.log('use effect ran')
  //  if(LoggedIn){
  //   router.push('/')
  //  }
  //  else{
  //   router.push('/login')logged in
  //  }
   
  // }, [LoggedIn])


  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser)
    console.log(isLoggingIn)
    console.log(LoggedIn)
    if (currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = currentUser.uid;
      console.log(uid)
     
    } else {
      //setIsLoggingIn(true)
      console.log('do nothing')
      
    }
  });

  async function submitHandler() {
    if (!email || !password){
      setError("Please enter Email and Password")
      return
    }
    if (isLoggingIn){
      try {
        const user = login(email, password)
        console.log('logged in')
        console.log(user)
        // setLoggedIn(true)
        // setIsLoggingIn(false)
      } catch (err){
        setError("Incorrect Email and Password")
      }
      return 
    }
    else
    {
      try {
        const regUSer = await register(email, password)
        console.log("currentUser")
        console.log(regUSer)
        console.log("currentUser.uid")
        console.log('Test')
        console.log(regUSer.user.uid)
        writeDatatoFSUsers(regUSer.user.uid, firstName, lastName, email, password, dbFs)
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // }catch (err){
      //   setError("Unable to Register")
      // }
    }
  }


  async function submitHandlerLogout() {
    console.log('logged Out Attempt')
    try {
      logout()
      console.log('logged Out')
      setLoggedIn(false)
    }catch (err){
      setError("Unable Logout")
    }
    console.log('logged Out Func Complete')
  }

  // function writeUserData(userId, firstName, lastName, email, password) {
  //   const db = getDatabase();
  //   set(ref(db, '/users/' + userId), {
  //     firstName: firstName,
  //     lastNAme: lastName,
  //     email: email,
  //     password: password
  
  //   });
  // }
 

  function writeDatatoFSUsers(userId, firstName, lastName, email, password, dbFs){
    console.log('isABusiness')
    console.log(isABusiness)
    const users = doc(dbFs, `users/${userId}`)
    const docData = {
      uid: userId,
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
      isABusiness: isABusiness,
    }
    setDoc(users, docData, {merge: true})
  }


  return (
    <>
        {currentUser ? (
            <div className='flex-1 text-xs sm:text-sm flex flex-col justify-cener items-center gap-2 sm:gap-4'>
                  <button onClick={submitHandlerLogout} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                  <h2 className='relative z-20'>
                    Log Out
                  </h2>
                </button>
            </div>
        )
        
         :
        (
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-cener items-center gap-2 sm:gap-4'>
          {isLoggingIn ? (
          <>
            <div>
              <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>Login</h1>
              <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
              
              </div>
              {error && <div className='w-fill max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error} </div>}
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid boarder while focus:border-cyan-300' />
              <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>
                  SUBMIT
                </h2>
              </button>
            </div>
          </>
          ):(
          <>
            <div>
              <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input id="horizontal-list-radio-license" 
                            type="radio" 
                            value="User"
                            onChange={e=>setIsABusiness(e.target.value)}
                            name="list-radio" 
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">User </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div class="flex items-center pl-3">
                    <input id="horizontal-list-radio-id" 
                            type="radio" 
                            value="Business"
                            onChange={e=>setIsABusiness(e.target.value)}
                            name="list-radio" 
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                    <label for="horizontal-list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Buisness</label>
                  </div>
                </li>
              </ul>
            </div>
            {error && <div className='w-fill max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error} </div>}
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Second Name' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid boarder while focus:border-cyan-300' />
            <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
              <h2 className='relative z-20'>
                SUBMIT
              </h2>
            </button>
          </>
          )
          }
          <h2 className='duration-300 hover:scale-110 cursor-pointer' onClick={() => setIsLoggingIn(!isLoggingIn)}>{!isLoggingIn ? 'Login' : 'Register'}</h2>
        </div>
        )

       } 
    </>
  )
}
