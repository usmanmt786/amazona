import NextAuth from 'next-auth'
import db from '@/utils/db'
import User from '@/models/User'
import bcryptjs from 'bcryptjs'
import CredentialProvider from 'next-auth/providers/credentials'

export default NextAuth({
session:{
strategy: 'jwt',
},
callback:{
async jwt({token, user}){
if(user?._id) tken._id= user._id
if(user?.isAdmin) token.isAdmin = user.isAdmin
return token;
},
async session({session, token}){
if(token?._id)session.user._id=token._id
if(token?.isAdmin)session.user.isAdmin=token.isAdmin
return session
},
},
providers:[
CredentialProvider({
async authorize(credentials){
await db.connect()
const user = await User.findOne({email:credentials.email, })
await db.disconnect()
if(user && bcryptjs.compareSync(credentials.password, user.password)){
return {
_id: user._id,
name:user.name,
email:user.email,
image:'f',
isAdmin:user.isAdmin,
}
}
throw new Error('Invalid email or password')
}
})
]
})
