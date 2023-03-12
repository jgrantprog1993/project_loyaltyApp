import Image from 'next/image';
import { API_URL, NEXT_URL } from "../utils/config"

export default function Home() {
    return (
        <div className="relative bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 lg:w-full lg:max-w-2xl">
                    <svg className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <polygon points="0,0 90,0 50,100 0,100" />
                    </svg>
                    <div className="relative px-6 pt-6 lg:pl-8 lg:pr-0">
                
                </div>
                <div className="relative py-32 px-6 sm:py-40 lg:py-56 lg:px-8 lg:pr-0">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                        <div className="hidden sm:mb-10 sm:flex">
                            </div>
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Digital TEST for you loyalty vouchers</h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">Now you can save all of your rewards and loyalty tokens in one place. Developed in Next.js and Tailwind</p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <a href="/register" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                                        <a href="https://github.com/jgrantprog1993/project_loyaltyApp" className="rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-white hover:bg-gray-900">View on Github <span aria-hidden="true">→</span></a>
                                    </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full" src="https://www.householdmoneysaving.com/wp-content/uploads/2020/12/coffe-shop-loyalty-1024x683.jpg.webp" alt=""/>
            </div>
        </div>



    );
}