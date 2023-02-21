// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import VoucherItem from "../../components/voucherItem"

import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
//const {user} = useContext(AuthContext)

export default function Vouchers({vouchers,locations}) {
	const {user} = useContext(AuthContext)

//  console.log('user')
//  console.log(user)
//  console.log(user?.id)
//  console.log('locations')
//  console.log(locations)
	// const vouchersData0 = vouchers.vouchers[0]
	const vouchersData = vouchers.vouchers
	// console.log('vouchersData')
	// console.log(vouchersData)
	 const locationsData = locations.data
	//  console.log('locationsData')
	// console.log(locationsData)
	// console.log('locationsDataattributes.users_permissions_user.id')
	// console.log(locationsData[0].attributes.users_permissions_user.data.id)
	// //object = locationsData.findAll(obj => obj.id === vouchersData.id);
	const items = locationsData.filter(item => {
		return item?.attributes?.users_permissions_user?.data?.id === user?.id
	})
	// console.log('items')
 	// console.log(items)
	// const objects = []
	
	// for(var i=0; i<vouchersData.length; i++)
	// {
	// 	objects[i] = objects[i]
	// }
	// console.log('objects')
 	// console.log(objects)
  return (
	  <Layout title='Vouchers' keywords='{undefined}' description='{undefined}' >
					<div className='my-20 h-screen'>
						<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
							Vochers
						</h2>

						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{vouchersData.length===0 && <h3> No Vouchers to show </h3>}
						<>
						
						
						
							{items.map((item) => (
								<>
									<VoucherItem voucher={item} />
								</>	
								))
							}
										
						
						</>
						
						
					</div>
    </Layout>
  )
}

export async function getServerSideProps({req, res}) {
	const cookieToken = getCookie('token', { req, res})
	const response = await fetch(`${API_URL}/api/users/me?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const vouchers = await response.json()
	console.log(vouchers)
	const response2 = await fetch(`${API_URL}/api/locations?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const locations = await response2.json()
	
	return {
		props: {vouchers:vouchers,locations:locations}
	}
}