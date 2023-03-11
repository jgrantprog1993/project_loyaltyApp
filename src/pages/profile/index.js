// @ts-nocheck
import { API_URL } from "@/src/utils/config";
import { getCookie } from "cookies-next";
import Layout from "../../components/layout"
import Modal from 'react-modal'
import React, { useState } from 'react'

export default function Account({userData}) {

	const [isOpen, setIsOpen] = useState(false)

  return (
	  <Layout title='Account' keywords='{undefined}' description='{undefined}' >
		<div className='h-screen flex flex-col justify-center items-center  sm:gap-4'>
		<div class=" bg-white w-3/4 items-center shadow sm:rounded-lg">
			<div class="grid grid-cols-2 gap-2 px-4 py-5 sm:px-6 ">
				<h3 class="text-base font-semibold leading-6 text-gray-900">Applicant Information</h3>
					<button onClick={() => setIsOpen(true)} type="button" class=" text-white w-24 inline-flex items-center bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
						<svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
						Edit 
					</button>  
					<Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className='my-64 h-screen grid justify-items-center'>
					<div class=" relative w-full h-full max-w-md md:h-auto">
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
							<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
							<span class="sr-only">Close modal</span>
						</button>
						<div class="p-6 text-center">
							<svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
							<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Like many things, this Feature Is not available in Strapi V4 yet... Annoying I know!</h3>
							<button onClick={() => setIsOpen(false)} data-modal-hide="popup-modal" type="button" class="text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
								Wow, Very Annoying
							</button>
							
							</div>
						</div>
					</div>
        			</Modal>
				<p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
 			</div>
			<div class="border-t border-gray-200 px-4 py-5 sm:px-6">
				<dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">First name</dt>
					<dd class="mt-1 text-sm text-gray-900">{userData.fname}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Last Name</dt>
					<dd class="mt-1 text-sm text-gray-900">{userData.lname}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Email address</dt>
					<dd class="mt-1 text-sm text-gray-900">{userData.username}</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm font-medium text-gray-500">Account Type</dt>
					<dd class="mt-1 text-sm text-gray-900">{userData.business=='True' ? "Business" : "User"}</dd>
				</div>
				<div class="sm:col-span-2">
					<dt class="text-sm font-medium text-gray-500">Profile Picture</dt>
					<dd class="mt-1 text-sm text-gray-900">{userData.profilePic}</dd>
				</div>
				</dl>
			</div>
		</div>
		</div>
    </Layout>
  )
}

export async function getServerSideProps ({ req, res})  {
	
	const cookieToken = getCookie('token', { req, res});
	console.log(cookieToken)
	const response = await fetch(`${API_URL}/api/users/me?`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const userData= await response.json()
	console.log(userData)

	return {
		props: {userData}
	}
}