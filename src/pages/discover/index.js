// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import DiscoverItem from "../../components/DiscoverItem"
//import AuthContext from "../../context/AuthContext"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import {useState} from 'react'
//import { cookies } from 'next/headers'; // Import cookies
import Map from '../../components/Map'
const DEFAULT_CENTER = [52.5, -7.36546]



export default function Discover({userData}) {
	const [toggleViewMode, setToggleViewMode] = useState(false);
  	const locationsData = userData
	// console.log(locationsData.data.length)  
	console.log('locationsData')
	console.log(locationsData)
	console.log(toggleViewMode)
  	// console.log(locationsData.id)
	// console.log(locationsData.locations.name)
	


	return (
	<Layout title='Discover' keywords='' description=''>

		<div className='my-20 h-screen'>
				<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
					Discover
				</h2>
				<div className="flex justify-end p-5">
					<button
						className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
						onClick={() => setToggleViewMode(!toggleViewMode)}
					>
						{toggleViewMode ? 'grid' : 'list'}
					</button>
				</div>
				
				{locationsData.data.length===0 && <h3> No Locations to show </h3>}
				{toggleViewMode ? <>
					{locationsData.data.map((location) => (
						<div className='flex justify-center items-center flex-col text-zinc-600 dark:text-zinc-400'>
							<DiscoverItem key={locationsData.data.id} location={location}/>
						</div>
						))}
					</>
				:
				
				<Map className="w-full h-64" width="800" height="400" center={DEFAULT_CENTER} zoom={8}>
				{({ TileLayer, Marker, Popup }) => (
				<>
					<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					{locationsData.data.map((location) => (
						
						<Marker position={[location.attributes.lat, location.attributes.lon]}>
							<Popup>
								<b>Name:</b> {location.attributes.name} <br/>
								<b>Category:</b> {location.attributes.category}
							</Popup>
						</Marker>
					))}
					
				</>
				)}
			</Map>
			
				
					
				
				}
				
			
		</div>
	
	 </Layout>
  )
}


export async function getServerSideProps ({req, res})  {
	const cookieToken = getCookie('token', { req, res});
	console.log(cookieToken)
	const response = await fetch(`${API_URL}/api/locations?populate=*`)
	
	const userData= await response.json()
	console.log('userData')
	console.log(userData)

	return {
		props: {userData}
	}
}

