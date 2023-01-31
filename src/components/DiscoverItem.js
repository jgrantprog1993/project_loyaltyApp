// @ts-nocheck
// @ts-ignore
import Link from "next/link"
// @ts-ignore
import Image from "next/image"

// @ts-ignore
export default function DiscoverItem({location}) {
  return (
    <div className="my-2">
        <Link href={`/locations/${location.attributes.slug}`} class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={location.attributes.images} alt=""/>
                <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                   <h1>{location.attributes.name}</h1>
                    <p class="text-sm font-small">
                       {location.attributes.description}
                    </p>
                    
                    <figcaption class="font-medium">
                    <div class="text-sky-500 dark:text-sky-400">
                        {location.attributes.business}
                    </div>
                    <p class="text-sm font-small text-slate-700 dark:text-slate-500">
                        Address: {location.attributes.address}
                    </p>
                    </figcaption>
                </div>
            </figure>
        </Link>
    </div>
  )
}
