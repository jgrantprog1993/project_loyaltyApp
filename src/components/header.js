// @ts-nocheck
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Logout from '../pages/logout'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const Profile_Logout = [
	{ name: 'Profile', href: '/profile' }
]

const LoginRegis = [
	{ name: 'Sign-In', href: '/login' },
	{ name: 'Register', href: '/register' },
]

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
	console.log(' in Header')
	console.log(user)
	//console.log(user.business)

	return (
		<>
			
			<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
				<header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
					<div className='mx-auto flex h-20 items-center justify-between px-6'>
					
						<Link legacyBehavior href='/'>
							<a className='columns-2 gap-0'>
								<img src="../images/playstore.png" alt="" className="display: block rounded-full w-16 h-16 "/>
								<br/><h1 className='align-bottom inline-block font-medium'>Loyalty App</h1>
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
															: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-500'
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
								<Popover className="relative">
										<Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
										<span class="sr-only">Open user menu</span>
										<img class="w-8 h-8 mr-2 rounded-full" src="/images/placeholder.png" alt="user photo"/>
										<ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
										</Popover.Button>

										<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0 translate-y-1"
										enterTo="opacity-100 translate-y-0"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100 translate-y-0"
										leaveTo="opacity-0 translate-y-1"
										>
										<Popover.Panel className="absolute -left-36 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
											<p class="text-sm font-black text-gray-900 dark:text-white">User:</p> <p class="text-sm font-extralight text-gray-900 dark:text-white"> {user?.username}</p>
											{Profile_Logout.map((item) => (
											<Link legacyBehavior key={item.name} href={item.href}>
												<a
													className="block rounded-lg py-2 px-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
												>
													{item.name}
												</a>
											</Link>
											))}
											<button onClick={() => {
												console.log("LOGOUT") 
												logout()
												}}type="button" className="block rounded-lg py-2 px-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">Log-Out</button>
										</Popover.Panel>
										</Transition>
										
									</Popover>
									
								</> :
								<>
								 	<Popover className="relative">
										<Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
										<span class="sr-only">Open user menu</span>
										<img class="w-8 h-8 mr-2 rounded-full" src="/images/placeholder.png" alt="user photo"/>
											Sign-In / Register
										
										<ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
										</Popover.Button>

										<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0 translate-y-1"
										enterTo="opacity-100 translate-y-0"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100 translate-y-0"
										leaveTo="opacity-0 translate-y-1"
										>
										<Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
											{LoginRegis.map((item) => (
											<Link legacyBehavior key={item.name} href={item.href}>
												<a
													className="block rounded-lg py-2 px-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
												>
													{item.name}
												</a>
											</Link>
											))}
										</Popover.Panel>
										</Transition>
									</Popover>
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


