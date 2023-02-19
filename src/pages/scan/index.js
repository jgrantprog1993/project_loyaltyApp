import Layout from "../../components/layout"
import Qrscan from '../../Qrscan'  // QR code scanner

export default function Scan() {
  return (
	  <Layout title='Scan' keywords='{undefined}' description='{undefined}' >
		<div className='my-20 h-screen'>
			<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				Scan
			</h2>
			<div className="px-32" >
				<Qrscan />
			</div>
		</div>
    </Layout>
  )
}
