const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

class Comments extends Component {
  state = {
    commentList: [],
    totalCommands: 0,
    inputName: '',
    textareaValue: '',
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(eachcomment => {
        return eachcomment.id !== id
      }),
      totalCommands: prevState.totalCommands -1  
    }))
  }

  isLikeClicked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachcomment => {
        if (eachcomment.id === id) {
          return {...eachcomment, isLiked: !eachcomment.isLiked}
        }
        return eachcomment
      }),
    }))
  }

  addUserComment = event => {
    event.preventDefault()
    const {inputName, textareaValue} = this.state

    const bgColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: uuidv4(),
      userName: inputName,
      comment: textareaValue,
      date: new Date(),
      isLiked: false,
      bgColor: bgColor,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      totalCommands: prevState.totalCommands + 1,
      inputName: '',
      textareaValue: '',
    }))
  }

  updateUserName = event => {
    this.setState({inputName: event.target.value})
  }

  onUpdatingUserComment = event => {
    this.setState({textareaValue: event.target.value})
  }

  render() {
    const {commentList, totalCommands, inputName, textareaValue} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="image-and-content-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="commant-image"
          />
          <form className="content-div" onSubmit={this.addUserComment}>
            <p className="question">Say something about 4.0 Technologies</p>
            <input
              type="text"
              className="inputElement"
              placeholder="Your Name"
              onChange={this.updateUserName}
              value={inputName}
            />
            <textarea
              className="textareaElement"
              placeholder="Your Comment"
              value={textareaValue}
              onChange={this.onUpdatingUserComment}
            ></textarea>
            <button className="button" type="submit">
              Add Comment
            </button>
          </form>
        </div>
        <hr className="horizantal-line" />

        <p className="count-comands">
          <span className="total-comands">{totalCommands}</span> Comments
        </p>

        <ul className="listItem-container">
          {commentList.map(eachComment => (
            <CommentItem
              commentDetails={eachComment}
              key={eachComment.id}
              like={this.isLikeClicked}
              isdelete={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
