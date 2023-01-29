import Layout from '@/components/Layout'
import ProductItem from '@/components/ProductItem'
import db from '@/utils/db'
import Product from '@/models/Product'
import {store} from '@/utils/Store'
import {useContext} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
export default function Home({products}) {
const {state, dispatch} = useContext(store)
const {cart} = state
const addToCartHandler = async (product) => {
const existItem = cart.cartItems.find(item=> item.slug===product.slug)
const quantity = existItem ? existItem.quantity+1:1;
const {data} = await axios.get(`/api/products/${product._id}`)

if(data.countInStock < quantity){
toast.error("Sorry. Product is out of stock")
return;
}
dispatch({type:"CART_ADD_ITEM",payload:{...product,quantity}})
toast.success("Product added to cart")
}
  return (
<Layout title="Home Page">
<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">


{products.map((product)=>(
<ProductItem product={product} key={product.slug}
addToCartHandler={addToCartHandler}
/>
))}


</div>
</Layout>
  );
}

export async function getServerSideProps(){

await db.connect()
const products = await Product.find().lean()
await db.disconnect()
return {

props:{
products:products.map(db.convertDocToObj)
}
}
}
