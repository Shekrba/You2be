import React, { Component } from "react";
import CommentService from "../services/comment-service";
import CommentInput from "./comment-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Comment extends Component {
  state = {
    replies: [],
  };

  componentDidMount() {
    CommentService.getReplies(this.props.comment.id)
      .then((res) => {
        this.setState({
          replies: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderCommentInput = () => {
    if (this.props.user == null) {
      return null;
    }

    return (
      <CommentInput
        parentId={this.props.comment.id}
        user={this.props.user}
        videoId={this.props.comment.videoId}
        onCommentAdd={this.handleReplyAdd}
      />
    );
  };

  handleReplyAdd = (reply) => {
    var replies = this.state.replies;
    replies.push(reply);

    this.setState({
      replies: replies,
    });
  };

  deleteComment = () => {
    const commentId = this.props.comment.id;

    CommentService.deleteComment(commentId)
      .then((res) => {
        this.props.onCommentDelete(commentId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleReplyDelete = (replyId) => {
    const replies = this.state.replies.filter((r) => r.id !== replyId);

    this.setState({
      replies: replies,
    });
  };

  renderDeleteButton = () => {
    if (
      this.props.user != null &&
      (this.props.user.id === this.props.comment.userId ||
        this.props.user.id === this.props.comment.videoUploaderId)
    ) {
      return (
        <button className="btn btn-outline-light" onClick={this.deleteComment}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div id={"accordion" + this.props.comment.id} className="mt-3">
        <div className="card bg-dark text-light">
          <div className="card-header" id="headingOne">
            <div className="row ml-2">
              <div className="col-0 mt-2">
                <Link to={`/profile/${this.props.comment.userId}`}>
                  <img
                    src={this.props.comment.userImage}
                    className="circleMedium"
                    alt="User"
                  />
                </Link>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-8">
                    <Link to={`/profile/${this.props.comment.userId}`}>
                      <label className="text-light">
                        <b>{this.props.comment.username}</b>
                      </label>
                    </Link>
                  </div>
                  <div className="col">
                    <label className="text-muted small-text">
                      {this.props.comment.createdAt}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-11">
                    <p>{this.props.comment.text}</p>
                  </div>
                  <div className="col-1">{this.renderDeleteButton()}</div>
                </div>
              </div>
            </div>

            <h6 className="mb-0">
              <a
                className="btn btn-link react-cyan"
                data-toggle="collapse"
                href={"#collapseOne" + this.props.comment.id}
                aria-expanded="false"
                aria-controls={"collapseOne" + this.props.comment.id}
              >
                View All Replies
              </a>
            </h6>
          </div>

          <div
            id={"collapseOne" + this.props.comment.id}
            className="collapse"
            aria-labelledby={"headingOne" + this.props.comment.id}
          >
            <div className="card-body">
              <div className="row mt-3">
                <div className="col">
                  {this.state.replies.map((reply) => {
                    return (
                      <Comment
                        key={reply.id}
                        user={this.props.user}
                        comment={reply}
                        onCommentDelete={this.handleReplyDelete}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-3">{this.renderCommentInput()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
