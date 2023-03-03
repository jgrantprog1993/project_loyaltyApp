// @ts-nocheck
import { API_URL } from "../utils/config"
import Layout from "../components/layout"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter  } from "next/router";
// @ts-nocheck
// @ts-ignore
import Link from "next/link"
// @ts-ignore
import Image from "next/image"

// @ts-ignore
export default function OfferItem({offer}) {
    console.log(' %%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(offer)
   const router = useRouter()
   
   const deleteOffer= async (e) => {

    console.log('deleteOffer id ->')
    console.log(offer[0].id)
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL}/api/offers/${offer[0].id}`,
      {
        method: 'DELETE',
      })

      //const data = await res.json()

      //TODO - put in ifs / try / catches
      toast.success(`Deleted Offer: ${offer[0].attributes.title}`)
  
      router.push('/ouroffers')
    
    }
  }

    return (
    <div className="my-2">
       
            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                   <h1>{offer[0].attributes.title}</h1>
                        <p className="text-sm font-small">
                        {offer[0].attributes.description}
                        </p>
                        <a className="" onClick={deleteOffer}>
                            <FaTimes /> Delete
                        </a>
                        <figcaption className="font-medium">
                        <p className="text-sm font-small text-slate-700 dark:text-slate-500">
                            EndDate: {offer[0].attributes.endDate}
                        </p>
                        </figcaption> 
                    
                </div>
            </figure>
        
    </div>
  )
}
