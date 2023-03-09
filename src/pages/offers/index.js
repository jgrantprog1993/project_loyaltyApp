// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL, NEXT_URL } from "../../utils/config"
import OfferItem from "../../components/OfferItem"
const PER_PAGE = 4
import Link from "next/link";
// @ts-ignore
export default function Offers({offers, page, total}) {

	console.log(offers)
	const offersData = offers.data
	console.log(offersData)
	const lastPage = Math.ceil(total / PER_PAGE)

	console.log('page && Total')
	console.log(page)
	console.log(total)
	return (
	<Layout title='Discover' keywords='' description=''>

					<div className='my-20 h-screen'>
						<p className='text-zinc-600 dark:text-zinc-400'>
						{offersData.length===0 && <h3> No Offers to show </h3>}
						</p>
						{offersData.map((offer) => (
							<div className='my-2 flex justify-center items-center flex-col text-zinc-600 dark:text-zinc-400 '>
								<OfferItem key={offersData.id} offer={offer}/>
							</div>
						))}
						{page == 1 && (
							<div class="flex flex-col items-center">
							
								<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 4)-3} - {(page * 4)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
								</span>
								<div class="inline-flex mt-2 xs:mt-0">
							  
									<Link href={`${NEXT_URL}/offers?page=${page+1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
								</div>
						  	</div>
						)}
						{(page> 1 && page < lastPage)  && (
							<div class="flex flex-col items-center">
							
							<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 4)-3} - {(page * 4)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">
							
								<Link href={`${NEXT_URL}/offers?page=${page-1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> Prev</Link>
								<Link href={`${NEXT_URL}/offers?page=${page+1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
							 
							</div>
						  </div>
						)}
						{(page == lastPage)  && (
							<div class="flex flex-col items-center">
							
							<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 4)-3} - {(page * 4)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">
							
								<Link href={`${NEXT_URL}/offers?page=${page-1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> Prev</Link>
							
							 
							</div>
						  </div>
						)}
					</div>
				
	</Layout>
  )
}


export async function getServerSideProps({query: {page = 1}}) {
	const start = +page === 1 ? 0 : (+page) * PER_PAGE

	// Fetch total 
	const totalRes = await fetch(`${API_URL}/api/offers/count`)
	const total= await totalRes.json()
	
	const res = await fetch(`${API_URL}/api/offers?pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`)
	const offers = await res.json()
   
   
	return {
		props: {offers, page: +page, total}
	}
}