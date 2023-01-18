import Navbar from './header'
import Footer from './bottom-nav'

export default function Layout({ children }:{children:any}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}