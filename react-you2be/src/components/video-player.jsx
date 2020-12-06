import React, { Component } from "react";
import ReactPlayer from "react-player";
import VideoService from "../services/video-service";
import SubService from "../services/sub-service";
import LikingService from "../services/liking-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import CommentInput from "./comment-input";
import CommentService from "../services/comment-service";
import Comment from "./comment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class VideoPlayer extends Component {
  state = {
    video: {},
    alreadySubscribed: false,
    userIsUploader: false,
    likesVideo: false,
    dislikesVideo: false,
    comments: [],
  };

  componentDidMount() {
    VideoService.getVideo(this.props.match.params.id)
      .then((res) => {
        const currentUser = this.props.currentUser;
        var userIsUploader = false;

        if (currentUser != null) {
          if (currentUser.id === res.data.uploaderId) {
            userIsUploader = true;
          } else {
            this.checkIfAlreadySubscribed(res.data.uploaderId);
          }
          this.checkLiking(res.data.id);
        }

        this.getComments(res.data.id);

        this.setState({
          video: res.data,
          userIsUploader: userIsUploader,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getComments = (videoId) => {
    CommentService.getTopLevelComments(videoId)
      .then((res) => {
        this.setState({
          comments: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkIfAlreadySubscribed = (uploaderId) => {
    SubService.checkIfAlreadySubscribed(uploaderId)
      .then((res) => {
        this.setState({
          alreadySubscribed: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkLiking = (videoId) => {
    LikingService.checkLikings(videoId)
      .then((res) => {
        if (res.data.value === "LIKE") {
          this.setState({
            likesVideo: true,
          });
        } else if (res.data.value === "DISLIKE") {
          this.setState({
            dislikesVideo: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  makeLiking = (value) => {
    var body = {
      value: value,
      videoId: this.state.video.id,
    };

    var likesVideo = this.state.likesVideo;
    var numberOfLikes = this.state.video.likes;
    var dislikesVideo = this.state.dislikesVideo;
    var numberOfDislikes = this.state.video.dislikes;

    LikingService.makeLiking(body)
      .then((res) => {
        if (value === "LIKE") {
          likesVideo = true;
          numberOfLikes = numberOfLikes + 1;

          if (dislikesVideo === true) {
            dislikesVideo = false;
            numberOfDislikes = numberOfDislikes - 1;
          }
        } else if (value === "DISLIKE") {
          dislikesVideo = true;
          numberOfDislikes = numberOfDislikes + 1;

          if (likesVideo === true) {
            likesVideo = false;
            numberOfLikes = numberOfLikes - 1;
          }
        }

        const video = this.state.video;
        video.likes = numberOfLikes;
        video.dislikes = numberOfDislikes;

        this.setState({
          video: video,
          likesVideo: likesVideo,
          dislikesVideo: dislikesVideo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteLiking = (value) => {
    var user = this.props.currentUser;

    var likesVideo = this.state.likesVideo;
    var numberOfLikes = this.state.video.likes;
    var dislikesVideo = this.state.dislikesVideo;
    var numberOfDislikes = this.state.video.dislikes;

    if (user != null) {
      LikingService.deleteLiking(this.state.video.id)
        .then((res) => {
          if (value === "LIKE") {
            likesVideo = false;
            numberOfLikes = numberOfLikes - 1;
          } else if (value === "DISLIKE") {
            dislikesVideo = false;
            numberOfDislikes = numberOfDislikes - 1;
          }

          const video = this.state.video;
          video.likes = numberOfLikes;
          video.dislikes = numberOfDislikes;

          this.setState({
            video: video,
            likesVideo: likesVideo,
            dislikesVideo: dislikesVideo,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  subscribe = () => {
    var video = this.state.video;

    SubService.subscribe(video.uploaderId)
      .then((res) => {
        video.numOfSubscribers = video.numOfSubscribers + 1;
        this.setState({
          video: video,
          alreadySubscribed: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unsubscribe = () => {
    var video = this.state.video;

    SubService.unsubscribe(video.uploaderId)
      .then((res) => {
        video.numOfSubscribers = video.numOfSubscribers - 1;
        this.setState({
          video: video,
          alreadySubscribed: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderLikeButton = () => {
    const currentUser = this.props.currentUser;

    if (currentUser == null) {
      return <FontAwesomeIcon className="mr-1" icon={faThumbsUp} />;
    } else {
      if (this.state.likesVideo === true) {
        return (
          <FontAwesomeIcon
            className="mr-1 text-success"
            icon={faThumbsUp}
            onClick={() => this.deleteLiking("LIKE")}
          />
        );
      } else if (this.state.likesVideo === false) {
        return (
          <FontAwesomeIcon
            className="mr-1"
            icon={faThumbsUp}
            onClick={() => this.makeLiking("LIKE")}
          />
        );
      }
    }
  };

  renderDislikeButton = () => {
    const currentUser = this.props.currentUser;

    if (currentUser == null) {
      return <FontAwesomeIcon className="mr-1" icon={faThumbsDown} />;
    } else {
      if (this.state.dislikesVideo === true) {
        return (
          <FontAwesomeIcon
            className="mr-1 text-danger"
            icon={faThumbsDown}
            onClick={() => this.deleteLiking("DISLIKE")}
          />
        );
      } else if (this.state.dislikesVideo === false) {
        return (
          <FontAwesomeIcon
            className="mr-1"
            icon={faThumbsDown}
            onClick={() => this.makeLiking("DISLIKE")}
          />
        );
      }
    }
  };

  renderSubEditDeleteButton = () => {
    const currentUser = this.props.currentUser;

    if (currentUser == null) {
      return null;
    }

    if (currentUser.id === this.state.video.uploaderId) {
      return (
        <React.Fragment>
          <button onClick={this.deleteVideo} className="btn btn-danger">
            DELETE VIDEO
          </button>
          <Link
            to={`/video/${this.state.video.id}/edit`}
            className="btn btn-primary mt-3"
          >
            EDIT VIDEO
          </Link>
        </React.Fragment>
      );
    }

    if (this.state.alreadySubscribed === true) {
      return (
        <button onClick={this.unsubscribe} className="btn btn-dark react-cyan">
          UNSUBSCRIBE
        </button>
      );
    } else {
      return (
        <button onClick={this.subscribe} className="btn react-cyan-bg">
          SUBSCRIBE
        </button>
      );
    }
  };

  deleteVideo = () => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      VideoService.deleteVideo(this.props.match.params.id)
        .then((res) => {
          toast("Video deleted.");
          this.props.history.push("/my-videos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleCommentDelete = (commentId) => {
    const comments = this.state.comments.filter((c) => c.id !== commentId);

    this.setState({
      comments: comments,
    });
  };

  handleCommentAdd = (comment) => {
    var comments = this.state.comments;
    comments.push(comment);

    this.setState({
      comments: comments,
    });
  };

  renderCommentInput = () => {
    if (this.props.currentUser == null) {
      return null;
    }

    return (
      <CommentInput
        parentId={0}
        videoId={this.state.video.id}
        user={this.props.currentUser}
        onCommentAdd={this.handleCommentAdd}
      />
    );
  };

  render() {
    const video = this.state.video;
    return (
      <React.Fragment>
        <div className="row mt-5">
          <div className="col">
            <ReactPlayer width="fill" height="fill" controls url={video.src} />
          </div>
        </div>

        <div className="row mt-3 text-light">
          <div className="col">
            <h4>{video.title}</h4>
          </div>
        </div>

        <div className="row border-bottom text-light">
          <div className="col-10">
            <label className="text-muted">
              {video.views} views • {video.uploadDate}
            </label>
          </div>
          <div className="col">
            {this.renderLikeButton()}
            {video.likes}
          </div>
          <div className="col">
            {this.renderDislikeButton()}
            {video.dislikes}
          </div>
        </div>

        <div className="row mt-3 border-bottom text-light">
          <div className="col-10">
            <div className="row">
              <div className="col-1 mr-3">
                <Link to={`/profile/${video.uploaderId}`}>
                  <img
                    src={video.userImage}
                    className="circleLarge"
                    alt="Video Uploader"
                  />
                </Link>
              </div>
              <div className="col">
                <div className="row">
                  <Link to={`/profile/${video.uploaderId}`}>
                    <label className="text-light">
                      <b>{video.uploaderUsername}</b>
                    </label>
                  </Link>
                </div>
                <div className="row">
                  <label className="text-muted">
                    {video.numOfSubscribers} subscribers
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>{video.description}</p>
              </div>
            </div>
          </div>
          <div className="col">{this.renderSubEditDeleteButton()}</div>
        </div>

        <div className="row mt-3 mb-5 text-light">
          <div className="col">
            <div className="row">
              <div className="col">
                <h5 className="mb-3">Comments</h5>
              </div>
            </div>
            {this.renderCommentInput()}
            {this.state.comments.map((comment) => (
              <div key={comment.id} className="row mt-2">
                <div className="col">
                  <Comment
                    user={this.props.currentUser}
                    comment={comment}
                    onCommentDelete={this.handleCommentDelete}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPlayer;
