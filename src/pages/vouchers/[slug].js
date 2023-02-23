// @ts-nocheck
import { API_URL } from "../../utils/config"
import Layout from "../../components/layout"
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter  } from "next/router";
import cookie from 'cookie'



export default function VoucherPage({voucherPoints, id, token}) {
    console.log('HERE 5')
    console.log(token)
    console.log(id)
    console.log(voucherPoints)
    const newvoucherPoints = voucherPoints +1
    console.log(newvoucherPoints)
    postNewLoyalty(newvoucherPoints,id)
    const router = useRouter();


    async function postNewLoyalty(newvoucherPoints,id){
        console.log('HERE 6')
        var raw = JSON.stringify({
            "data": {
            "voucherPoints": newvoucherPoints,
            }
        });
        console.log(raw)
        // const {token} = cookie.parse(req.headers.cookie)
        const res = await fetch (`${API_URL}/api/vouchers/${id}`, {
            method: 'PUT',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: raw
        })

        const data = await res.json()
        console.log(data)
        console.log('HERE 7')
        
        if(res.ok){
        
            router.push('/vouchers')
        } else {
            console.log("ERRORR!!!!")
        
        }   
        
    }
    return (

    <Layout title='Voucher - Loyalty App' keywords='{undefined}' description='{undefined}'>
        <div className='my-20 h-screen'>
            <h1>
                Voucher for
            </h1>
        </div>
    </Layout>
                
    )
}

export async function getServerSideProps({ params: { slug} ,req}) {
    console.log('HERE 2')
    const {token} = cookie.parse(req.headers.cookie)
    console.log(token)
    const res = await fetch (`${API_URL}/api/vouchers?filters[location][slug]=${slug}&populate=*`, {
        method: 'GET',
        headers: {
            Authorization:`Bearer ${token}`
        }
    })  // first, extract JSON data from `Response` object
    // .then((res) => res.json())
    // // then print JSON data that was parsed
    // .then((data) => console.log(data));
    //console.log(res)
    const locations = await res.json()
   
    console.log(locations)
    console.log('HERE 3')
    //console.log(locations)
    console.log('HERE 4')
     const id = locations.data[0].attributes.location.data.id
    const voucherPoints = locations.data[0].attributes.voucherPoints
    // console.log(locations)
    console.log(id)
    console.log(voucherPoints)
     return {
       props: {
        voucherPoints: voucherPoints,
        id:id,
        token: token
       },
     }
   }