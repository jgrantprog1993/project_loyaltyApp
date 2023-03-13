import React, { useState, useEffect } from 'react'

import Layout from "../components/layout"

export default function Logout(){
  
    const [LoggedIn, setLoggedIn] = useState(false)
   
   

    async function submitHandler() {
            console.log('logged Out Attempt')
           
    }

    return (
      <Layout title='Logout' keywords='{undefined}' description='{undefined}'>
          <div className='my-20 h-screen flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
              <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                  <h2 className='relative z-20'>
                      Log Out
                  </h2>
              </button>
          </div>
      </Layout>
    )
}