// @ts-nocheck

import React, {useContext, useState, useEffect, useRef, createContext} from "react";
import {auth, db} from '../utils/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut } from "@firebase/auth";
import {doc, getDoc} from 'firebase/firestore'

//const auth = getAuth();

const AuthContext = React.createContext()


// const AuthContext = createContext<{
//   currentUser: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<UserCredential>;
//   logout: () => Promise<void>;
//   register: (email: string, password: string) => Promise<UserCredential>;
// }>({
//   currentUser: null,
//   loading: true,
//   login: (email: string, password: string) =>
//     signInWithEmailAndPassword(auth, email, password),
//   logout: () => Promise.resolve(),
//   register: (email: string, password: string) =>
//     createUserWithEmailAndPassword(auth, email, password),
// });

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider ({children}){
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const userInfo = useRef()

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    return await signOut(auth)
  }
  
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async user => {
          setCurrentUser(user)
          setLoading(false)
      })
      return unsubscribe()
    }, [])

    const value = {
      currentUser,
      login,
      register,
      logout,
      userInfo
    }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}