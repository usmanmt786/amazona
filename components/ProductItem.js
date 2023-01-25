import  Link from 'next/link'
import {store} from '@/utils/Store'
import {useContext} from 'react'

function ProductItem({product}){
const {state, dispatch} = useContext(store)
const addToCartHandler = () => {
const existItem = state.cart.cartItems.find(item=> item.slug===product.slug)
const quantity = existItem ? existItem.quantity+1:1;
if(product.countInStock < quantity){
alert("Sorry. Product is out of stock")
return;
}
dispatch({type:"CART_ADD_ITEM",payload:{...product,quantity}})

}

return (
<div className="card">
<Link href={`/product/${product.slug}`} legacyBehavior>
<a><img 
src={product.image}
alt={product.name}
className="rounded shadow"
/></a>
</Link>
<div className="flex flex-col items-center justify-center p-5">
<Link href={`/product/${product.slug}`} legacyBehavior>
<h2 className="text-lg"> 
{product.name}
</h2>
</Link>
<p className="mb-2">{product.brand}</p>
<p>&#36;{product.price}</p>
<button className="primary-button" type="button" onClick={addToCartHandler}>Add to cart</button>
</div>
</div>
)
}
export default ProductItem
