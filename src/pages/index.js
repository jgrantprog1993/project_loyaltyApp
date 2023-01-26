import Page from '../components/page'
import Section from '../components/section'
import { useAuth } from '../context/AuthContext'
import Head from 'next/head'
import Meta from '../components/meta'
import Header from '../components/header'
import BottomNav from '../components/bottom-nav'
import Login from './login'

// export default function Home() {
// 	return (
// 		<>
// 				<Meta/>
// 				<Header/>
// 				<main
// 					/**
// 					 * Padding top = `appbar` height
// 					 * Padding bottom = `bottom-nav` height
// 					 */
// 					className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'
// 					></main>
// 				<p>Test</p>
// 				<BottomNav/>
// 		</>
// 	)
//   }


export default function Home(){
	
	return (
		<>
				<h2 className='text-xl inline-block align-text-top font-semibold text-zinc-800 dark:text-zinc-200'>
						Home
					</h2>

					<div className='mt-2'>
						<p className='text-zinc-600 dark:text-zinc-400'>
						</p>
					</div>
					
					
		</>
			)
	}




