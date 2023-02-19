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
  
      router.push('/ourlocations')
    
    }
  }
  
  //console.log(location)
  return (
    <Layout title='{location.name}' keywords='{undefined}' description='{undefined}' >
		<div className='my-20 h-screen'>
			<div>
        <div>
        <Link legacyBehavior href={`/locations/edit/${location.id}`}>
          <a>
            <FaPencilAlt /> Edit Location
          </a>
        </Link>
        <a className="" onClick={deleteLocation}>
          <FaTimes /> Delete
        </a>
        
        </div>
        <span>Name: {location.attributes.name}</span>
        <h1> Address: {location.attributes.address}</h1>
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
 const locationsdata = locations.data

  return {
    props: {
      location: locationsdata[0]
    },
  }
}
