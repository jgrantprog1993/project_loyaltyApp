// @ts-nocheck
import { API_URL } from "../../utils/config"
import Layout from "../../components/layout"
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

export default function LocationPage({location}) {
  const deleteLocation = (e) => {
    console.log('delete')
  }
  
  console.log(location)
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
        <h1> Address: {location.attributes.address}</h1>
        
        <p>Lat: {location.attributes.lat}</p>
        <p>Lon: {location.attributes.lon}</p>
        <p>Description: {location.attributes.description}</p>
        <p>Opening Hours: {location.attributes.openHrs[0].MonOpen}</p>
     
      </div>
		</div>
    </Layout>
  )
}

export async function getServerSideProps({ params: { slug} } ) {
 const res = await fetch (`${API_URL}/api/locations?filters[slug][0]=${slug}&populate=*`)
 const locations = await res.json()
 console.log(locations)
 const locationsdata = locations.data
  return {
    props: {
      location: locationsdata[0]
    },
  }
}
