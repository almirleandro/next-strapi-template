import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ posts }) {
  return (
    <div className='total-screen'>

      <div className='upper-side'>

        <Head>
          <title>Homepage - Next.js + Strapi Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className='content-screen'>

          <h1 className='home-title'>Some blog posts</h1>
          
          {posts.map(item => {
            return (
              <div key={item.id}>
                <Link href='/post/[id]' as={`/post/${item.id}`} className='home-links'>{item.title}</Link><br/>
              </div>
            )
          })}

        </main>

      </div>

      <Footer />   

    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://sleepy-fjord-96876.herokuapp.com/posts`);
  const posts = await res.json();

  return {
    props: {
      posts
    },
    revalidate: 10
  }
}
