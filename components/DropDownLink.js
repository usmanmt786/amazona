import Link from 'next/link'

function DropDownLink(props){
let {href,children,...rest} = props
return(
<Link href={href} legacyBehavior>
<a {...rest}>{children}</a>
</Link>
)
}

export default DropDownLink
