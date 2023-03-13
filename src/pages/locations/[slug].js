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
      <div class="container mx-auto  ">
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
