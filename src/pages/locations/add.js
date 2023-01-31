// @ts-nocheck
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout'
import { API_URL } from '../../utils/config'


export default function add() {
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
       
       
    })
    const router = useRouter()
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
            const res =  await fetch (`${API_URL}/api/locations`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: valuesObj,
            }).then((res) => res.json())
            
            console.log(res)
            //TODO Check if error first 
            toast.success(`Added Location: ${res.data.attributes.name}`)
            router.push(`/discover`)
          
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values,[name]:value})
    }
    return (
       <Layout title='Add new Location'>
        <Link href='/locations'>Go Back</Link>
        <div className='my-20 h-screen'>
            <h1>Add Location</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} id="form1"> 
                <div >
                    <div>
                        <label htmlFor="name">Location Name</label>
                        <input 
                        type='text'
                        id='name'
                        name='name'
                        value={values.name}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                    <label htmlFor='lat'>Lat</label>
                        <input
                        type='number'
                        step="0.000001"
                        name='lat'
                        id='lat'
                        value={values.lat}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='lon'>Lon</label>
                        <input
                        type='number'
                        step="0.000001"
                        name='lon'
                        id='lon'
                        value={values.lon}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                        type='text'
                        name='address'
                        id='address'
                        value={values.address}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='category'>category</label>
                    <input
                        type='text'
                        name='category'
                        id='category'
                        value={values.category}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <button type='submit' form='form1' value='Submit'>Submit</button>
        </div>
        </Layout>
  )
}
