import Layout from '@/components/Layout'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import {getError} from '@/utils/error'
import {toast} from 'react-toastify'
import {useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import axios from 'axios'

function RegisterScreen(){
const router = useRouter()
const { data:session} = useSession()
const {redirect}=router.query
useEffect(()=>{
if(session?.user){
router.push(redirect || '/')
}
},[router,session,redirect])
const {
handleSubmit,
register,
getValues,
formState: {errors},
} = useForm();
const  submitHandler=async ({name,email,password})=>{
try{
await axios.post('/api/auth/signup',{
name,
email,
password
})
const result = await signIn('credentials',{ 

redirect:false,
email,
password,
 })
if(result.error){
toast.error(result.error)
}
}catch (err){
console.log(err)
toast.error(getError(err))
}
}
return(
<Layout title="Create Account">
<form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
<h1 className="text-xl mb-4">Create Account</h1>
<div className="mb-4">
<label htmlFor="password">Name</label>
<input 
type="text" 
id="name" 
className="w-full"
{...register('name',{required:"Please enter name",
})}
autoFocus/>
{errors.name && <div className="text-red-500">{errors.name.message}</div>  }
</div>
<div className="mb-4">
<label htmlFor="email">Email</label>
<input 
type="email" 
id="email" 
className="w-full" 

{...register('email',{required:"Please enter email",
pattern:{
value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
message:'Please enter valid email'
}
})}

/>
{errors.email && <div className="text-red-500">{errors.email.message}</div>  }
</div>
<div className="mb-4">
<label htmlFor="password">Password</label>
<input 
type="password" 
id="password" 
className="w-full"
{...register('password',{required:"Please enter password",
minLength:{value:6, message: 'Password should be more than 5 characters'}
})}/>
{errors.password && <div className="text-red-500">{errors.password.message}</div>  }
</div>
<div className="mb-4">
<label htmlFor="confirmPassword">Confirm Password</label>
<input 
type="password" 
id="caonfirmPassword" 
className="w-full"
{...register('confirmPassword',{required:"Please enter confirm password",
validate: (value) => value===getValues('password'),
minLength:{value:6, message: "Confirm password should be more than 5 characters"}
})}/>
{errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword.message}</div>}
{errors.confirmPassword && errors.confirmPassword.type === 'validate'&& <div className="text-red-500">Password does not match</div>}
</div>
<div className="mb-4">
<button className="primary-button">Register</button>
</div>
<div className="mb-4">
Don't have an account? &nbsp;
<Link href={`/register?redirect=${redirect || '/'}`} >Register</Link>
</div>
</form>
</Layout>
)
}

export default RegisterScreen
