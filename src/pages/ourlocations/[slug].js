// @ts-nocheck
import { API_URL } from "../../utils/config"
import Layout from "../../components/layout"
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter  } from "next/router";
import Map from '../../components/Map'


export default function LocationPage({location}) {
  const router = useRouter()
  const DEFAULT_CENTER = [location.attributes.lat, location.attributes.lon]
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
    <Layout title={location.attributes.name} keywords='{undefined}' description='{undefined}' >
		<div className='my-20 h-screen'>

    <div class="grid grid-cols-2 gap-4">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h1 class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{location.attributes.name}</h1>
        <br/>
        <dl>
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Description</dt>
            <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{location.attributes.description}</dd>
        </dl>
        <dl>
            <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Address</dt>
            <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{location.attributes.address}</dd>
        </dl>
        <dl class="flex items-center space-x-6">
            <div>
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{location.attributes.category}</dd>
            </div>
          
        </dl>
        <dl class="flex items-center space-x-6">
            <div>
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Lattitude</dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{location.attributes.lat}</dd>
            </div>
            <div>
                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Longitude</dt>
                <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{location.attributes.lon}</dd>
            </div>
        </dl>
        <div class="flex items-center space-x-4">
           
        </div>
      </div>
      <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
        <div class="grid grid-cols-2 gap-2">
        <Link legacyBehavior href={`/ourlocations/edit/${location.id}`}>
            <button type="button" class=" text-white inline-flex items-center bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                Edit 
            </button>   
        </Link>
            <button type="button" onClick={deleteLocation} class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                Delete
            </button> 
        </div>
            <br/><br/><br/>
        <dl>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Opening Hours</dt>
              <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
              <div class="grid grid-cols-2 gap-1">
                <div>
                  Monday:<br/>
                  Tuesday:<br/>
                  Wednesday:<br/>
                  Thursday:<br/>
                  Friday:<br/>
                  Saturday:<br/>
                  Sunday:
                </div>
                <div>
                  {location.attributes.MonOpen} - {location.attributes.MonClosed}<br/>
                  {location.attributes.TuesOpen} - {location.attributes.TuesClosed}<br/>
                  {location.attributes.WedOpen} - {location.attributes.WedClosed}<br/>
                  {location.attributes.ThurOpen} - {location.attributes.ThurClosed}<br/>
                  {location.attributes.FriOpen} - {location.attributes.FriClosed}<br/>
                  {location.attributes.SatOpen} - {location.attributes.SatClosed}<br/>
                  {location.attributes.SunOpen} - {location.attributes.SunClosed}
                </div>
              </div>
              </dd>
        </dl>
      </div>
      </div>
      <div class="container mx-auto ">
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
										</Popup>
									</Marker>
							
							</>
							)}
				  </Map>
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
