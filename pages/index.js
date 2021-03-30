import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ sortedPosts }) {
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
          
          {sortedPosts.map(item => {
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

  // Sort posts
  let postsObject = {};
  let highestId = -1;
  posts.map(post => {
    postsObject[post.id] = post;
    if (+post.id > +highestId) highestId = +post.id;
  })
  
  let sortedPosts = [];
  for (let i = highestId; i >= 0; i--) {
    if (postsObject[i]) sortedPosts.push(postsObject[i]);
  }

  return {
    props: {
      sortedPosts
    },
    revalidate: 1
  }
}
