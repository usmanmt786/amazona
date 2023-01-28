import Layout from '@/components/Layout'
import CheckOutWizard from '@/components/CheckOutWizard'
import {useRouter} from 'next/router'
import {useState,useContext,useEffect} from 'react'
import {store} from '@/utils/Store'
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
function PaymentMethodScreen(){
const [selectedPaymentMethod,setSelectedPaymentMethod] = useState('')
const router = useRouter()
const {state,dispatch}=useContext(store)
const {cart} = state
const {shippingAddress, paymentMethod} = cart
const submitHandler =(e)=>{
e.preventDefault()
if(!selectedPaymentMethod){
return toast.error('Payment method is required')
}
dispatch({type:'SAVE_PAYMENT_METHOD',payload:selectedPaymentMethod})
Cookies.set('cart',
JSON.stringify({
...cart,
paymentMethod:selectedPaymentMethod
})
)
router.push('/placeorder')
}
useEffect(()=>{
if(!shippingAddress){
return router.push('/shipping')
}
setSelectedPaymentMethod(paymentMethod || '')
},[paymentMethod, router,  shippingAddress.address])
return(
<Layout title="Payment Method">
<CheckOutWizard activeStep={2}/>
<form className="mb-4 mx-auto max-w-screen-md" onSubmit={submitHandler}>
<h1 className="text-xl mb-4">Payment Method</h1>
{['Paypal','Stripe','CashOnDeliver'].map((payment)=>(
<div className="mb-4">
<input type="radio" id={payment} name={payment} name="paymentMethod" className="p-2 outline-none focus:ring-0"
checked={selectedPaymentMethod===payment}
onChange={()=>setSelectedPaymentMethod(payment)}
/>
<label htmlFor={payment} className="ml-2">{payment}</label>
</div>
))}
<div className="mb-4 flex justify-between">
<button className="default-button" onClick={()=>router.push('/shipping')} type="button">Back</button>
<button className="primary-button">Next</button>
</div>
</form>
</Layout>
)
}

export default PaymentMethodScreen

PaymentMethodScreen.auth=true
