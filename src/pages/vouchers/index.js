// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import VoucherItem from "../../components/voucherItem"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

export default function Vouchers({userInfo,locations, vouchers}) {
	const {user} = useContext(AuthContext)
	const userInfoData = userInfo
	const locationsData = locations.data
	
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
								<>
									<VoucherItem voucher={voucher}/>
								</>	
								))
							}
						</>
					</div>
    </Layout>
  )
}

export async function getServerSideProps({req, res}) {
	const token = getCookie('token', { req, res})
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
		props: {userInfo:userInfo,locations:locations, vouchers:vouchers}
	}
}