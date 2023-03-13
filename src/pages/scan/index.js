import Layout from "../../components/layout"
import Qrscan from '../../Qrscan'  // QR code scanner

export default function Scan() {
  return (
	  <Layout title='Scan' keywords='{undefined}' description='{undefined}' >
		<div className='my-20 h-screen'>
			<Qrscan />
		</div>
    </Layout>
  )
}
