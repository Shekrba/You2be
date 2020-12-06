import React, { Component } from "react";
import UserService from "../services/user-service";
import VideoCard from "./video-card";
import SubService from "../services/sub-service";

class UserProfile extends Component {
  state = {
    profile: {
      videos: [],
    },
    alreadySubscribed: false,
  };

  componentDidMount() {
    UserService.getProfile(this.props.match.params.id)
      .then((res) => {
        this.checkIfAlreadySubscribed(res.data.id);

        this.setState({
          profile: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  renderButtons = () => {
    if (this.props.user.id === this.state.profile.id) {
      return null;
    } else {
      if (this.state.alreadySubscribed === true) {
        return (
          <button
            onClick={this.unsubscribe}
            className="btn btn-secondary react-cyan"
          >
            UNSUBSCRIBE
          </button>
        );
      } else if (this.state.alreadySubscribed === false) {
        return (
          <button onClick={this.subscribe} className="btn react-cyan-bg">
            SUBSCRIBE
          </button>
        );
      } else {
        return null;
      }
    }
  };

  subscribe = () => {
    const profile = this.state.profile;

    SubService.subscribe(profile.id)
      .then((res) => {
        profile.numOfSubs = profile.numOfSubs + 1;
        this.setState({
          profile: profile,
          alreadySubscribed: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unsubscribe = () => {
    const profile = this.state.profile;

    SubService.unsubscribe(profile.id)
      .then((res) => {
        profile.numOfSubs = profile.numOfSubs - 1;
        this.setState({
          profile: profile,
          alreadySubscribed: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const profile = this.state.profile;

    return (
      <React.Fragment>
        <div className="row mt-5 bg-dark rounded">
          <div className="col"></div>
          <div className="col-0 mt-3 mb-3">
            <img src={profile.userImage} className="circleHuge" />
          </div>
          <div className="col-8 mt-3 mb-3">
            <div className="row">
              <div className="col">
                <h4 className="text-light">{profile.username}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="text-light">{profile.name}</label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="text-light">
                  {profile.numOfSubs} subscribers
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-0">
                <i className="fa fa-envelope text-light" aria-hidden="true"></i>
              </div>
              <div className="col">
                <label className="text-light">{profile.email}</label>
              </div>
            </div>
          </div>
          <div className="col-2 mt-3 mb-3">{this.renderButtons()}</div>
          <div className="col"></div>
        </div>
        <div className="row text-light mt-5">
          <div className="col">
            <h5>Videos:</h5>
          </div>
        </div>
        <div className="row">
          {profile.videos.map((video) => (
            <div key={video.id} className="col-4 mt-5">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
