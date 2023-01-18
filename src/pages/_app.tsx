import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '../components/meta'
//import '@/styles/globals.css'
import { useRouter } from "next/router";
import '../styles/globals.css';
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/protectedRoute";
import Header from '../components/header';
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

export default function MyApp({ Component, pageProps }:{Component:any,pageProps:any}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
