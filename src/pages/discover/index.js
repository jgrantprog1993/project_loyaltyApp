// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL, NEXT_URL } from "../../utils/config"
import DiscoverItem from "../../components/DiscoverItem"
//import AuthContext from "../../context/AuthContext"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import {useState} from 'react'
import Link from "next/link";
//import { cookies } from 'next/headers'; // Import cookies
import Map from '../../components/Map'
const DEFAULT_CENTER = [52.5, -7.36546]
const PER_PAGE = 3


export default function Discover({userData, locationsAll, page, total}) {
	const [toggleViewMode, setToggleViewMode] = useState(false);
  	const locationsData = userData
	const locationsAllData = locationsAll
	const lastPage = Math.ceil(total / PER_PAGE)

	return (
	<Layout title='Discover' keywords='' description=''>

		<div className='my-20 h-screen'>
		
				<div className="flex justify-right p-5">
					
					<button
						className="px-4 py-2 font-bold text-white bg-blue-400 rounded-full hover:bg-blue-700"
						onClick={() => setToggleViewMode(!toggleViewMode)}
					>
						{toggleViewMode ? 'Switch to Map' : 'Switch to List'}
					</button>
				</div>
				
				{locationsData.data.length===0 && <h3> No Locations to show </h3>}
				{toggleViewMode ? <>
					{locationsData.data.map((location) => (
						<div className='flex justify-center items-center flex-col text-zinc-600 dark:text-zinc-400'>
							<DiscoverItem key={locationsData.data.id} location={location}/>
						</div>
						))}
						{(page == 1 && page != lastPage) && (
							<div class="flex flex-col items-center">
							<span class="text-sm text-gray-700 dark:text-gray-400">
							Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 3)-2} - {(page * 3)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">
							
								  <Link href={`${NEXT_URL}/discover?page=${page+1}`} class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
								  <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
								  </Link>
								  
							  
							</div>
						  </div>
						)}
						{(page> 1 && page < lastPage)  && (
							<div class="flex flex-col items-center">
							
							<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 3)-2} - {(page * 3)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">

								<Link href={`${NEXT_URL}/discover?page=${page-1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> Prev</Link>
								<Link href={`${NEXT_URL}/discover?page=${page+1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>

							</div>
						  </div>
						)}
						{(page != 1 && page == lastPage)  && (
							<div class="flex flex-col items-center">
							
							<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 3)-2} - {(page * 3)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">

								<Link href={`${NEXT_URL}/discover?page=${page-1}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> Prev</Link>

							</div>
						  </div>
						)}
						{(page== 1 && page == lastPage)  && (
							<div class="flex flex-col items-center">
							
							<span class="text-sm text-gray-700 dark:text-gray-400">
								Showing <span class="font-semibold text-gray-900 dark:text-white"> {(page * 3)-2} - {(page * 3)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">

						

							</div>
						  </div>
						)}
					</>
				:
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
					<div class="mx-auto  max-w-4xl">
						<Map center={DEFAULT_CENTER} zoom={8}>
							{({ TileLayer, Marker, Popup }) => (
							<>
								<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
								/>
								{locationsAllData.data.map((location) => (
									
									<Marker position={[location.attributes.lat, location.attributes.lon]}>
										<Popup>
											<b>Name:</b> <Link href={`${NEXT_URL}/locations/${location.attributes.slug}`}> {location.attributes.name}</Link><br/>
											<b>Category:</b> {location.attributes.category}
										</Popup>
									</Marker>
								))}
									
								</>
							)}
						</Map>
					</div>
			</div>
			
				
					
				
				}
				
			
		</div>
	
	 </Layout>
  )
}


export async function getServerSideProps ({query: {page = 1}})  {
	
	//calc stat page
	const start = +page === 1 ? 0 : (((+page) * PER_PAGE) - PER_PAGE)

	// Fetch total 
	const totalRes = await fetch(`${API_URL}/api/locations/count`)
	const total= await totalRes.json()

	const response = await fetch(`${API_URL}/api/locations?pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`)
	const userData= await response.json()
	

	const responseAll = await fetch(`${API_URL}/api/locations`)
	const locationsAll= await responseAll.json()
	

	return {
		props: {userData, locationsAll, page: +page, total}
	}
}

