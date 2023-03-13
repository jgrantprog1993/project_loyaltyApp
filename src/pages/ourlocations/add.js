// @ts-nocheck
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import { API_URL } from '../../utils/config'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { async } from '@firebase/util';
import cookie from 'cookie'

export default function add(token) {
    const {user} = useContext(AuthContext)
    console.log('token')
    console.log(token)
    const [values, setValues] = useState({
        name:'',
        lat:'',
        lon:'',
        description:'',
        address:'',
        category:'',
        images:'',
        logo:'',
        MonOpen:'',
        MonClosed:'',
        TuesOpen:'',
        TuesClosed:'',
        WedOpen:'',
        WedClosed:'',
        ThurOpen:'',
        ThurClosed:'',
        FriOpen:'',
        FriClosed:'',
        SatOpen:'',
        SatClosed:'',
        SunOpen:'',
        SunClosed:'',
        users_permissions_user:''
       
    })
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
      
        console.log(user)
            var valuesObj = JSON.stringify({
                "data": {
                    "name":values.name,
                    "lat":values.lat,
                    "lon":values.lon,
                    "description":values.description,
                    "address":values.address,
                    "category":values.category,
                    "users_permissions_user": user.id
                }
              });
              console.log('valuesObj')
              console.log(valuesObj)
            const res =  await fetch (`https://loyalty-app-final-proj-jg1.herokuapp.com/api/locations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: valuesObj,
            }).then((res) => res.json())
            
            if(!res.ok){
                if(res.status===403 || res.status === 401){
                    toast.error("No Token Included")
                    return
                }
            }
            console.log('res')
            console.log(res)
            //TODO Check if error first 
            toast.success(`Added Location`)
            router.push(`/ourlocations`)
          
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values,[name]:value})
    }
    return (
       <Layout title='Add new Location'>
        <Link href='/locations'>Go Back</Link>
        <div className='my-20 h-screen'>
            <ToastContainer />
            <div class="mt-8 mx-8 ">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-6">
                    <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-base font-semibold leading-6 text-gray-900">Add Location</h3>
                        <p class="mt-1 text-sm text-gray-600">PlaceHolder</p>
                    </div>
                    </div>
                    <div class="mt-5 md:col-span-2 md:mt-0">
                    <form onSubmit={handleSubmit} id="form1">
                        <div class="overflow-hidden shadow sm:rounded-md">
                        <div class="bg-white px-4 py-5 sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <label htmlFor="name" class="block text-sm font-medium leading-6 text-gray-900">Location Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={values.name}
                                    onChange={handleInputChange}
                                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>    
                            <div class="col-span-6 sm:col-span-3">
                                <label htmlFor="lat" class="block text-sm font-medium leading-6 text-gray-900">Lat</label>
                                <input 
                                    type='number'
                                    step="0.000001"
                                    id="lat" 
                                    name='lat'
                                    value={values.lat}
                                    onChange={handleInputChange}
                                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label htmlFor="lon" class="block text-sm font-medium leading-6 text-gray-900">Lon</label>
                                <input 
                                    type='number'
                                    step="0.000001"
                                    name='lon'
                                    id='lon'
                                    value={values.lon}
                                    onChange={handleInputChange}
                                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label htmlFor="category" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                <select 
                                    type='text'
                                    name='category'
                                    id='category'
                                    value={values.category}
                                    onChange={handleInputChange}
                                    class="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option>-</option>
                                    <option>coffee</option>
                                    <option>lunch</option>
                                    <option>gym</option>
                                    <option>barber</option>
                                </select>
                            </div>

                            <div class="col-span-6">
                                <label htmlFor="street-address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                                <input 
                                    type='text'
                                    name='address'
                                    id='address'
                                    value={values.address}
                                    onChange={handleInputChange}
                                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>

                            <div class="col-span-6">
                                <label htmlFor="about" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div class="mt-2">
                                        <textarea 
                                            type='text'
                                            name='description'
                                            id='description'
                                            value={values.description}
                                            onChange={handleInputChange}
                                            rows="3" 
                                            class="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6">
                                        </textarea>
                                    </div>
                                    <p class="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
        
        </Layout>
  )
}

export async function getServerSideProps({req}) {
    const {token} = cookie.parse(req.headers.cookie)

    return {
        props: {token}
    }
}