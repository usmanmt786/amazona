import  Link from 'next/link'
import {store} from '@/utils/Store'
import {useContext} from 'react'

function Header(){
const {state} = useContext(store)
const {cart} = state
return(
<header>
<nav className="flex h-12 px-4 justify-between shadow-md items-center">
<Link href="/" legacyBehavior>
<a className="text-2xl font-bold">Amazona</a>
</Link>
<div>
<Link href="/cart" legacyBehavior>
<a className="p-2">Cart
{cart.cartItems.length > 0 && (
<span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">{cart.cartItems.reduce((a,c)=> a+c.quantity,0)}</span>
)}
</a>
</Link>
<Link href="/login" legacyBehavior>
<a className="p-2">Login</a>
</Link>
</div>
</nav>
</header>
)
}
export default Header
