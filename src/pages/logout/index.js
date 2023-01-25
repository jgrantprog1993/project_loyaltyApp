import React, { useState, useEffect } from 'react'
import {auth, app, db, dbFs, doc, setDoc, onAuthStateChanged} from "../../utils/firebase"
import { useAuth } from '../../context/AuthContext'


export default function Logout(){
    const {login, register, currentUser, setCurrentUser, logout} = useAuth()
    const [LoggedIn, setLoggedIn] = useState(false)
   

    onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser)

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
        console.log('logged Out Attempt')
    
            logout()
            console.log('logged Out')
            setLoggedIn(false)

           
      
        console.log('logged Out Func Complete')
    }

    return (
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-cener items-center gap-2 sm:gap-4'>
            <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>
                    Log Out
                </h2>
            </button>
        </div>
    )
}