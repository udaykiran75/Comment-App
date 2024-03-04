import './index.css'
import {formatDistanceToNow} from 'date-fns'

const deleteIcon =
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png'
const likeImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
const likedImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

const CommentItem = props => {
  const {commentDetails, like, isdelete} = props
  const {id, userName, comment, date, isLiked, bgColor} = commentDetails
  const postedTime = formatDistanceToNow(date)
  const userProfileLetter = userName[0]

  const likeBtn = () => {
    like(id)
  }

  const deleteComment = () => {
    isdelete(id)
  }

  return (
    <li>
      <div className="profile-content-div">
        <div className={`initial-container ${bgColor}`}>
          <p className="user-initial">{userProfileLetter}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="userName">{userName}</p>
            <p className="posted-time">{postedTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-div">
        <div>
          <img
            src={isLiked ? likedImage : likeImage}
            className="like-image"
            onClick={likeBtn}
            alt="like"
          />
          <button
            className={isLiked ? 'likedText' : 'unlikedText'}
            onClick={likeBtn}
          >
            Like
          </button>
        </div>
        <button
          className="delete-btn"
          onClick={deleteComment}
          type="button"
          data-testid="delete"
        >
          <img src={deleteIcon} className="delete-image" alt="delete" />
        </button>
      </div>
      <hr className="horizantal-line" />
    </li>
  )
}
export default CommentItem
