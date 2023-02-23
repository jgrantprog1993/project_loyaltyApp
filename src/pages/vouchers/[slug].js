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
    console.log(voucherPoints)
    const newvoucherPoints = voucherPoints +1
    console.log(newvoucherPoints)
    postNewLoyalty(newvoucherPoints,id)



async function postNewLoyalty(newvoucherPoints,id){
    console.log('HERE 6')
    var raw = JSON.stringify({
        "data": {
          "voucherPoints": newvoucherPoints
        }
      });
      console.log(raw)
    // const {token} = cookie.parse(req.headers.cookie)
    const res = await fetch (`${API_URL}/api/vouchers/${id}?populate=*`, {
        method: 'PUT',
        headers: {
            Authorization:`Bearer ${token}`
        },
        body: raw,
        redirect: 'follow'
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
            {/* <h1>
                Voucher for ${slug}
            </h1> */}
        </div>
    </Layout>
                
)
}

export async function getServerSideProps({ params: { slug} ,req}) {
    console.log('HERE 2')
    const {token} = cookie.parse(req.headers.cookie)
    const res = await fetch (`${API_URL}/api/vouchers?filters[location][slug]=${slug}&populate=*`)
    const locations = await res.json()
    console.log('HERE 3')
    console.log(locations)
    //const id = locations.data.id
    //const voucherPoints = locations.data.attributes.voucherPoints
    console.log('HERE 4')
    //console.log(voucherPoints)
     return {
       props: {
        // voucherPoints: voucherPoints,
        // id:id
        token: token
       },
     }
   }