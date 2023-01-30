// @ts-nocheck

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
        openHrs:'',
        description:'',
        address:'',
        images:'',
        logo:'',
        category:'',
        slug:'',
        user:'',
        offers:'',
        
    })
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values);
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
                    <label htmlFor='lat'>Lon</label>
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
                        <label htmlFor='OpeningHrs'>OpeningHrs</label>
                        <input
                        type='text'
                        name='OpeningHrs'
                        id='OpeningHrs'
                        value={values.OpeningHrs}
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
                    <label htmlFor='images'>Location Image</label>
                    <textarea
                        type='image'
                        name='images'
                        id='images'
                        value={values.images}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor='logo'>Location Logo</label>
                    <textarea
                        type='image'
                        name='logo'
                        id='logo'
                        value={values.logo}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor='category'>category</label>
                    <textarea
                        type='image'
                        name='category'
                        id='category'
                        value={values.category}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor='slug'>Slug</label>
                    <textarea
                        type='image'
                        name='slug'
                        id='slug'
                        value={values.slug}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </form>
            <button type='submit' form='form1' value='Submit'>Submit</button>
            
        </div>
        </Layout>
  )
}
