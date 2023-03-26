// @ts-nocheck
import Link from "next/link";
import { useRouter } from 'next/router'
function Footer2() {
	
	const router = useRouter()

	return (
		<>
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full container mx-auto p-4 md:px-6 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link legacyBehavior href='/'>
                        <img src="../images/playstore.png" alt="" className="display: block rounded-full w-16 h-16 "/>
                        
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <p href="#" className="mr-4 hover:underline md:mr-6 ">About</p>
                        </li>
                        <li>
                            <p href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</p>
                        </li>
                        <li>
                            <p href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</p>
                        </li>
                        <li>
                            <p className="hover:underline">Contact</p>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 LoyaltyApp™. All Rights Reserved.</span>
            </div>
        </footer>
        </>
  
    )
    }

    export default Footer2