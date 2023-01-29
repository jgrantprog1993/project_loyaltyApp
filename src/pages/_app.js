import Meta from '../components/meta'
import '../styles/globals.css';
import { AuthProvider } from "../context/AuthContext";
// @ts-ignore
import Layout from '../components/layout'
import Head from 'next/head';

// @ts-ignore
function MyApp( {Component, pageProps }) {
  return (
    <>
      <Head>
      <title>Loyalty App</title>
      </Head>
      <Meta/>
      <AuthProvider>
          <Component {...pageProps}/>
      </AuthProvider>
    </>
  )
}

export default MyApp
