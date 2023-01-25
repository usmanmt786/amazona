import  Link from 'next/link'

function Header(){
return(
<header>
<nav className="flex h-12 px-4 justify-between shadow-md items-center">
<Link href="/" legacyBehavior>
<a className="text-2xl font-bold">Amazona</a>
</Link>
<div>
<Link href="/cart" legacyBehavior>
<a className="p-2">Cart</a>
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
