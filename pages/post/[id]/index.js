import Head from 'next/head'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function article({ post, parags }) {
  return (
    <div className='total-screen'>

      <div className='upper-side'>

        <Head>
          <title>{`${post.title} - Next.js + Strapi Project`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className='content-screen'>

          <h1 className='title'>{post.title}</h1>
          <span className='author'>{`Author: ${post.Author}`}</span>
          {parags.map((parag, index) => <p key={index}>{parag}</p>)}
          
        </main>

      </div>

      <Footer />      

    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://sleepy-fjord-96876.herokuapp.com/posts/${context.params.id}`);
  const post = await res.json();

  const text = post.content;
  const parags = text.split('\n\n');

  return {
    props: {
      post,
      parags
    }, // will be passed to the page component as props
  }
}

export async function getStaticPaths(context) {
  const res = await fetch(`https://sleepy-fjord-96876.herokuapp.com/posts`);
  const posts = await res.json();

  const ids = posts.map(post => post.id);
  const paths = ids.map(id => ({params: {id: id.toString()}}))

  return {
    paths,
    fallback: false
  }
}
