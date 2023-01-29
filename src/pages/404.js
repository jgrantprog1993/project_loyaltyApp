import Link from "next/link"
import Layout from "../components/layout"
import {FaExclamationTriangle} from 'react-icons/fa'

export default function PageNotFound() {
  return (

        <Layout title='404' keywords='{undefined}' description='{undefined}'>
          <div className='my-20 h-screen'>
            <h1><FaExclamationTriangle/>404</h1>
            <h4> Sorry, there is nothing here</h4>
            <Link href="/"> Go Back Home</Link>
          </div>
        </Layout>
  )
}
