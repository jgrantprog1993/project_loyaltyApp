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
   const router = useRouter()
   const deleteOffer= async (e) => {
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL}/api/offers/${offer[0].id}`,
      {
        method: 'DELETE',
      })

      toast.success(`Deleted Offer: ${offer[0].attributes.title}`)
  
      router.push('/ouroffers')
    
    }
  }

    return (
    <div className="my-2">
      <div className="flex bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 ">
      <figure className="flex slate-100 rounded-xl p-8 dark:bg-slate-800">
                <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={offer[0].attributes.image} alt=""/>
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            <h1>{offer[0].attributes.title}</h1>
              <p className="text-sm font-small">
                {offer[0].attributes.description}
              </p>
            <figcaption className="font-medium">
              <p className="text-sm font-small text-slate-700 dark:text-slate-500">
                  EndDate: {offer[0].attributes.endDate}
              </p>
            </figcaption> 
          </div>
          <div className="h-8">
            <button type="button" onClick={deleteOffer} class="inline-flex items-center text-white bg-red-400 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5  text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                  <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                  Delete
            </button> 
          </div>
      </figure>
      </div>
    </div>
  )
}
