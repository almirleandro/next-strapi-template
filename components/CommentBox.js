import { useState } from 'react'
import Router from 'next/router'

export default function CommentBox({ postId }) {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [sentStatus, setSentStatus] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await fetch('https://sleepy-fjord-96876.herokuapp.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          text: content,
          post: +postId,
        }),
      })
      setSentStatus(true);
      Router.reload(window.location.pathname);

    } catch (err) {
      console.error(err)
    }
    
  }

  return (
    <div className='CommentBox'>

      <form onSubmit={e => handleSubmit(e)}>
        <span>Write your own comment:</span>
        <input placeholder='Your name' value={username} onChange={e => setUsername(e.target.value)} required></input><br/>
        <textarea placeholder='Your comment' value={content} onChange={e => setContent(e.target.value)} required></textarea><br/>
        <button>Send</button>
        <span style={{'display': sentStatus ? 'block' : 'none'}}>Comment sent! The page is going to reload now.</span>
      </form>

    </div>
  )
}