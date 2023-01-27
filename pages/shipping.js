import Layout from '@/components/Layout'
import CheckOutWizard from '@/components/CheckOutWizard'
import {useForm} from 'react-hook-form'
import {useContext,useEffect} from 'react'
import {store} from '@/utils/Store'
import Cookies from 'js-cookie'
import {useRouter} from 'next/router'
function ShippingScreen(){
const router=useRouter()
const {
handleSubmit,
register,
formState: {errors},
setValue,
} = useForm();
const {state,dispatch}=useContext(store)
const {cart} = state
const {shippingAddress}= cart
useEffect(()=>{
console.log(cart)
setValue('fullName',shippingAddress.fullName)
setValue('address',shippingAddress.address)
setValue('city',shippingAddress.city)
setValue('postalCode',shippingAddress.postalCode)
setValue('country',shippingAddress.country)
},[setValue,shippingAddress])

const  submitHandler=async ({fullName,address,city,postalCode,country})=>{
dispatch({type:'SAVE_SHIPPING_ADDRESS',payload:{fullName,address,city,postalCode,country,location}})
Cookies.set('cart',

JSON.stringify({...cart,
shippingAddress:{fullName,address,city,postalCode,country,location}})

)
router.push('/payment')
}
return(
<Layout title="Shipping Address">
<CheckOutWizard activeStep={1}/>
<form className="mx-auto max-w-screen-md"
onSubmit={handleSubmit(submitHandler)}>
<h1 className="mb-4 text-lg">Shipping Address</h1>
<div className="mb-4">
<label htmlFor="fullName">Full Name</label>
<input 
id="fullName" 
className="w-full"
autoFocus
{...register('fullName',{required:'Please enter full name',})}
/>
{errors.fullName && <div className="text-red-500">{errors.fullName.message}</div>}
</div>
<div className="mb-4">
<label htmlFor="address">Address</label>
<input 
id="address" 
className="w-full"
autoFocus
{...register('address',{required:'Please enter address',
minLength:{value:3, message:"Address should be more than 2 characters"},
})}
/>
{errors.address && <div className="text-red-500">{errors.address.message}</div>}
</div>
<div className="mb-4">
<label htmlFor="city">City</label>
<input 
id="city" 
className="w-full"
autoFocus
{...register('city',{required:'Please enter city',})}
/>
{errors.city && <div className="text-red-500">{errors.city.message}</div>}
</div>
<div className="mb-4">
<label htmlFor="postalCode">Postal Code</label>
<input 
id="postalCode" 
className="w-full"
autoFocus
{...register('postalCode',{required:'Please enter postal code',})}
/>
{errors.postalCode && <div className="text-red-500">{errors.postalCode.message}</div>}
</div>
<div className="mb-4">
<label htmlFor="country">Country</label>
<input 
id="country" 
className="w-full"
autoFocus
{...register('country',{required:'Please enter country',})}
/>
{errors.country && <div className="text-red-500">{errors.country.message}</div>}
</div>
<div className="mb-4 flex justify-between">
<button className="primary-button">Next</button>
</div>
</form>
</Layout>
)
}

export default ShippingScreen
ShippingScreen.auth=true
