// @ts-nocheck

import React, {useContext, useState, useEffect, useRef, createContext} from "react";
import {router, useRouter} from 'next/router'

import { NEXT_URL } from "../utils/config";
//const auth = getAuth();

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => checkUserLoggedIn(), [])

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
    
    console.log(data)
    if(res.ok){
     setUser(data.user)
     router.push('/vouchers')
    } else {
      console.log("ERRORR!!!!")
      setError(data.message)
      setError(null)
    }   
    
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
     router.push('/vouchers')
    } else {
      console.log("ERRORR!!!!")
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
      router.push('/')
    }
    const data = await res.json()
  }

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if(res.ok){
      setUser(data.user)
    }else{
      setUser(null)
    }
  }
  
  useEffect(() => {
   
    }, [])

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