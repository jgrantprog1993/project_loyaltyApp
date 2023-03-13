// @ts-nocheck
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import { API_URL } from '../../../utils/config'
import Image from 'next/image'
import Modal from '../../../components/Modal'
import ImageUpload from '../../../components/ImageUpload'
import { FaImage } from 'react-icons/fa'
import cookie from 'cookie'

export default function editLocation({location, token}) {
    // console.log(location)
    const [values, setValues] = useState({
        name:location.data.attributes.name,
        lat:location.data.attributes.lat,
        lon:location.data.attributes.lon,
        description:location.data.attributes.description,
        address:location.data.attributes.address,
        category:location.data.attributes.category,
        images:location.data.attributes.images,
        logo:location.data.attributes.logo,
        MonOpen:location.data.attributes.MonOpen,
        MonClosed:location.data.attributes.MonClosed,
        TuesOpen:location.data.attributes.TuesOpen,
        TuesClosed:location.data.attributes.TuesClosed,
        WedOpen:location.data.attributes.WedOpen,
        WedClosed:location.data.attributes.WedClosed,
        ThurOpen:location.data.attributes.ThurOpen,
        ThurClosed:location.data.attributes.ThurClosed,
        FriOpen:location.data.attributes.ThurClosed,
        FriClosed:location.data.attributes.FriClosed,
        SatOpen:location.data.attributes.SatOpen,
        SatClosed:location.data.attributes.SatClosed,
        SunOpen:location.data.attributes.SunOpen,
        SunClosed:location.data.attributes.SunClosed,
       
       
    })
    const router = useRouter()
    const [imagePreview, setImagePreview] = useState(
        location.image ? location.image.formats.thumbnail.url : null
      )
    const [showModal, setShowModal] = useState(false)
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(values)
        // const anyEmptyField = Object.values(values).some(
            
        //     (element) => element === '')
    
        //     if(anyEmptyField){
        //         toast.error('Please fill in all Fields')
        //     }
            var valuesObj = JSON.stringify({
                'data': {
                    name:values.name,
                    lat:values.lat,
                    lon:values.lon,
                    description:values.description,
                    address:values.address,
                    category:values.category,
                }
              });
              //console.log(valuesObj)
            // const res =  await fetch (`${API_URL}/api/ourlocations/${location.data.id}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: valuesObj,
            // }).then((res) => res.json())
            
           
            // console.log(res.body)
          
            
            //TODO Check if error first 
            toast.success(`Updated Location: `)
            router.push(`/discover`)
          
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values,[name]:value})
    }

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/api/locations/${location.data.id}?populate=*`)
        const data = await res.json()
        console.log(data)
        // console.log(data.image.formats.thumbnail.url)
        // setImagePreview(data.image.formats.thumbnail.url)

        setShowModal(false)
      }

    return (
    <Layout title='Edit Location'>
        <div className='my-20 h-screen'>
            <ToastContainer />
           
                <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Location Details</h2>
                    <div class="grid grid-cols-2 gap-8">
                        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <form onSubmit={handleSubmit} id="form1">
                                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                    <div class="sm:col-span-2">
                                        <label htmlFor="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input 
                                            type='text'
                                            id='name'
                                            name='name'
                                            value={values.name}
                                            onChange={handleInputChange}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>
                                    <div class="w-full">
                                        <label htmlFor="lat" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lat</label>
                                        <input 
                                            type='number'
                                            step="0.000001"
                                            name='lat'
                                            id='lat'
                                            value={values.lat}
                                            onChange={handleInputChange}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>
                                    <div class="w-full">
                                        <label for="lon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lon</label>
                                        <input 
                                            type='number'
                                            step="0.000001"
                                            name='lon'
                                            id='lon'
                                            value={values.lon}
                                            onChange={handleInputChange}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>
                                    <div>
                                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <select 
                                        id="category" 
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option>-</option>
                                            <option>coffee</option>
                                            <option>lunch</option>
                                            <option>gym</option>
                                            <option>barber</option>
                                        </select>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                        <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input
                                            type='text'
                                            name='description'
                                            id='description'
                                            value={values.description}
                                            onChange={handleInputChange}
                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <button type='submit' form='form1' value='Submit' class="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                                        Update Location
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <dl>
                                <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Opening Hours
                                </dt>
                                <div class="grid grid-cols-3 gap-1">
                                        <div>
                                            <label class="block mb-2 text-sm  dark:text-white">Monday
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.MonOpen}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                                
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.MonClosed}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm  dark:text-white">Tuesday
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.TuesOpen}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                                
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.TuesClosed}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm  dark:text-white">
                                            Wednesday
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.WedOpen}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                                
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.WedClosed}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm  dark:text-white">
                                                Thursday
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.ThurOpen}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                                
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.ThurClosed}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm  dark:text-white">
                                            Friday
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.FriOpen}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                                
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.FriClosed}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-small dark:text-white">
                                            Saturday
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.SatOpen}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                                
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.SatClosed}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm  dark:text-white">
                                                Sunday
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.SunOpen}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                                
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                name='description'
                                                id='description'
                                                value={values.SunClosed}
                                                onChange={handleInputChange}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" /> 
                                        </div>
                                </div>
                            </dl>
                        </div>
                    </div>
  
                        <p className="mb-2 font-semibold leading-none text-gray-900 dark:text-white" >Location Image</p>
                    {imagePreview ? (
                        <Image src={imagePreview} height={100} width={170} />
                    ) : (
                        <div>
                        <p>No image uploaded</p>
                        </div>
                    )}

                    <div>
                        <button
                        onClick={() => setShowModal(true)}
                        className='text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                        >
                        <FaImage /> Set Image
                        </button>
                    </div>

                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <ImageUpload
                        locationId={location.data.id}
                        imageUploaded={imageUploaded}
                        token={token}
                        />
                    </Modal>
                </div>
        </div> 
    </Layout>
  )
}

export async function getServerSideProps({params: {id}, req
}) {
    const {token} = cookie.parse(req.headers.cookie)

    const res = await fetch(`${API_URL}/api/locations/${id}`)
    const location = await res.json()


    return{
       props: {
        location,
        token
       } 
    }
}
