// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import OurOfferItem from "../../components/OurOfferItem"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

// @ts-ignore
export default function OurOffers({id,result2JSON,offers}) {

	console.log(id)
	console.log(result2JSON)
	console.log(offers)
	var resOffers = offers.filter((item) => item.length >0)

	
	return (
	<Layout title='Discover' keywords='' description=''>

					<div className='my-20 h-screen'>
						<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
							Our Offers
						</h2>
						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{resOffers.length===0 && <h3> No Offers to show </h3>}
						
						{resOffers.map((offer) => (
							<OurOfferItem key={resOffers.id} offer={offer}/>
						))}
					</div>
				
	</Layout>
  )
}


export async function getServerSideProps({req, res}) {
	const cookieToken = getCookie('token', { req, res});
	console.log(cookieToken)
	const result = await fetch(`${API_URL}/api/users/me?populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const resultJSON= await result.json()
	const id= resultJSON.id

	const result2 = await fetch(`${API_URL}/api/locations?filters[users_permissions_user][id]=${id}&populate=*`,
	{
		method: 'GET',
			headers: {
				Authorization:`Bearer ${cookieToken}`
			}
	})
	const result2JSON= await result2.json()
	 const offers = []
	for(let i =0; i<result2JSON.data.length; i++){

		offers[i] = result2JSON.data[i].attributes.offers.data
	}

	return {
		props: {
			
			id: id, 
			result2JSON:result2JSON,
			offers: offers
		}
	}
}