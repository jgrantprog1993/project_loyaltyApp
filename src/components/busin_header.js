import Link from 'next/link'
import { useRouter } from 'next/router'
// @ts-ignore
import { Label, Nav } from 'reactstrap'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'



const links = [
	{ label: 'Locations', href: '/aBusin/locations' },
	{ label: 'Profile', href: '/aBusin/profile' },
	//{ label: 'Notifications', href: '/aBusin/notifications' },
	{ label: 'Setup Tag', href: '/aBusin/tagsetup'},
	//{ label: 'Billing', href: '/aBusin/billing' },

]

function Header() {
	
	// @ts-ignore
	const router = useRouter()
	// @ts-ignore
	// @ts-ignore
	return (
		<>
			
			<div className='fixed top-0 left-0 z-20 w-full bg-black-900 pt-safe'>
				<header className='border-b bg-zinc-100 px-safe dark:border-black-800 dark:bg-black-900'>
					<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
						<Link legacyBehavior href='/'>
							<a>
								<h1 className='font-medium'>Loyalty App - Buisn</h1>
								
							</a>
						</Link>

						<nav className='flex items-center space-x-6'>
							<div className='hidden sm:block'>
								<div className='flex items-center space-x-6'>
									{links.map(({ label, href }) => (
										<Link legacyBehavior key={label} href={href}>
											<a
												className={`text-sm ${
													// @ts-ignore
													router.pathname === href
														? 'text-indigo-500 dark:text-indigo-400'
														: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-black-50'
												}`}
											>
												{label}
											</a>
										</Link>
									))}
									
								</div>
							</div>

								<a href='/login'>
								<div
									
									title='userIcon'
									className='h-10 w-10 rounded-full bg-zinc-200 bg-cover bg-center shadow-inner dark:bg-black-800'
									style={{
										backgroundImage:
											'url(https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png)',
									}}
								/>
								</a>
							
						</nav>
					</div>
				</header>
			</div>
		</>
	// @ts-ignore
	)
// @ts-ignore
}

export default Header


