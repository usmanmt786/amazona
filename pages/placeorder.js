import Layout from '@/components/Layout'
import CheckOutWizard from '@/components/CheckOutWizard'
import Link from 'next/link'
import {useEffect,useContext,useState} from 'react'
import {store} from '@/utils/Store'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import {getError} from '@/utils/error'
import axios from 'axios'
import Cookies from 'js-cookie'
function PlaceOrderScreen (){
const {state,dispatch} = useContext(store)
const {cart} = state
const {cartItems,shippingAddress,paymentMethod} = cart
const router = useRouter()
const round2=(num)=>Math.round(num*100+Number.EPSILON)/100
const itemsPrice=round2(cartItems.reduce((a,c)=>a+c.quantity*c.price,0))
const shippingPrice=itemsPrice > 200 ? 0 : 15
const taxPrice=round2(itemsPrice*0.15)
const totalPrice=round2(itemsPrice + shippingPrice + taxPrice)

useEffect(()=>{
if(!paymentMethod){
router.push('/payment')
}
},[paymentMethod,router]) 

const [loading,setLoading]=useState(false)
const placeOrderHandler=async ()=>{
try {
setLoading(true)
const {data} =await axios.post('/api/orders',{
orderItems:cartItems,
shippingAddress,
paymentMethod,
itemsPrice,
shippingPrice,
taxPrice,
totalPrice
})
setLoading(false)
dispatch({type:'CART_CLEAR_ITEMS'})
Cookies.set('cart',
JSON.stringify({
...cart,
cartItems:[]
})
)
router.push(`/order/${data._id}`)
}catch(err){
setLoading(false)
toast.error(getError(err))
}
}
return (
<Layout title="Place Order">
<CheckOutWizard activeStep={3}/>
<h1 className="mb-4 text-xl">Place Order</h1>
{cartItems.length === 0 ? 
(
<div>Cart is empty. <Link href="/">Go shopping</Link></div>
):(
<div className="grid md:grid-cols-4 md:gap-5">

<div className="md:col-span-3 overflow-x-auto">

<div className="card p-5">
<h2 className="mb-2 text-lg">Shipping Address</h2>
<div>
{shippingAddress.fullName}, {shippingAddress.address},{' '}
{shippingAddress.city}, {shippingAddress.postalCode},{' '}
{shippingAddress.country}

</div>
<div>
<Link href="/shipping">Edit</Link>
</div>
</div>

<div className="card p-5">
<h2 className="mb-2 text-lg">Payment Method</h2>
<div>
{paymentMethod}
</div>
<div>
<Link href="/payment">Edit</Link>
</div>
</div>
<div className="card overflow-x-auto p-5">
<h2 className="mb-2 text-lg">Order Items</h2>
<table className="min-w-full">
<thead className="border-b">
<tr>
<th className="px-5 text-left">Item</th>
<th className="p-5 text-right">Quantity</th>
<th className="p-5 text-right">Price</th>
<th className="p-5 text-right">Subtotal</th>
</tr>

</thead>
<tbody>
{
cartItems.map((item)=>(
<tr key={item.slug} className="border-b">
<td className="px-5 text-left">
<Link href={`/product/${item.slug}`} legacyBehavior>
<a className="flex items-center">
<Image 
src={item.image}
alt={item.name}

width={50}
height={50}
/>
&nbsp;
{item.name}
</a>
</Link>
</td>
<td className="px-5 text-right">{item.quantity}</td>
<td className="px-5 text-right">{item.price}</td>
<td className="px-5 text-right">
${item.quantity*item.price}
</td>
</tr>
))
}
</tbody>
</table>
<div>
<Link href="/cart">Edit</Link>
</div>
</div>
</div>
<div>
<div className="card p-5">
<h2 className="mb-2 text-lg">Order Summary</h2>
<ul>
<li>
<div className="flex justify-between mb-2">
<div>Items</div>
<div>${itemsPrice}</div>
</div>
</li>
<li>
<div className="flex justify-between mb-2">
<div>Tax </div>
<div>${taxPrice}</div>
</div>
</li>
<li>
<div className="flex justify-between mb-2">
<div>Shipping</div>
<div>${shippingPrice}</div>
</div>
</li>
<li>
<div className="flex justify-between mb-2">
<div>Total</div>
<div>${totalPrice}</div>
</div>
</li>
<li>
<button 
className="w-full primary-button"
disabled={loading}
onClick={placeOrderHandler}
>{loading ? 'loading...' : 'Place Order'}</button>
</li>
</ul>
</div>
</div>
</div>
)
}

</Layout>
)
}


export default PlaceOrderScreen

PlaceOrderScreen.auth=true

