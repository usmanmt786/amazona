import {useRouter} from 'next/router'
import Layout from '@/components/Layout'
function Unauthorized(){
const {message}=useRouter().query
return(
<Layout title="Unauthorized Page">
<h1 className="text-xl">Acces Denied!</h1>
{message && <div className="mb-4 text-red-500">{message}</div>}
</Layout>
)
}

export default Unauthorized
