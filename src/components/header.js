// @ts-nocheck
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Logout from '../pages/logout'

const noUserLinks = [
	{ label: 'Offers', href: '/offers' },
	{ label: 'Discover', href: '/discover' },
]

const userLinks = [
	{ label: 'Offers', href: '/offers' },
	{ label: 'Discover', href: '/discover' },
	{ label: 'Scan', href: '/scan' },

	{ label: 'Vouchers', href: '/vouchers' }
]
const busiLinks = [
	{ label: 'Add Location', href: '/ourlocations/add' },
	{ label: 'Our Locations', href: '/ourlocations' },
	{ label: 'Add Offer', href: '/ouroffers/add' },
	{ label: 'Our Offers', href: '/ouroffers' },
	{ label: 'Dashboard', href: '/dashboard' },
	
]
function Header() {
	
	const router = useRouter()
	const {user, logout} = useContext(AuthContext)
	//console.log(user)
	//console.log(user.business)

	return (
		<>
			
			<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
				<header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
					<div className='mx-auto flex h-20 items-center justify-between px-6'>
						<Link legacyBehavior href='/'>
							<a>
								<h1 className='font-medium'>Loyalty App</h1>
							</a>
						</Link>
						
						<nav className='flex items-center space-x-6'>
						{user ? <>
							
							{user.business === 'False' ? 
								<div className='hidden sm:block'>
									<div className='flex items-center space-x-6'>
										{userLinks.map(({ label, href }) => (
											<Link legacyBehavior key={label} href={href}>
												<a
													className={`text-sm ${
														// @ts-ignore
														router.pathname === href
															? 'text-indigo-500 dark:text-indigo-400'
															: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
													}`}
												>
													{label}
												</a>
											</Link>
										))}
										
									</div>
								</div>
							
							: 
							
								<div className='hidden sm:block'>
									<div className='flex items-center space-x-6'>
										{busiLinks.map(({ label, href }) => (
											<Link legacyBehavior key={label} href={href}>
												<a
													className={`text-sm ${
														// @ts-ignore
														router.pathname === href
															? 'text-indigo-500 dark:text-indigo-400'
															: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
													}`}
												>
													{label}
												</a>
											</Link>
										))}
										
									</div>
								</div>
							}
							</> : <>
							<div className='hidden sm:block'>
									<div className='flex items-center space-x-6'>
										{noUserLinks.map(({ label, href }) => (
											<Link legacyBehavior key={label} href={href}>
												<a
													className={`text-sm ${
														// @ts-ignore
														router.pathname === href
															? 'text-indigo-500 dark:text-indigo-400'
															: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
													}`}
												>
													{label}
												</a>
											</Link>
										))}
										
									</div>
								</div>
							</>} 
							{user ? <>
								 <Link href='/account'>
									<div
										
										title='userIcon'
										className='h-10 w-10 rounded-full bg-zinc-200 bg-cover bg-center shadow-inner dark:bg-zinc-800'
										style={{
											backgroundImage:
												'url(https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png)',
										}}
									/>
									</Link>
									<button onClick={() => logout()}type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log-Out</button>
									
								</> :
								<>
								<Link href='/login'>
								<div
									
									title='userIcon'
									className='h-10 w-10 rounded-full bg-zinc-200 bg-cover bg-center shadow-inner dark:bg-zinc-800'
									style={{
										backgroundImage:
											'url(https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png)',
									}}
								/>
								</Link>
							</> 
							}
						</nav>
					</div>
				</header>
			</div>
		</>
	)
}

export default Header


