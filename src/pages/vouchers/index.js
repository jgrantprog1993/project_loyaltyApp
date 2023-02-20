// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import VoucherItem from "../../components/voucherItem"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

export default function Vouchers({vouchers}) {
	console.log(vouchers)
	const vouchersData = vouchers.vouchers
	console.log(vouchersData)
  return (
	  <Layout title='Vouchers' keywords='{undefined}' description='{undefined}' >
					<div className='my-20 h-screen'>
						<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
							Vouchers
						</h2>

						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{vouchersData.length===0 && <h3> No Vouchers to show </h3>}
						
						{vouchersData.map((voucher) => (
							<VoucherItem key={vouchersData.id} voucher={voucher}/>
						))}
					</div>
    </Layout>
  )
}

export async function getServerSideProps({req, res})  {
	const cookieToken = getCookie('token', { req, res})
	console.log(cookieToken)
	const response = await fetch(`${API_URL}/api/users/me?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const vouchers = await response.json()
   
   
	return {
		props: {vouchers}
	}
}