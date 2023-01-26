// @ts-ignore
import { ThemeProvider } from 'next-themes'
// @ts-ignore
import Meta from '../components/meta'
//import '@/styles/globals.css'
// @ts-ignore
import { useRouter } from "next/router";
import '../styles/globals.css';
import { AuthProvider } from "../context/AuthContext";
// @ts-ignore
import ProtectedRoute from "../components/protectedRoute";
// @ts-ignore
import Header from '../components/header';
// @ts-ignore
import BottomNav from '../components/bottom-nav';

// const protectedRoutes = ["/"];

// export default function App({ Component, pageProps }:{Component:any,pageProps:any}) {
//   return (
//    <>
//     <Header />
//     <Component {...pageProps} />
//     <BottomNav />
//    </>

//   )
// }

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
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </AuthProvider>
    </>
  )
}

export default MyApp
