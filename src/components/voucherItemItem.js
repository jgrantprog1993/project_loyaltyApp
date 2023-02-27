// @ts-nocheck
import Link from "next/link"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { API_URL } from "../utils/config"
export default function VoucherItemItem({locationsData}) {
    
    console.log('locationsData')
    console.log(locationsData)
    // console.log(location.attributes.name)
    // console.log('vouchersFromMe')
    // console.log(vouchersFromMe)

    // var VoucherResult = vouchersFromMe.filter(a => a.id === voucher.id)
    return(
        <>
         <a href="#">
            <img class="rounded-t-lg" src="public/images/place-arch-coffee-exterior-2-768x1024.jpeg" alt="" />
         </a>
            {/* <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{location.attributes.name}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{location.attributes.category}</p>
            </div>   */}
        </>
    )
}

