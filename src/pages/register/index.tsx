import BottomNav from '@/src/components/bottom-nav'
import Header from '@/src/components/header'
import Meta from '@/src/components/meta'
import React from 'react'
import Page from '@/src/components/page'
import Section from '@/src/components/section'


export default function Discover() {
  return (
	  <>
      <Meta/>
      <Header/>
      <Page>
				<Section>
					<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
					 Register
					</h2>

					<div className='mt-2'>
						<p className='text-zinc-600 dark:text-zinc-400'>
							
						</p>


					
					</div>
				</Section>
			</Page>
      <BottomNav/>
    </>
  )
}
