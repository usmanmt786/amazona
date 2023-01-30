import Layout from '@/components/Layout'
import {useRouter} from 'next/router'
import {useReducer,useEffect} from 'react'
import axios from 'axios'
import {getError} from '@/utils/error'
import Link from 'next/link'
import Image from 'next/image'
function OrderScreen (){

function reducer(state,action){
switch (action.type){
case 'FETCH_REQUEST':{
return{
...state,loading:true,error:''
}
}
case 'FETCH_SUCCESS':
return {...state,loading:false,order:action.payload,error:''}
case 'FETCH_FAIL' :
return {...state, loading:false,error:action.payload}
default :
state
}
}
const router = useRouter()
const orderId =router.query.id 

const [{loading,error,order},dispatch]=useReducer(reducer,{
loading:true,
order:{},
error:''
})
useEffect(()=>{
const fetchOrder=async ()=>{
try{
dispatch({type:'FETCH_REQUEST'})
const {data} = await axios.get(`/api/orders/${orderId}`)
dispatch({type:'FETCH_SUCCESS',payload:data})
}catch(err){
dispatch({type:'FETCH_FAIL',payload:getError(err)})
}
}
if(!order._id ||
(order._id && order._id !== orderId)
){
fetchOrder()
}

},[orderId,order])
const {
shippingAddress,
paymentMethod,
orderItems,
itemsPrice,
taxPrice,
shippingPrice,
totalPrice,
isPaid,
paidAt,
isDelivered,
deliveredAt,
}=order

return(
<Layout title={`Order ${orderId}`}>
<h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
{loading ? (<div>Loading</div>):
error ? (<div className="alert-error">{error}</div>):
(
<div className="grid md:grid-cols-4 md:gap-5">
<div className="md:col-span-3  overflow-x-auto">
<div className="card p-5">
<h2 className="mb-2 text-lg">Shipping Address</h2>
<div>
{shippingAddress.fullName}, {shippingAddress.address},{' '}
{shippingAddress.city}, {shippingAddress.postalCode},{' '}
{shippingAddress.country}
</div>
{isDelivered ? (<div className="alert-success">
Delivered at {deliveredAt}
</div>):(
<div className="alert-error">
Not delivered
</div>
)}
</div>

<div className="card p-5">
<h2 className="mb-2 text-lg">Payment Method</h2>
<div>
{paymentMethod}
</div>
{isPaid ? (<div className="alert-success">
Paid at {paidAt}
</div>):(
<div className="alert-error">
Not paid
</div>
)}

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
orderItems.map((item)=>(
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
</li>{' '}
<li>
<div className="flex justify-between mb-2">
<div>Tax </div>
<div>${taxPrice}</div>
</div>
</li>{' '}
<li>
<div className="flex justify-between mb-2">
<div>Shipping</div>
<div>${shippingPrice}</div>
</div>
</li>{' '}
<li>
<div className="flex justify-between mb-2">
<div>Total</div>
<div>${totalPrice}</div>
</div>
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

export default OrderScreen

OrderScreen.auth=true
