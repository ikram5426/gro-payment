import Head from 'next/head'
import GoPremium from './premiummember/page'

export default async function Home() {
  return (
    <div style={{ fontFamily: 'Sofiapro' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>    
      <GoPremium />
    </div>
  )
}
