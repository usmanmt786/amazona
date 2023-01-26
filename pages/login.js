import Layout from '@/components/Layout'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
function LoginScreen(){
const {
handleSubmit,
register,
formState: {errors},
} = useForm();
const submitHandler=({email,password})=>{

}
return(
<Layout title="Login">
<form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
<h1 className="text-xl mb-4">Login</h1>
<div className="mb-4">
<label htmlFor="email">Email</label>
<input 
type="email" 
id="email" 
className="w-full" 
autoFocus
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
<button className="primary-button">Login</button>
</div>
<div className="mb-4">
Don't have an account? &nbsp;
<Link href="/register" legacyBehavior>Register</Link>
</div>
</form>
</Layout>
)
}

export default LoginScreen
