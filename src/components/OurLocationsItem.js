// @ts-nocheck
// @ts-ignore
import Link from "next/link"
// @ts-ignore
import Image from "next/image"

// @ts-ignore
export default function OurLocationsItem({location}) {
    //console.log('Discover Our Locations')
    //console.log(location)
    return (
    <div className="my-2">
        <Link href={`/ourlocations/${location.slug}`} className="flex bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <figure className="flex slate-100 rounded-xl p-8 dark:bg-slate-800">
                <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={location.images} alt=""/>
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                   <h1>{location.name}</h1>
                    <p className="text-sm font-small">
                       {location.description}
                    </p>
                    
                    <figcaption className="font-medium">
                    <p className="text-sm font-small text-slate-700 dark:text-slate-500">
                        Address: {location.address}
                    </p>
                    </figcaption>
                </div>
            </figure>
        </Link>
    </div>
  )
}
