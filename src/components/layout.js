import Navbar from './header'
import Footer from './bottom-nav'
import BuisNavbar from './busin_header'
import BuisFooter from './busin_bottom_nav'
// @ts-ignore
import {currentUser} from '../context/AuthContext'
import Head from 'next/head'
import Meta from '../components/meta'


// @ts-ignore
export default function Layout({title, keywords, description, children}) {

  return (
    <>
    {(currentUser?.isABusiness || currentUser?.isABusiness === 'Business')? (
      <>
      <Head>
        <title> {title} : Buisness</title>
        <Meta></Meta>
      </Head>
        <div className='flex flex-col min-h-screen relative bg-black-300'>
          <BuisNavbar />
            <main className='flex-1'></main>
            {children}
          <BuisFooter/>
        </div>
      </>
      ) :
      (
        <>
        <Head>
          <title> {title} : User</title>
          <Meta></Meta>
        </Head>
        <div className='flex flex-col min-h-screen relative bg-slate-300'>
         <Navbar />
            <main className='flex-1'></main>
            {children}
         <Footer/>
        </div>
       </>
      )
    }
  </>
  )
}