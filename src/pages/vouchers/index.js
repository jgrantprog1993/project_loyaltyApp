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
	console.log('vouchers')
	console.log(vouchers)
	console.log('userInfoData')
	console.log(userInfoData.vouchers)
	let vouchersData = []
	
	if(vouchers != null)
	{
		vouchersData = vouchers.data
		console.log('vouchersData')
		console.log(vouchersData)
	} else{
		vouchersData = []
	}

  return (
	  <Layout title='Vouchers' keywords='{undefined}' description='{undefined}' >
					<div className='my-20 h-screen'>
						
						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{vouchersData.length===0 && <><p className="text-center text-4xl font-black text-gray-900 dark:text-white"> No Vouchers to show </p><br />
						<h2 className="text-center text-4xl font-normal text-gray-900 dark:text-white">Collect tokens at one of the locations listed <Link href={`${NEXT_URL}/discover`} className="font-semibold text-purple-400 underline dark:text-white decoration-indigo-300"> HERE</Link></h2></> }
						<>
							{vouchersData.map((voucher) => (
								// <div className='grid place-items-center'>
									<div className='flex grid justify-center p-4 flex-col text-zinc-600 dark:text-zinc-400'>

										<VoucherItem voucher={voucher}/>
									</div>	
								// </div>
								))
							}
							{ (page == 1 && page == lastPage && vouchersData.length!=0)&& (
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

	var vouchers = []
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
	
	const query = string.substring(1);
	console.log('string');
	console.log(string);
	console.log('query');
	console.log(query);
	const response2 = await fetch(`${API_URL}/api/locations?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${token}`
			}
	})
	const locations = await response2.json()
	
	if(query != '')
	{	
		const response3 = await fetch(`${API_URL}/api/vouchers?${query}&populate=*`,
		{
			method: 'GET',
				headers: {
					Authorization:`Bearer ${token}`
				}
		})
		vouchers = await response3.json()
	} else{
		vouchers = null
	}
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