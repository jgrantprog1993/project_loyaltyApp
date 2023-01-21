import Head from 'next/head'
import Header from './header'
import BottomNav from './bottom-nav'
// @ts-ignore
import { useAuth } from '../context/AuthContext'
// @ts-ignore
import Login from '../pages/login'

	
// @ts-ignore
const Page = (title, children ) => (
	<>
		{title ? (
			<Head>
				<title>Loyalty AppXYZ | {title}</title>
			</Head>
		) : null}

		<Header/>
		{/* {!currentUser && <Login />}
		{currentUser && <UserDashboard/>} */}
		<main className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'>
			<div className='p-6'>{children}</div>)
		</main>

		<BottomNav />
	</>
)

export default Page
