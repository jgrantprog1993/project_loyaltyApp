// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import VoucherItem from "../../components/voucherItem"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

export default function Vouchers({vouchers,locations, token}) {
	const {user} = useContext(AuthContext)
	const vouchersData = vouchers.vouchers
	const locationsData = locations.data

	const items = locationsData.filter(item => {
		return item?.attributes?.users_permissions_user?.data?.id === user?.id
	})

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
									<VoucherItem voucher={item} token={token}/>
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
	const vouchers = await response.json()
	console.log(vouchers)
	const response2 = await fetch(`${API_URL}/api/locations?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${token}`
			}
	})
	const locations = await response2.json()
	
	return {
		props: {vouchers:vouchers,locations:locations, token:token}
	}
}