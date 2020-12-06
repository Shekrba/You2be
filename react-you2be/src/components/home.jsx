import React, { Component } from "react";
import VideoCard from "./video-card";
import VideoService from "../services/video-service";

class Home extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    VideoService.getAllVideos()
      .then((res) => {
        this.setState({ videos: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="row">
        {this.state.videos.map((video) => (
          <div key={video.id} className="col-4 mt-5">
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
