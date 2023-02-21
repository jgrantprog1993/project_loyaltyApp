// @ts-nocheck
import Link from "next/link"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

export default function VoucherItem({voucher}) {
    
    // console.log('voucher')
    // console.log(voucher)
    // console.log('voucher.attributes.voucher.voucherPoints')
    // console.log(voucher.attributes.voucher.data)
   
    var voucherPoints = voucher.attributes.voucher.data.attributes.voucherPoints
    // console.log('voucherPoints')
    // console.log(voucherPoints)
    const voucherPointsPec = (voucherPoints/10) * 100
   
    

    return(
        <>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src="public/images/place-arch-coffee-exterior-2-768x1024.jpeg" alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{voucher.attributes.name}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{voucher.attributes.category}</p>
                </div>  
                
                <div class="p-5"> 
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div class="bg-blue-600 h-2.5 rounded-full" style={{width: voucherPointsPec+'%'}}></div>
                </div>
            
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{voucherPoints}/ 10</p>
            </div>
            </div>
        </>
    )
}

