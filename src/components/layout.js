import Navbar from './header'

import Footer from './bottom-nav'
import BuisNavbar from './busin_header'
import BuisFooter from './busin_bottom_nav'
// @ts-ignore
// import {currentUser} from '../context/AuthContext'
import Head from 'next/head'
import Meta from '../components/meta'


// @ts-ignore
export default function Layout({title, keywords, description, children}) {

  return (
    <>
   
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
           <br/> <br/>
         <Footer/>
        
        </div>
        <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
       </>
      )
    
  </>
  )
}