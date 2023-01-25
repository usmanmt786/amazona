import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default function Layout({children,title}) {
  return (
    <>
      <Head>
        <title>{title ? title : "amazona"}</title>
        <meta
          name="description"
          content="A complete fest management system developed using react by Usman"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
       <Header/>
<main className="container m-auto mt-4 px-4">{children}</main>
<Footer/>

      </div>
    </>
  );
}
