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
        <div className='flex flex-col h-screen relative bg-black-300'>
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
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.1/dist/flowbite.min.css" />
          <title>{title}</title>
          <Meta></Meta>
        </Head>
        <div className='flex-col justify-center '>
         <Navbar />
            <main>
              {children}
            </main>
            
         <Footer/>
         
        </div>
        <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
       </>
      )
    }
  </>
  )
}