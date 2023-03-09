// @ts-nocheck
import Meta from '../components/meta'
import '../styles/globals.css';
import { AuthProvider } from "../context/AuthContext";
// @ts-ignore
import Layout from '../components/layout'
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from "react-cookie"
// @ts-ignore
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const handleStart = (url) => (url !== router.asPath) && setLoading(true);
      const handleComplete = (url) => (url === router.asPath) && setTimeout(() =>{setLoading(false)},1000);

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError',  handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })
  return loading && (<div className='spinner-wrapper'>
  <div className="spinner"></div></div>)
}

function MyApp( {Component, pageProps }) {
  return (
    <>
      <Head>
      <title>Loyalty App</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
			integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
			crossorigin=""/>
		<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
			integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
			crossorigin=""></script>
      </Head>
      <Meta/>
     
      <AuthProvider>
      <ToastContainer />
      <Loading/>
          <Component {...pageProps}/>
      </AuthProvider>
    
    </>
  )
}

export default MyApp
