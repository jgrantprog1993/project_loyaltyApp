// @ts-nocheck
import Layout from "../../components/layout"
import { API_URL } from "../../utils/config"
import OfferItem from "../../components/OfferItem"

// @ts-ignore
export default function Offers({offers}) {
 
	return (
	<Layout title='Discover' keywords='' description=''>

					<div className='my-20 h-screen'>
						<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
							Offers
						</h2>
						<p className='text-zinc-600 dark:text-zinc-400'></p>
						{offers.length===0 && <h3> No Offers to show </h3>}
						
						{offers.map((offer) => (
							<OfferItem key={offer.id} offer={offer}/>
						))}
					</div>
				
	</Layout>
  )
}


export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/api/Offers`)
	const offers = await res.json()
   
   
	return {
		props: {offers}
	}
}