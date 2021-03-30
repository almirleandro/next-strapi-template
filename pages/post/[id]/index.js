import Head from 'next/head'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Comments from '../../../components/Comments'

export default function article({ post, parags, sortedComments }) {
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
          <span className='author'>{`Author: ${post.author}`}</span>
          {parags.map((parag, index) => <p key={index}>{parag}</p>)}
          
        </main>

        <Comments comments={sortedComments} postId={post.id} />

      </div>

      <Footer />

    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://sleepy-fjord-96876.herokuapp.com/posts/${context.params.id}`);
  const post = await res.json();
  const comments = post.comments;

  // Split paragraphs of the text
  const text = post.content;
  const parags = text.split('\n\n');

  // Sort comments
  let commentsObject = {};
  let highestId = -1;
  comments.map(comment => {
    commentsObject[comment.id] = comment;
    if (+comment.id > +highestId) highestId = +comment.id;
  })
  
  let sortedComments = [];
  for (let i = 0; i <= highestId; i++) {
    if (commentsObject[i]) sortedComments.push(commentsObject[i]);
  }

  return {
    props: {
      post,
      parags,
      sortedComments
    },
    revalidate: 1
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
