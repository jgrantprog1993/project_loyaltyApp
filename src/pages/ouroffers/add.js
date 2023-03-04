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

export default function add(token) {
    const {user} = useContext(AuthContext)
    //console.log(token)
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
                    description:values. description,
                    location:values.location,
                    description:values.description,
                    endDate:values.endDate
                   
                }
              });
              console.log(valuesObj)
            const res =  await fetch (`${API_URL}/api/offers`, {
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
            toast.success(`Offer Added: ${res.data.attributes.name}`)
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
            <h1>Add Offer</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} id="form1"> 
                <div >
                    <div>
                        <label htmlFor="title">Offer Title</label>
                        <input 
                        type='text'
                        id='title'
                        name='title'
                        value={values.title}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                    <label htmlFor='description'>Description</label>
                        <input
                        type='text'
                        id='description'
                        name='description'
                        value={values.description}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='location'>Location</label>
                        <input
                        type='text'
                        name='location'
                        id='location'
                        value={values.location}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                    <label htmlFor='endDate'>End-Date</label>
                        <input type="date" 
                        name="endDate"
                        value={values.endDate}
                        onChange={handleInputChange}
                        />
                       
                        {/* <label htmlFor='description'>End Date</label>
                        <input
                        type='date'
                        name='endDate'
                        id='endDate'
                        value={values.endDate}
                        onChange={handleInputChange}
                        /> */}
                    </div>
                </div>
            </form>
            <button type='submit' form='form1' value='Submit'>Submit</button>
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