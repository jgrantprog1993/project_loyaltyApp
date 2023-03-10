// @ts-nocheck

import React, {useContext, useState, useEffect, useRef, createContext} from "react";
import {router, useRouter} from 'next/router'

import { API_URL, NEXT_URL } from "../utils/config";
import { toast } from "react-toastify";
//const auth = getAuth();

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(true)
 

  // useEffect(() => {checkUserLoggedIn()}, [])

  const register = async (username, fname,lname, business, email, password) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {username: username,
        fname:fname,
        lname:lname, 
        business:business,
        email: email, 
        password:password})
    })

      const data = await res.json()
    
    

      if (res.ok) {
        setUser(data.user)
        toast.success(`Welcome, ${data.user.fname} !`)
        router.push('/')
      } else {
        setError(data.message)
        setError(null)
      }
      // console.log("ERRORR!!!!")
      // setError(data.message)
      // setError(null)
    // } 
    
  }

  const login = async({email: identifier, password}) => {
    
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password})
    })

    const data = await res.json()
    
    console.log(data)
    
    if(res.ok){
     setUser(data.user)
     toast.success(`Welcome, ${data.user.fname} !`)
     router.push('/')
    } else {
      toast.error('Invalid Credentials')
      setError(data.message)
      setError(null)
    }   
    
  }

  const logout = async(user) => {
    
    console.log('logout')
    const res = await fetch(`${NEXT_URL}/api/logout`,
    {
      method: 'POST'
    })
    if(res.ok) {
      setUser(null)
      toast.success(`Successfully Logged Out!`)
      router.push('/login')
    }
    const data = await res.json()
  }

  // const checkUserLoggedIn = async () => {
  //   const res = await fetch(`${API_URL}/api/users/me`)
  //   const data = await res.json()

  //   console.log('res')
  //   console.log(res)
  //   console.log('data')
  //   console.log(data)

  //   if(res.ok){
  //     setUser(data.user)
  //   }else{
  //     setUser(null)
  //   }
  // }
  

    const value = {
      user,
      login,
      register,
      logout,
      error
    }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext