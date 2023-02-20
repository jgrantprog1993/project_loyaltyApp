// @ts-nocheck
import Link from "next/link"

export default function VoucherItem({voucher}) {
    const voucherPercntage = (voucher.voucherPoints / 10) * 100
    return(
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src="public/images/place-arch-coffee-exterior-2-768x1024.jpeg" alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Category</p>
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width: voucherPercntage+'%'}}></div>
                </div>
            
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{voucher.voucherPoints}/ 10</p>
            </div>
        </div>
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