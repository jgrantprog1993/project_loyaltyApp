// @ts-nocheck
import { API_URL } from "../../utils/config"
import Layout from "../../components/layout"
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter  } from "next/router";
import cookie from 'cookie'



export default async function VoucherPage({location, user, vouchers, token}) {
    console.log('HERE 5')
    console.log(vouchers)
    console.log('location')
    console.log(location)
    console.log(location.data[0].id)
    console.log(user.id)
    console.log(vouchers.data[0].id)
    console.log(vouchers.data[0].attributes.voucherPoints)
    if(vouchers.data.length == 0)
    {
        console.log('HERE Creating')
        var newVoucher= JSON.stringify({
            "data": {
                "location": location.data[0].id,
                "users_permissions_user":user.id,
                "voucherPoints":1
            }
        })
        console.log(newVoucher)
        const voucherCreated = await fetch (`${API_URL}/api/vouchers`, {
            method: 'POST',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: newVoucher
        })
        const dataCreated = await voucherCreated.json()
        console.log('Created')
        console.log(dataCreated)
    }
    console.log('Finished Creating')
    const id = vouchers.data[0].id
    const voucherPoints = vouchers.data[0].attributes.voucherPoints
    
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
    const userRes = await fetch (`${API_URL}/api/users/me?populate=*`, {
        method: 'GET',
        headers: {
            Authorization:`Bearer ${token}`
        }
    }) 
    const userResJSON = await userRes.json()
    console.log('userResJSON')
    console.log(userResJSON)
    console.log('userResJSON.id')
    console.log(userResJSON.id)
    
    const locId = await fetch (`${API_URL}/api/locations?filters[slug]=${slug}&populate=*`, {
        method: 'GET',
        headers: {
            Authorization:`Bearer ${token}`
        }
    }) 
    const locIdJson = await locId.json()

    const res = await fetch (`${API_URL}/api/vouchers?filters[location][slug]=${slug}&filters[users_permissions_user][id]=${userResJSON.id}&populate=*`, {
        method: 'GET',
        headers: {
            Authorization:`Bearer ${token}`
        }
    })  
    const vouchers = await res.json()

    console.log('HERE 3')
   
    var valuesObj = JSON.stringify({
        'data': {
            location:locIdJson.data[0].id,
            // users_permissions_user:userResJSON.id,
            // voucher:vouchers.data[0].id,
            scannedAt:new Date()
        }
      });

    const res2 = await fetch (`${API_URL}/api/scans`, {
        method: 'POST',
        headers: {
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: valuesObj,
    })  
  
     return {
       props: {

            location: locIdJson,
            user:userResJSON,
            token:token,
            vouchers: vouchers

       },
     }
   }