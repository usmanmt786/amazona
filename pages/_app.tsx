import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {StoreProvider} from '@/utils/Store'
import {SessionProvider} from 'next-auth/react'
import {useRouter} from 'next/router'
import NextNProgress from 'nextjs-progressbar';
import {useSession} from 'next-auth/react'
export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return (
<SessionProvider session={session}>
<StoreProvider>
   <NextNProgress
  color="linear-gradient(90deg, rgba(36,29,0,0.9682072658164829) 0%, rgba(121,9,48,1) 16%, rgba(89,106,12,1) 30%, rgba(75,17,124,1) 46%, rgba(130,60,33,1) 57%, rgba(30,143,52,1) 69%, rgba(170,18,22,1) 86%, rgba(0,212,255,1) 100%);"
  startPosition={0.3}
  stopDelayMs={200}
  height={3}
  showOnShallow={true}
/>
{Component.auth ? (
<Auth>
<Component {...pageProps}/>
</Auth>
):
<Component {...pageProps} />
}

</StoreProvider>
</SessionProvider>
)
}
function Auth({children}){
const router = useRouter()
const {status} = useSession({
required:true,
onUnauthenticated(){
router.push('/unauthorized?message=login required')
}
})
if(status === 'loading'){
return <div>Loading</div>
}
return children
}
