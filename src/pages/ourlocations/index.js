// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL, NEXT_URL } from "../../utils/config"
import OurLocationsItem from "../../components/OurLocationsItem"
//import AuthContext from "../../context/AuthContext"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import Map from '../../components/Map'
const DEFAULT_CENTER = [52.5, -7.36546]
import {useState} from 'react'
const PER_PAGE = 3
import Link from "next/link";
//import { cookies } from 'next/headers'; // Import cookies
// @ts-ignore

export default function OurLocations({userData}) {
	const [toggleViewMode, setToggleViewMode] = useState(false);
  	const locationsData = userData
	console.log(locationsData.locations)

	return (
	<Layout title='Our Locations' keywords='' description=''>

					<div className='my-20 h-screen'>
						<div className="flex justify-end p-5">
							<button
								className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
								onClick={() => setToggleViewMode(!toggleViewMode)}
							>
									{toggleViewMode ? 'Switch to Map' : 'Switch to List'}
							</button>
						</div>
						
						{locationsData.locations.length===0 && <h3> No Locations to show </h3>}
						{toggleViewMode ? <>
 						{locationsData.locations.map((location) => (
							<div className='flex justify-center items-center flex-col text-zinc-600 dark:text-zinc-400'>
								<OurLocationsItem key={locationsData.locations.id} location={location}/>
							</div>
							))}
							
						</>
						:
						<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div class="mx-auto  max-w-4xl">
								<Map center={DEFAULT_CENTER} zoom={8}>
									{({ TileLayer, Marker, Popup }) => (
									<>
										<TileLayer
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
										/>
										{locationsData.locations.map((location) => (
											
											<Marker position={[location.lat, location.lon]}>
												<Popup>
													<b>Name:</b> {location.name} <br/>
													<b>Category:</b> {location.category}
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


export async function getServerSideProps ({ req, res})  {
	
	const cookieToken = getCookie('token', { req, res});
	console.log(cookieToken)
	const response = await fetch(`${API_URL}/api/users/me?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const userData= await response.json()
	const locations = userData.locations

	const total = locations.length
	return {
		props: {userData, total}
	}
}

