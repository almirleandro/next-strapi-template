import CommentBox from './CommentBox'

export default function Comments({ comments, postId }) {
  return (
    <div className='Comments'>

      <h2>Comments</h2>

      {comments.length ? comments.map(comment => {
        return (
          <div className='user-comment'>
            <span className='comment-username'><i>{comment.username} says:</i></span>
            <p className='comment-content'>{comment.text}</p>
          </div>
        )
      }) : <p>There are no comments to this post yet.</p>}

      <CommentBox postId={postId} />

    </div>
  )
}