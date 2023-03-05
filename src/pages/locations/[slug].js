// @ts-nocheck
import { API_URL } from "../../utils/config"
import Layout from "../../components/layout"
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter  } from "next/router";
import Map from '../../components/Map'
const DEFAULT_CENTER = [52.5, -7.36546]

export default function LocationPage({location}) {
  const router = useRouter()
  const deleteLocation = async (e) => {

    console.log('id')
    console.log(location.id)
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL}/api/locations/${location.id}`,
      {
        method: 'DELETE',
      })

      //const data = await res.json()

      //TODO - put in ifs / try / catches
      toast.success(`Deleted Location: ${location.attributes.name}`)
  
      router.push('/discover')
    
    }
  }
  
  //console.log(location)
  return (
    <Layout title={location.attributes.name} keywords='{undefined}' description='{undefined}' >
		<div className='my-20 h-screen'>
			<div>
        <span>Name: {location.attributes.name}</span>
        <h1> Address: {location.attributes.address}</h1>
        <p>Lat: {location.attributes.lat}</p>
        <p>Lon: {location.attributes.lon}</p>
        <p>Description: {location.attributes.description}</p>
        <p>Opening Hours: {location.attributes.MonOpen}</p>
     
      </div>
      <Map className="w-full h-64" width="800" height="400" center={DEFAULT_CENTER} zoom={8}>
							{({ TileLayer, Marker, Popup }) => (
							<>
								<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
								/>
							
									<Marker position={[location.attributes.lat, location.attributes.lon]}>
										<Popup>
											<b>Name:</b> {location.attributes.name} <br/>
											<b>Category:</b> {location.attributes.category}
										</Popup>
									</Marker>
							
								
							</>
							)}
						</Map>
		</div>
    </Layout>
  )
}

export async function getServerSideProps({ params: { slug} } ) {
 const res = await fetch (`${API_URL}/api/locations?filters[slug][0]=${slug}&populate=*`)
 const locations = await res.json()
 const locationsdata = locations.data

  return {
    props: {
      location: locationsdata[0]
    },
  }
}
