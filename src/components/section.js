// @ts-ignore
import { useAuth } from "../context/AuthContext"

	
// @ts-ignore
const Section = (children ) => (
	// @ts-ignore
	children.map(children => <section className='mt-10'>{children}</section>)
)

export default Section
