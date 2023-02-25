// @ts-nocheck
import { API_URL } from "../utils/config"
import {  getCookie } from 'cookies-next';
import Link from 'next/link'

export default function VoucherItem({voucher, token}) {
    
    var voucherPoints = voucher.attributes.voucher.data?.attributes.voucherPoints
    const voucherPointsPec = (voucherPoints/10) * 100
   
    async function redeem() {
       console.log(voucher.id)
        var raw = JSON.stringify({
            "data": {
            "voucherPoints": 0,
            }
        });
        const res = await fetch (`${API_URL}/api/vouchers/${voucher.id}`, {
            method: 'PUT',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: raw
        })
    }

    return(
        <>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
           
            <div class="p-5">
            <div class="flex items-center space-x-4">
                <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""></img>
                <div class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{voucher.attributes.name}</div>
                
            </div>        
            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">{voucher.attributes.category}</div>
                
                    {voucherPoints ==10 ? 
                    <Link href="/vouchers" passHref>
                    <button onClick={redeem} class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Redeem</button>
                    </Link>
                   
                    :
                    ''}
            
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width: voucherPointsPec+'%'}}></div>
                </div>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{voucherPoints}/ 10</p>
            </div>
        </div>
        </>
    )
}

