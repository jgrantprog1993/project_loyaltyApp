import Navbar from './header'
import Footer from './bottom-nav'
import BuisNavbar from './busin_header'
import BuisFooter from './busin_bottom_nav'
import {currentUser} from '../context/AuthContext'
/**
 * @param {{ children: any; }} props
 */


// @ts-ignore
console.log('currentUser')
console.log(currentUser)
console.log('currentUser.isaB')
console.log(currentUser?.isABusiness)
export default function Layout(props) {
  const { children } = props
  return (
    <>
    {(currentUser?.isABusiness || currentUser?.isABusiness === 'Business')? (
      <>
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