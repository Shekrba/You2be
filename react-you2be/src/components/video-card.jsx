import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faThumbsUp,
  faThumbsDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { Link } from "react-router-dom";

class VideoCard extends Component {
  render() {
    const video = this.props.video;
    return (
      <div>
        <Link
          to={"/video/" + video.id}
          className="card bg-dark text-light"
          style={{ width: 330, height: 370, textDecoration: "none" }}
        >
          <img
            className="card-img-top"
            src={video.thumbnailSrc}
            alt="Error while loading"
            style={{ width: 330, height: 200 }}
          />
          <div className="card-body hide-overflow">
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">{video.description}</p>
          </div>
          <div className="card-footer text-muted">
            <div className="row">
              <div className="col">
                <FontAwesomeIcon className="mr-1" icon={faEye} />
                {video.views}
              </div>
              <div className="col">
                <FontAwesomeIcon className="mr-1" icon={faThumbsUp} />
                {video.likes}
              </div>
              <div className="col">
                <FontAwesomeIcon className="mr-1" icon={faThumbsDown} />
                {video.dislikes}
              </div>
              <div className="col">
                <FontAwesomeIcon className="mr-1" icon={faComment} />
                {video.numOfComments}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default VideoCard;
