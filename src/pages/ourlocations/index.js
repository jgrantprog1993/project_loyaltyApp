// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import OurLocationsItem from "../../components/OurLocationsItem"
//import AuthContext from "../../context/AuthContext"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

//import { cookies } from 'next/headers'; // Import cookies
// @ts-ignore

export default function OurLocations({userData}) {
	
  	const locationsData = userData
	//console.log('''locationsData')
	//console.log(locationsData)
  	// console.log(locationsData.id)
	// console.log(locationsData.locations.name)
	

	

	return (
	<Layout title='Our Locations' keywords='' description=''>

					<div className='my-20 h-screen'>
						<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
							Our Locations
						</h2>
						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{locationsData.locations.length===0 && <h3> No Locations to show </h3>}
						
 					{locationsData.locations.map((location) => (
							<OurLocationsItem key={locationsData.locations.id} location={location}/>
						))}
					</div>
				
	 </Layout>
  )
}


export async function getServerSideProps ({req, res})  {
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
	// console.log('userData')
	// console.log(userData)

	return {
		props: {userData}
	}
}

