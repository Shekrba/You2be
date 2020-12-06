import React, { Component } from "react";
import VideoService from "../services/video-service";
import VideoCard from "./video-card";
import { Link } from "react-router-dom";

class MyVideos extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    VideoService.getMyVideos()
      .then((res) => {
        this.setState({ videos: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mt-5">
          <div className="col">
            <Link to="/my-videos/upload" className="btn btn-success">
              Upload video
            </Link>
          </div>
        </div>
        <div className="row mt-5">
          {this.state.videos.map((video) => (
            <div key={video.id} className="col-4 mt-5">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default MyVideos;
