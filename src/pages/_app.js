import Meta from '../components/meta'
import '../styles/globals.css';
import { AuthProvider } from "../context/AuthContext";
import Layout from '../components/layout'
import Head from 'next/head';

function MyApp( {Component, pageProps }) {
  return (
    <>
      <Head>
      <title>Loyalty App</title>
      </Head>
      <Meta/>
      <AuthProvider>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </AuthProvider>
    </>
  )
}

export default MyApp
