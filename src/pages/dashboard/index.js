import BottomNav from '@/src/components/bottom-nav'
import Header from '@/src/components/header'
import Meta from '@/src/components/meta'
import React from 'react'

export default function Dashboard() {
  return (
    <>
        <Meta/>
				<Header/>
        <main
          /**
           * Padding top = `appbar` height
           * Padding bottom = `bottom-nav` height
           */
          className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'
        ></main>
        <p className='text-3xl'>Dashboard</p>
        <BottomNav/>
    </>
  )
}
