// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import DiscoverItem from "../../components/DiscoverItem"

// @ts-ignore
export default function Discover({locations}) {
	console.log('locations.data')
	console.log(locations.data)
  	const locationsData = locations.data
	console.log('locationsData')
  	console.log(locationsData)


	return (
	<Layout title='Discover' keywords='' description=''>

					<div className='my-20 h-screen'>
						<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
							Discover
						</h2>
						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{locationsData.length===0 && <h3> No Evnets to show </h3>}
						
						{locationsData.map((location) => (
							<DiscoverItem key={locationsData.id} location={location}/>
						))}
					</div>
				
	</Layout>
  )
}


export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/api/locations?populate=*`)
	const locations = await res.json()


	return {
		props: {locations}
	}
}