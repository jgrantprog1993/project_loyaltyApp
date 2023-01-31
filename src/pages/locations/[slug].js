// @ts-nocheck
import { API_URL } from "../../utils/config"
import Layout from "../../components/layout"
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter  } from "next/router";



export default function LocationPage({location}) {
  const router = useRouter()
  const deleteLocation = async (e) => {
  
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL}/locations/${location.id}`,
      {
        method: 'DELETE',
      })

      const data = await res.json()

      if(!res.ok){
        toast.error(data.message)
      } else {
        Router.push('/locations')
      }
    }
  }
  
  console.log(location)
  return (
    <Layout title='{location.name}' keywords='{undefined}' description='{undefined}' >
		<div className='my-20 h-screen'>
			<div>
        <div>
        <Link href={`/locations/edit/${location.id}`}>
          <a>
            <FaPencilAlt /> Edit Location
          </a>
          <a href="#" className="" onClick={deleteLocation}>
            <FaTimes /> Delete
          </a>
        </Link>
        </div>
        <span>{location.business}</span>
        <h1> Address: {location.attributes.address}</h1>
        <ToastContainer />
        
        <p>Lat: {location.attributes.lat}</p>
        <p>Lon: {location.attributes.lon}</p>
        <p>Description: {location.attributes.description}</p>
        <p>Opening Hours: {location.attributes.MonOpen}</p>
     
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
