import  Link from 'next/link'

function ProductItem({product}){
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
<button className="primary-button" type="button">Add to cart</button>
</div>
</div>
)
}
export default ProductItem
