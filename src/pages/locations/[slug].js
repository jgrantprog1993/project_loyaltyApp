// @ts-nocheck
import { API_URL } from "../../utils/config"
import Layout from "../../components/layout"
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

export default function LocationPage({location}) {
  const deleteLocation = (e) => {
    console.log('delete')
  }
  
  
  return (
    <Layout title='{location.name}' keywords='{undefined}' description='{undefined}' >
		<div className='my-20 h-screen'>
			<div>
        <div>
        {/* <Link href={`/locations/edit/${location.id}`}>
          <a>
            <FaPencilAlt /> Edit Location
          </a>
          <a href="#" className="" onClick={deleteLocation}>
            <FaTimes /> Delete
          </a>
        </Link> */}
        </div>
        <span>{location.business}</span>
        <h1> Address: {location.address}</h1>
        
        <p>Lat: {location.lat}</p>
        <p>Lon: {location.lon}</p>
        <p>Description: {location.description}</p>
        <p>Opening Hours: {location.openingHours[0].MonOpen}</p>
     
      </div>
		</div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { slug} } ) {
 const res = await fetch (`${API_URL}/api/Locations/${slug}`)
 const locations = await res.json()

  return {
    props: {
      location: locations[0],
    },
  }
}
