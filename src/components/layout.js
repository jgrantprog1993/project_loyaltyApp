import Navbar from './header'
import Footer from './bottom-nav'

/**
 * @param {{ children: any; }} props
 */
export default function Layout(props) {
  const { children } = props
  return (
      <div className='flex flex-col min-h-screen relative bg-slate-300'>
      <Navbar />
      <main className='flex-1'></main>
        {children}
      <Footer />
      </div>
  
  )
}