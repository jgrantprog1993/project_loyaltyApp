// @ts-nocheck
import { useState } from 'react'
import { API_URL } from '../utils/config'


export default function ImageUpload({ locationId, imageUploaded, token }) {
  const [image, setImage] = useState(null)
  console.log('locationId')
  console.log(locationId)
  console.log('image')
  console.log(image)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'locations')
    formData.append('id', locationId)
    formData.append('field', 'data.attributes.logo')

    const res = await fetch(`${API_URL}/api/upload/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    console.log('locationId')
    console.log(locationId)
    console.log('res')
    console.log(res)
    if (res.ok) {
      imageUploaded()
    }
  }

  const handleFileChange = (e) => {
    console.log('e.target.files[0]')
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  return (



    <div className="top-0 left-0 right-0 z-50  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
      <div className='bg-gray-200 p-2'>
        <p className='text-xl font-semibold text-gray-900 dark:text-white'>Upload Location Image
        </p>
        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          This Feature is also not available in the new strapi yet, The giles are uploaded to a folder but not the field. So the Admin will have to update them on the backend.
          See :  <a href="https://docs.strapi.io/developer-docs/latest/plugins/upload.html#endpoints"></a>
          </p>
        <form onSubmit={handleSubmit}>
          <div className='bg-gray-200 p-2'>
            <input type='file' onChange={handleFileChange} />
          </div>
          <input type='submit' value='Upload' className='text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2' />
        </form>
      </div>
    </div>
  )
}