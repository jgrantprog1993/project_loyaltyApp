import Meta from '../components/meta'
import '../styles/globals.css';
import { AuthProvider } from "../context/AuthContext";
// @ts-ignore
import Layout from '../components/layout'
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from "react-cookie"
// @ts-ignore
function MyApp( {Component, pageProps }) {
  return (
    <>
      <Head>
      <title>Loyalty App</title>
      </Head>
      <Meta/>
     
      <AuthProvider>
      <ToastContainer />
          <Component {...pageProps}/>
      </AuthProvider>
    
    </>
  )
}

export default MyApp
