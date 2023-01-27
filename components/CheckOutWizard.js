function CheckOutWizard({ activeStep =0 }){
return(
<div className="mb-5 flex flex-wrap">
{['User Login', 'Shipping Address', 'Payment Method', 'PlaceOrder'].map((step,index)=>(
<div
key={step}
className={`flex-1 border-b-2 texr-center ${
index <= activeStep ? 'border-indigo-500 text-indigo-500'
: 'border-gray-400 text-gray-400'
}`}>{step}</div>
))}
</div>
)
}

export default CheckOutWizard
