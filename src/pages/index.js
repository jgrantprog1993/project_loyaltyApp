// @ts-nocheck
import Layout from "../components/layout"
import Hero from "../components/Hero"
import 'react-toastify/dist/ReactToastify.css'
import Footer2 from "../components/footer"
export default function Home(){
	return (

		<Layout title='HomePage - Loyalty App' keywords='{undefined}' description='{undefined}'>
			<div className='my-20'>
				<Hero/>
			</div>
			<Footer2/>
		</Layout>
					
	)
}




