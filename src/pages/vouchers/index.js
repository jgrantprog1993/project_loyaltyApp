// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL , NEXT_URL} from "../../utils/config"
import VoucherItem from "../../components/voucherItem"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
const PER_PAGE = 3
import Link from "next/link";

export default function Vouchers({userInfo,locations, vouchers, page, total}) {
	const {user} = useContext(AuthContext)
	const userInfoData = userInfo
	const locationsData = locations.data
	const lastPage = Math.ceil(total / PER_PAGE)
	console.log('userInfoData')
	console.log(userInfoData.vouchers)
	// console.log('locationsData')
	
	// console.log(locationsData)
	// console.log('vouchers')
	// console.log(vouchers)
	let vouchersData = vouchers.data
	console.log('vouchersData')
	console.log(vouchersData)

  return (
	  <Layout title='Vouchers' keywords='{undefined}' description='{undefined}' >
					<div className='my-20 h-screen'>
						<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
							Vochers
						</h2>
						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{vouchersData.length===0 && <h3> No Vouchers to show </h3>}
						<>
							{vouchersData.map((voucher) => (
								<div className='flex justify-center items-center flex-col text-zinc-600 dark:text-zinc-400'>

									<VoucherItem voucher={voucher}/>
								</div>	
								))
							}
							{ (page == 1 && page == lastPage)&& (
							<div class="flex flex-col items-center">
								<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 3)-2} - {(page * 3)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							</div>
						)}
						{(page> 1 && page < lastPage)  && (
							<div class="flex flex-col items-center">
							
							<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 3)-2} - {(page * 3)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">
							
								<Link href={`${NEXT_URL}/vouchers?page=${page-1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> Prev</Link>
								<Link href={`${NEXT_URL}/vouchers?page=${page+1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
							 
							</div>
						  </div>
						)}
						{(page>1 && page == lastPage)  && (
							<div class="flex flex-col items-center">
							
							<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 4)-3} - {(page * 4)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">
							
								<Link href={`${NEXT_URL}/vouchers?page=${page-1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> Prev</Link>
							
							 
							</div>
						  </div>
						)}
						
						</>
					</div>
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}, req, res}) {
	const token = getCookie('token', { req, res})
	
	//calc stat page
	const start = +page === 1 ? 0 : (+page) * PER_PAGE

	// Fetch total 
	const totalRes = await fetch(`${API_URL}/api/vouchers/count`)
	const total = await totalRes.json()

	const response = await fetch(`${API_URL}/api/users/me?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${token}`
			}
	})
	const userInfo = await response.json()
	//// Make the string for query
	const userInfoVouchers = userInfo.vouchers
	var string = ''
	for(let i =0; i<=userInfoVouchers.length-1; i++){
			string +='&filters[id]='+userInfoVouchers[i].id
	}
	console.log('SADFGHJMK<JHGFDSAFGHJKLJHGFDS')
	console.log(string)
	const query = string.substring(1);
	console.log(query);
	const response2 = await fetch(`${API_URL}/api/locations?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${token}`
			}
	})
	const locations = await response2.json()
	
	const response3 = await fetch(`${API_URL}/api/vouchers?${query}&populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${token}`
			}
	})
	const vouchers = await response3.json()
	
	return {
		props: {
			userInfo:userInfo,
			locations:locations, 
			vouchers:vouchers, 
			page: +page, 
			total
		}
	}
}