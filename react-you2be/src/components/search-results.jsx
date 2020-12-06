import React, { Component } from "react";
import VideoCard from "./video-card";
import ProfileCard from "./profile-card";
import SearchService from "../services/search-service";

class SearchResults extends Component {
  state = {
    videos: [],
    profiles: [],
  };

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.query !== this.props.match.params.query) {
      this.search();
    }
  }

  search = () => {
    const query = this.props.match.params.query;

    SearchService.searchVideosAndChannels(query)
      .then((res) => {
        const videos = res.data.videos;
        const profiles = res.data.channels;

        this.setState({
          videos: videos,
          profiles: profiles,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active react-cyan"
              id="videos-tab"
              data-toggle="tab"
              href="#videos"
              role="tab"
              aria-controls="videos"
              aria-selected="true"
            >
              Videos
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link react-cyan"
              id="channels-tab"
              data-toggle="tab"
              href="#channels"
              role="tab"
              aria-controls="channels"
              aria-selected="false"
            >
              Channels
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="videos"
            role="tabpanel"
            aria-labelledby="videos-tab"
          >
            <div className="container mt-5">
              <div className="row">
                {this.state.videos.map((video) => (
                  <div key={video.id} className="col-4 mt-5">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="channels"
            role="tabpanel"
            aria-labelledby="channels-tab"
          >
            <div className="container mt-5">
              {this.state.profiles.map((profile) => (
                <ProfileCard
                  user={this.props.user}
                  key={profile.id}
                  profile={profile}
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResults;
