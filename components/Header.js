import  Link from 'next/link'
import {store} from '@/utils/Store'
import {useContext,useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import { Menu } from '@headlessui/react'
import DropDownLink from '@/components/DropDownLink'
import {signOut} from 'next-auth/react' 
import Cookies from 'js-cookie'
function Header(){
const {status, data:session} = useSession()
const {state,dispatch} = useContext(store)
const {cart} = state
const [cartItemsCount,setCartItemsCount]=useState(0)
useEffect(()=>{
setCartItemsCount(cart.cartItems.reduce((a,c)=> a+c.quantity,0))
},[cart.cartItems])
const logOutClickHandler=()=>{
Cookies.remove('cart')
dispatch({type:"CART_RESET"})
signOut({callbackUrl:'/login'})
}
return(
<header className="sticky top-0 bg-white">
<nav className="flex h-12 px-4 justify-between shadow-md items-center">
<Link href="/" legacyBehavior>
<a className="text-2xl font-bold">Amazona</a>
</Link>
<div>
<Link href="/cart" legacyBehavior>
<a className="p-2">Cart
{cartItemsCount > 0 && (
<span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">{cartItemsCount}</span>
)}
</a>
</Link>

{status === "loading" ? ('loading')
: session?.user ? (<Menu as="div" className="relative inline-block  ">
      <Menu.Button className="text-blue-600">{session.user.name}</Menu.Button>
      <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
        <Menu.Item>
         <DropDownLink href="/profile" className="dropdown-link">Profile</DropDownLink>
        </Menu.Item>
        <Menu.Item>
        <DropDownLink href="/order-history" className="dropdown-link">Order History</DropDownLink>
        </Menu.Item>
   <Menu.Item>
        <DropDownLink href="#" className="dropdown-link" onClick={logOutClickHandler}>Logout</DropDownLink>
        </Menu.Item>
      </Menu.Items>
    </Menu>):
(<Link href="/login" legacyBehavior><a className="p-2">Login</a>
</Link>)
}

</div>
</nav>
</header>
)
}
export default Header
