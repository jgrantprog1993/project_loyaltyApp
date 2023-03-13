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
import cookie from 'cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

export default function add({token, locations}) {
    const {user} = useContext(AuthContext)
    console.log(locations)
    const [values, setValues] = useState({
        title:'',
        description:'',
        location:'',
        endDate:'',
       
    })
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
      
        //console.log(user)
            var valuesObj = JSON.stringify({
                'data': {
                    title:values.title,
                    description:values.description,
                    location:values.location,
                    endDate:values.endDate
                   
                }
              });
              console.log(valuesObj)
            const res =  await fetch (`https://loyalty-app-final-proj-jg1.herokuapp.com/api/offers`, {
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
            //console.log(body)
            console.log(res)
            //TODO Check if error first 
            toast.success(`Offer Added `)
            router.push(`/ouroffers`)
          
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values,[name]:value})
    }
    return (
       <Layout title='Add new Offers'>
        <Link href='/ouroffers'>Go Back</Link>
        <div className='my-20 h-screen'>
        
            <ToastContainer />
            <div class="mt-8 mx-8 ">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} id="form1" class="space-y-8 divide-y divide-gray-200">
                <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <h3 class="text-base font-semibold leading-6 text-gray-900">Add Offers</h3>
                </div>
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="title" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Offer Title</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                        <input 
                        type='text'
                        id='title'
                        name='title'
                        value={values.title}
                        onChange={handleInputChange}
                        class="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="description" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Description</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <textarea 
                            type='text'
                            id='description'
                            name='description'
                            value={values.description}
                            onChange={handleInputChange}
                            rows="3" 
                            class="block w-full max-w-lg rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"></textarea>
                            
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Location</label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <select 
                            type="hidden"
                            name='location'
                            id='location'
                            value={values.location}
                            onChange={handleInputChange}
                            class="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            {locations.map((location) => (
                            <option value={location.id}>{location.name}</option>
                            ))}
                           
                            </select>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor='endDate' className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">End-Date</label>
                        <input type="date" 
                        name="endDate"
                        value={values.endDate}
                        onChange={handleInputChange}
                        class="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div class="pt-5">
                    <div class="flex justify-end gap-x-3">
                    <button type="button" class="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</button>
                    <button type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        </div>
        </Layout>
)}

export async function getServerSideProps({req, res}) {
    const token = getCookie('token', { req, res});
    const userInfo = await fetch(`${API_URL}/api/users/me?populate=*`,
        {
            method: 'GET',
                headers: {
                    Authorization:`Bearer ${token}`
                }
        })
    
	const userInfoRes= await userInfo.json()
    const locations = userInfoRes.locations

    return {
        props: { token, locations}
    }
}