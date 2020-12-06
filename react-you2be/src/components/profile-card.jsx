import React, { Component } from "react";
import SubService from "../services/sub-service";
import { Link } from "react-router-dom";

class ProfileCard extends Component {
  state = {
    alreadySubscribed: false,
  };

  componentDidMount() {
    if (this.props.user != null) {
      SubService.checkIfAlreadySubscribed(this.props.profile.id)
        .then((res) => {
          this.setState({
            alreadySubscribed: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderButtons() {
    if (this.props.user == null) {
      return null;
    } else if (this.props.user.id === this.props.profile.id) {
      return null;
    } else if (this.state.alreadySubscribed === true) {
      return (
        <button onClick={this.unsubscribe} className="btn btn-dark react-cyan">
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

  subscribe = () => {
    SubService.subscribe(this.props.profile.id)
      .then((res) => {
        this.props.profile.numOfSubs = this.props.profile.numOfSubs + 1;
        this.setState({
          alreadySubscribed: true,
        });

        if (this.props.onSubscribe != null) {
          this.props.onSubscribe(this.props.profile);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unsubscribe = () => {
    SubService.unsubscribe(this.props.profile.id)
      .then((res) => {
        this.props.profile.numOfSubs = this.props.profile.numOfSubs - 1;
        this.setState({
          alreadySubscribed: false,
        });

        if (this.props.onUnsubscribe != null) {
          this.props.onUnsubscribe(this.props.profile);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const channel = this.props.profile;

    return (
      <div className="row text-light">
        <div className="col-3"></div>
        <div className="col-6 border-top">
          <div className="row mt-3 mb-3">
            <div className="col-2">
              <Link to={`/profile/${channel.id}`}>
                <img src={channel.userImage} className="circleLarge" />
              </Link>
            </div>
            <div className="col-7">
              <div className="row">
                <Link to={`/profile/${channel.id}`}>
                  <label className="text-light">
                    <b>{channel.username}</b>
                  </label>
                </Link>
              </div>
              <div className="row">
                <label className="text-muted">
                  {channel.numOfSubs} subscribers
                </label>
              </div>
            </div>
            <div className="col-2 mt-3">{this.renderButtons()}</div>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default ProfileCard;
